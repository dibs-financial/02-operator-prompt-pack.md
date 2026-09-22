import type { LoadStatus } from "../domain";
import { STATUS_LABEL } from "../domain";
import { statusTone, usd } from "../format";

export function Pill({
  tone,
  children,
}: {
  tone: "ok" | "gold" | "warn" | "bad" | "info" | "mute";
  children: React.ReactNode;
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function StatusPill({ status }: { status: LoadStatus }) {
  return <Pill tone={statusTone(status)}>{STATUS_LABEL[status]}</Pill>;
}

export function Money({
  value,
  signed,
}: {
  value: number | null | undefined;
  signed?: boolean;
}) {
  const cls = signed && value != null ? (value >= 0 ? "money pos" : "money neg") : "money";
  return <span className={cls}>{usd(value)}</span>;
}

export function Lane({ origin, dest, sub }: { origin: string; dest: string; sub?: string }) {
  return (
    <div className="lane">
      {origin} → {dest}
      {sub ? <small>{sub}</small> : null}
    </div>
  );
}
