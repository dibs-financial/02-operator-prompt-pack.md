import type { Load, LoadStatus } from "./domain";
import { margin } from "./domain";

export function usd(n: number | null | undefined): string {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function rpm(n: number | null | undefined): string {
  if (n == null) return "—";
  return `$${n.toFixed(2)}`;
}

export function lbs(n: number): string {
  return `${n.toLocaleString()} lb`;
}

export function statusTone(s: LoadStatus): "ok" | "gold" | "warn" | "bad" | "info" | "mute" {
  switch (s) {
    case "covered":
    case "dispatched":
    case "in_transit":
    case "invoiced":
    case "closed":
      return "ok";
    case "qualified":
    case "quoting":
    case "booked":
    case "covering":
      return "gold";
    case "delivered":
    case "pod_pending":
      return "info";
    case "exception":
      return "bad";
    case "dead":
      return "mute";
    default:
      return "warn";
  }
}

export function marginTone(load: Load): "pos" | "neg" | "" {
  const m = margin(load);
  if (m == null) return "";
  return m >= 0 ? "pos" : "neg";
}

export function when(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
