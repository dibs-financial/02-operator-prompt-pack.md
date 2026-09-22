
import type {
  Carrier,
  DeskEvent,
  DeskState,
  LaneBook,
  Load,
  LoadStatus,
} from "./domain";
import { laneKey } from "./domain";

const HUMAN_STATUSES: LoadStatus[] = ["exception"];

function ev(partial: Omit<DeskEvent, "id">): DeskEvent {
  return { id: `e-${Math.random().toString(36).slice(2, 8)}`, ...partial };
}

export function findLane(state: DeskState, load: Load): LaneBook | undefined {
  const key = laneKey(load.pickup.city, load.delivery.city);
  return state.lanes.find((l) => {
    const [o, d] = [l.origin.split(",")[0], l.dest.split(",")[0]];
    return laneKey(o, d) === key && l.equipment === load.equipment;
  });
}

export function suggestRate(state: DeskState, load: Load) {
  const lane = findLane(state, load);
  if (!lane) {
    return {
      ok: false as const,
      reason: "No lane in the book. Human names the number.",
    };
  }
  const sell = Math.round(lane.rpmSell * load.miles);
  const buy = Math.round(lane.rpmBuy * load.miles);
  const fuel = Math.round(lane.fuelPerMile * load.miles);
  return {
    ok: true as const,
    sell,
    buy,
    fuel,
    rpmSell: lane.rpmSell,
    rpmBuy: lane.rpmBuy,
    lane,
  };
}

export function matchCarriers(state: DeskState, load: Load): Carrier[] {
  const key = `${load.pickup.city}, ${load.pickup.state}→${load.delivery.city}, ${load.delivery.state}`;
  return state.carriers
    .filter((c) => c.authority === "active")
    .filter((c) => c.equipment.includes(load.equipment))
    .filter((c) => c.vet !== "blocked")
    .sort((a, b) => {
      const aLane = a.preferredLanes.includes(key) ? 1 : 0;
      const bLane = b.preferredLanes.includes(key) ? 1 : 0;
      if (bLane !== aLane) return bLane - aLane;
      const rank = { book: 3, pending: 1, flagged: 0, blocked: -1 };
      if (rank[b.vet] !== rank[a.vet]) return rank[b.vet] - rank[a.vet];
      return b.onTimePct - a.onTimePct;
    });
}

export function canTender(carrier: Carrier): { ok: boolean; reason: string } {
  if (carrier.vet === "blocked") return { ok: false, reason: "Blocked. Do not tender." };
  if (carrier.authority !== "active") return { ok: false, reason: "Authority inactive." };
  if (carrier.vet === "flagged") return { ok: false, reason: carrier.vetNotes || "Flagged. Human only." };
  if (carrier.vet === "pending") return { ok: false, reason: "First-time carrier. Human confirms packet." };
  const days = (new Date(carrier.insuranceExpiry).getTime() - Date.now()) / 86400000;
  if (days < 14) return { ok: false, reason: "Insurance inside 14 days. Human only." };
  return { ok: true, reason: "On the book." };
}

export function qualifyInquiry(state: DeskState, loadId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load || load.status !== "inquiry") return state;
  const quote = suggestRate(state, load);
  const next: Load = {
    ...load,
    status: quote.ok ? "qualified" : "exception",
    sellRate: quote.ok ? quote.sell : null,
    buyRate: quote.ok ? quote.buy : null,
    fuel: quote.ok ? quote.fuel : 0,
    posted: quote.ok,
    needsHuman: !quote.ok,
    humanReason: quote.ok ? undefined : quote.reason,
  };
  return patchLoad(state, next, ev({
    at: now(),
    kind: quote.ok ? "qualified" : "escalated",
    actor: "joe",
    text: quote.ok
      ? `Qualified ${load.ref}. Book rate $${quote.sell} sell / $${quote.buy} buy.`
      : `Could not qualify ${load.ref}. ${quote.reason}`,
    loadId,
  }));
}

export function coverLoad(state: DeskState, loadId: string, carrierId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  const carrier = state.carriers.find((c) => c.id === carrierId);
  if (!load || !carrier) return state;
  const vet = canTender(carrier);
  if (!vet.ok) {
    return patchLoad(state, {
      ...load,
      status: "exception",
      carrierId,
      needsHuman: true,
      humanReason: `${carrier.name}: ${vet.reason}`,
    }, ev({
      at: now(),
      kind: "escalated",
      actor: "joe",
      text: `Parked tender on ${load.ref} to ${carrier.name}. ${vet.reason}`,
      loadId,
    }));
  }
  const quote = suggestRate(state, load);
  const buy = load.buyRate ?? (quote.ok ? quote.buy : null);
  const next: Load = {
    ...load,
    status: "covered",
    carrierId,
    buyRate: buy,
    needsHuman: false,
  };
  const withRc: DeskState = {
    ...patchLoad(state, next, ev({
      at: now(),
      kind: "rate_con",
      actor: "joe",
      text: `Covered ${load.ref} with ${carrier.name}. Rate con drafted at $${buy}.`,
      loadId,
    })),
    rateCons: [
      ...state.rateCons,
      {
        id: `RC-${load.ref.slice(-4)}`,
        loadId,
        carrierId,
        issuedAt: now(),
        buyRate: buy ?? 0,
        terms: "Net 30 from signed POD. Detention only with shipper sign-off. No double-broker.",
        signed: false,
      },
    ],
  };
  return withRc;
}

export function dispatchLoad(state: DeskState, loadId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load || load.status !== "covered") return state;
  return patchLoad(state, { ...load, status: "dispatched" }, ev({
    at: now(), kind: "dispatched", actor: "joe",
    text: `Dispatched ${load.ref}. Driver instructions sent.`,
    loadId,
  }));
}

export function checkCall(state: DeskState, loadId: string, note: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return state;
  const nextStatus: LoadStatus =
    load.status === "dispatched" ? "in_transit" : load.status;
  return patchLoad(state, { ...load, status: nextStatus }, ev({
    at: now(), kind: "check_call", actor: "joe",
    text: note || `Check-call logged on ${load.ref}.`,
    loadId,
  }));
}

export function markDelivered(state: DeskState, loadId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return state;
  return patchLoad(state, { ...load, status: "pod_pending" }, ev({
    at: now(), kind: "delivered", actor: "joe",
    text: `Delivered ${load.ref}. Chasing POD.`,
    loadId,
  }));
}

export function attachPod(state: DeskState, loadId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return state;
  const amount = (load.sellRate ?? 0) + load.accessorials
    .filter((a) => a.status === "approved")
    .reduce((s, a) => s + a.amount, 0);
  const invoiced: Load = { ...load, status: "invoiced" };
  const next = patchLoad(state, invoiced, ev({
    at: now(), kind: "invoiced", actor: "joe",
    text: `POD on file. Invoiced ${load.shipper} $${amount}.`,
    loadId,
  }));
  return {
    ...next,
    invoices: [
      ...state.invoices,
      { id: `INV-${load.ref.slice(-4)}`, loadId, shipper: load.shipper, amount, issuedAt: now(), status: "sent" },
    ],
  };
}

export function escalate(state: DeskState, loadId: string, reason: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return state;
  return patchLoad(state, {
    ...load,
    status: "exception",
    needsHuman: true,
    humanReason: reason,
  }, ev({
    at: now(), kind: "escalated", actor: "joe",
    text: `Escalated ${load.ref}: ${reason}`,
    loadId,
  }));
}

export function resolveCall(state: DeskState, callId: string): DeskState {
  return {
    ...state,
    conversations: state.conversations.map((c) =>
      c.id === callId ? { ...c, resolved: true } : c
    ),
  };
}

export function workingLoads(state: DeskState): Load[] {
  return state.loads.filter((l) => !["closed", "dead"].includes(l.status));
}

export function uncovered(state: DeskState): Load[] {
  return state.loads.filter((l) =>
    ["inquiry", "qualified", "quoting", "booked", "covering"].includes(l.status)
  );
}

export function exceptions(state: DeskState): Load[] {
  return state.loads.filter((l) => l.needsHuman || HUMAN_STATUSES.includes(l.status));
}

export function bookedMargin(state: DeskState): number {
  return state.loads.reduce((sum, l) => {
    if (l.sellRate == null || l.buyRate == null) return sum;
    if (["inquiry", "dead"].includes(l.status)) return sum;
    return sum + (l.sellRate - l.buyRate);
  }, 0);
}

function patchLoad(state: DeskState, load: Load, event: DeskEvent): DeskState {
  return {
    ...state,
    loads: state.loads.map((l) => (l.id === load.id ? load : l)),
    events: [event, ...state.events],
  };
}

function now(): string {
  return new Date().toISOString();
}

export function automationShare(state: DeskState): { pct: number; human: number; ratio: number } {
  const live = workingLoads(state);
  const human = live.filter((l) => l.needsHuman || l.status === "exception").length;
  const ratio = live.length ? (live.length - human) / live.length : 1;
  return { pct: Math.round(ratio * 100), human, ratio };
}


/** Aliases so store.tsx and other trees can import the same engine. */
export const quoteLoad = qualifyInquiry;
export const collectPod = attachPod;
export const invoiceLoad = attachPod;

export function bookLoad(state: DeskState, loadId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return state;
  if (load.status === "inquiry") return qualifyInquiry(state, loadId);
  if (["qualified", "quoting"].includes(load.status)) {
    return {
      ...state,
      loads: state.loads.map((l) => (l.id === loadId ? { ...l, status: "booked" as const } : l)),
    };
  }
  return state;
}

export function autoAdvance(state: DeskState, loadId: string): DeskState {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return state;
  if (load.status === "inquiry") return qualifyInquiry(state, loadId);
  if (load.status === "covered") return dispatchLoad(state, loadId);
  if (load.status === "dispatched") return checkCall(state, loadId, "Auto check-call. Rolling.");
  if (load.status === "in_transit") return markDelivered(state, loadId);
  if (load.status === "pod_pending") return attachPod(state, loadId);
  if (load.status === "delivered") return attachPod(state, loadId);
  return state;
}

export function qualifyConversation(state: DeskState, conversationId: string): DeskState {
  const call = state.conversations.find((c) => c.id === conversationId);
  if (!call) return state;
  const next = call.loadId ? qualifyInquiry(state, call.loadId) : state;
  return resolveCall(next, conversationId);
}

export const HUMAN_GATES = [
  "First-time carrier packet (COI + authority + agreement)",
  "Inactive or revoked MC",
  "Insurance inside 14 days",
  "Breakdown / claim / refused freight",
  "Rate not in the lane book",
  "Detention / accessorial over the cap",
  "Anything that looks like a double-broker",
];

export function nextBestAction(load: Load, matches: Carrier[]): string {
  if (load.needsHuman) return load.humanReason || "Parked for a human.";
  if (load.status === "inquiry") return "Qualify off the book and post a sell.";
  if (load.status === "qualified" || load.status === "quoting" || load.status === "booked" || load.status === "covering") {
    const book = matches.find((c) => canTender(c).ok);
    return book ? `Cover with ${book.name}.` : "No book truck. Human finds capacity.";
  }
  if (load.status === "covered") return "Send rate con and dispatch.";
  if (load.status === "dispatched" || load.status === "in_transit") return "Run the check-call and text the shipper.";
  if (load.status === "delivered" || load.status === "pod_pending") return "Chase POD, then invoice.";
  if (load.status === "invoiced") return "Closed loop. File it.";
  return "Watch the board.";
}

export function rateConText(load: Load, carrierName: string): string {
  return [
    `BROKERVOX RATE CONFIRMATION`,
    `${load.ref}`,
    `${load.pickup.city}, ${load.pickup.state} → ${load.delivery.city}, ${load.delivery.state}`,
    `${load.equipment} · ${load.weightLbs} lb · ${load.commodity}`,
    `Carrier: ${carrierName}`,
    `Carrier pay: $${load.buyRate ?? 0} all-in`,
    `Windows: ${load.pickup.windowStart} / ${load.delivery.windowEnd}`,
    `Spoken from the book. Not a carrier. Not official books-and-records.`,
  ].join("\n");
}

export { laneKey } from "./domain";

export function money(n: number | null | undefined) {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function needsHumanVet(carrier: Carrier) {
  return !canTender(carrier).ok;
}

export function vetCarrier(carrier: Carrier): { ok: boolean; human: boolean; reason: string } {
  const t = canTender(carrier);
  return { ok: t.ok, human: !t.ok, reason: t.reason };
}

export function suggestBuy(state: DeskState, load: Load) {
  const q = suggestRate(state, load);
  return q.ok ? q.buy : null;
}
