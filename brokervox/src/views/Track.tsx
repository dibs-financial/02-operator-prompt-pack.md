import { useState } from "react";
import { useDesk } from "../store";
import { StatusPill, Lane } from "../components/Ui";
import { when } from "../format";

export default function Track() {
  const { state, check, advance } = useDesk();
  const rolling = state.loads.filter((l) => ["covered", "dispatched", "in_transit", "pod_pending", "delivered"].includes(l.status));
  const [id, setId] = useState(rolling[0]?.id ?? state.loads[0]?.id ?? null);
  const load = state.loads.find((l) => l.id === id);
  const evs = state.events.filter((e) => e.loadId === id);
  const carrier = load?.carrierId ? state.carriers.find((c) => c.id === load.carrierId) : undefined;

  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Track</p>
        <h2>Check-calls without the third callback.</h2>
      </header>
      <div className="split">
        <div className="panel">
          <table className="table">
            <thead>
              <tr><th>Ref</th><th>Lane</th><th>Driver</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rolling.map((l) => (
                <tr key={l.id} className={l.id === id ? "on" : ""} onClick={() => setId(l.id)}>
                  <td className="mono">{l.ref}</td>
                  <td><Lane origin={l.pickup.city} dest={l.delivery.city} /></td>
                  <td>{l.driver ?? "—"}</td>
                  <td><StatusPill status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          {load ? (
            <>
              <h3>{load.ref}</h3>
              <p className="tiny">{carrier?.name ?? "Uncovered"} · {load.driver ?? "no driver"} · {load.driverPhone ?? ""}</p>
              <div className="actions">
                <button className="btn btn-gold" type="button" onClick={() => check(load.id, `${load.ref} check-call logged by Joe. Rolling, on the book ETA.`)}>
                  Log check-call
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => advance(load.id)}>
                  Joe next
                </button>
              </div>
              <div style={{ marginTop: 14 }}>
                {evs.map((e) => (
                  <p key={e.id} className="tiny" style={{ padding: "8px 0", borderTop: "1px solid var(--line)" }}>
                    {when(e.at)} · {e.kind} · {e.text}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <p className="muted">Nothing rolling.</p>
          )}
        </div>
      </div>
    </>
  );
}
