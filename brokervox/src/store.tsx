import { createContext, useContext, useMemo, useState } from "react";
import type { DeskState } from "./domain";
import { seedState } from "./seed";
import {
  autoAdvance,
  bookLoad,
  checkCall,
  collectPod,
  coverLoad,
  escalate,
  invoiceLoad,
  matchCarriers,
  qualifyConversation,
  quoteLoad,
} from "./engine";

type DeskApi = {
  state: DeskState;
  quote: (id: string) => void;
  book: (id: string) => void;
  cover: (loadId: string, carrierId: string) => void;
  advance: (id: string) => void;
  check: (id: string, text: string) => void;
  pod: (id: string) => void;
  invoice: (id: string) => void;
  escalateLoad: (id: string, reason: string) => void;
  qualify: (id: string) => void;
};

const Ctx = createContext<DeskApi | null>(null);

export function DeskProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DeskState>(seedState);

  const api = useMemo<DeskApi>(
    () => ({
      state,
      quote: (id) => setState((s) => quoteLoad({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id)),
      book: (id) => setState((s) => bookLoad({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id)),
      cover: (loadId, carrierId) =>
        setState((s) => coverLoad({ ...s, loads: s.loads.map((l) => ({ ...l })) }, loadId, carrierId)),
      advance: (id) => setState((s) => autoAdvance({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id)),
      check: (id, text) => setState((s) => checkCall({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id, text)),
      pod: (id) => setState((s) => collectPod({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id)),
      invoice: (id) => setState((s) => invoiceLoad({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id)),
      escalateLoad: (id, reason) =>
        setState((s) => escalate({ ...s, loads: s.loads.map((l) => ({ ...l })) }, id, reason)),
      qualify: (id) =>
        setState((s) => qualifyConversation({ ...s, loads: s.loads.map((l) => ({ ...l })), conversations: s.conversations.map((c) => ({ ...c })) }, id)),
    }),
    [state]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useDesk(): DeskApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDesk outside provider");
  return ctx;
}

export function useMatches(loadId: string | null) {
  const { state } = useDesk();
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return [];
  return matchCarriers(state, load);
}
