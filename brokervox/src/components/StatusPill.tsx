import type { VetStatus, LoadStatus } from "../types";

const loadTone: Record<LoadStatus, string> = {
  inquiry: "info",
  qualified: "info",
  quoting: "warn",
  booked: "warn",
  covering: "warn",
  covered: "ok",
  dispatched: "ok",
  in_transit: "ok",
  delivered: "ok",
  pod_pending: "warn",
  invoiced: "ok",
  closed: "",
  exception: "bad",
  dead: "bad",
};

const loadLabel: Record<LoadStatus, string> = {
  inquiry: "Inquiry",
  qualified: "Qualified",
  quoting: "Quoted",
  booked: "Booked · uncovered",
  covering: "Covering",
  covered: "Covered",
  dispatched: "Dispatched",
  in_transit: "In transit",
  delivered: "Delivered",
  pod_pending: "POD chase",
  invoiced: "Invoiced",
  closed: "Closed",
  exception: "Human desk",
  dead: "Dead",
};

export function StatusPill({ status }: { status: LoadStatus }) {
  return <span className={`pill ${loadTone[status]}`}>{loadLabel[status]}</span>;
}

export function VetPill({ vet }: { vet: VetStatus }) {
  const tone = vet === "book" ? "ok" : vet === "pending" ? "warn" : "bad";
  const label = vet === "book" ? "On the book" : vet === "pending" ? "First-time · human" : vet === "flagged" ? "Flagged" : "Blocked";
  return <span className={`pill ${tone}`}>{label}</span>;
}

export function Money({ value }: { value: number | null }) {
  if (value == null) return <span className="muted">—</span>;
  return <span>{value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</span>;
}
