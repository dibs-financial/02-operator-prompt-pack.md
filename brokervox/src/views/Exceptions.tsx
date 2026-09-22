import { useDesk } from "../store";
import { StatusPill, Lane } from "../components/Ui";
import { HUMAN_GATES } from "../engine";

export default function Exceptions() {
  const { state } = useDesk();
  const rows = state.loads.filter((l) => l.needsHuman || l.status === "exception");
  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Exceptions</p>
        <h2>The 10% that stays on a licensed human.</h2>
        <p className="muted">Joe parks these. He does not invent a claim number, a DAT print, or an authority resurrection.</p>
      </header>
      <div className="split">
        <div className="panel">
          {rows.length === 0 ? <p className="muted">Clear floor.</p> : null}
          {rows.map((l) => (
            <div key={l.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{l.ref}</strong>
                <StatusPill status={l.status} />
              </div>
              <Lane origin={`${l.pickup.city}, ${l.pickup.state}`} dest={`${l.delivery.city}, ${l.delivery.state}`} />
              <p className="warnbox" style={{ marginTop: 8 }}>{l.humanReason ?? "Needs a human."}</p>
            </div>
          ))}
        </div>
        <div className="panel">
          <h3>Human gates</h3>
          <ul className="tiny" style={{ paddingLeft: 16, lineHeight: 1.8 }}>
            {HUMAN_GATES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
