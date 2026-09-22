import type { DeskState } from "../types";
import { Money, StatusPill, VetPill } from "../components/StatusPill";
import { matchCarriers, money, needsHumanVet, suggestBuy } from "../engine";
import { when } from "../format";

export default function Loads({
  state,
  selectedId,
  onSelect,
  onCover,
  onBook,
  onDispatch,
}: {
  state: DeskState;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCover: (loadId: string, carrierId: string) => void;
  onBook: (id: string) => void;
  onDispatch: (id: string) => void;
}) {
  const load = state.loads.find((l) => l.id === selectedId) ?? state.loads[0];
  const matches = load ? matchCarriers(state, load) : [];
  const buy = load ? suggestBuy(state, load) : 0;
  const carrier = state.carriers.find((c) => c.id === load?.carrierId);

  return (
    <section className="split">
      <div className="panel">
        <h2>Board</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Lane</th>
              <th>Sell</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {state.loads.map((l) => (
              <tr key={l.id} className={l.id === load?.id ? "on" : undefined} onClick={() => onSelect(l.id)}>
                <td className="ref">{l.ref}</td>
                <td>{l.pickup.city} → {l.delivery.city}<div className="tiny">{l.equipment} · {l.miles} mi</div></td>
                <td><Money value={l.sellRate} /></td>
                <td><StatusPill status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {load && (
        <div className="panel">
          <h2>{load.ref}</h2>
          <p className="muted">{load.pickup.city}, {load.pickup.state} → {load.delivery.city}, {load.delivery.state}</p>
          <div className="kv" style={{ marginTop: 12 }}>
            <i>Shipper</i><span>{load.shipper}</span>
            <i>Commodity</i><span>{load.commodity} · {load.weightLbs.toLocaleString()} lb</span>
            <i>Pickup</i><span>{load.pickup.name} · {when(load.pickup.windowStart)} – {when(load.pickup.windowEnd)}</span>
            <i>Delivery</i><span>{load.delivery.name} · {when(load.delivery.windowStart)} – {when(load.delivery.windowEnd)}</span>
            <i>Sell / buy</i><span><Money value={load.sellRate} /> / <Money value={load.buyRate} /></span>
            <i>Covered by</i><span>{carrier ? `${carrier.name} ${carrier.mc}` : "—"}</span>
          </div>
          <div className="actions">
            {(load.status === "quoting" || load.status === "qualified" || load.status === "inquiry") && (
              <button className="btn btn-ghost" onClick={() => onBook(load.id)}>Mark shipper booked</button>
            )}
            {(load.status === "covered" || load.status === "booked") && load.carrierId && (
              <button className="btn btn-gold" onClick={() => onDispatch(load.id)}>Dispatch</button>
            )}
          </div>
          <h3 style={{ margin: "18px 0 8px", fontSize: "1.2rem" }}>Match from the book</h3>
          <p className="tiny">Suggested buy {money(buy)} from the lane sheet. First-time and flagged carriers stop for a human.</p>
          {matches.slice(0, 5).map((c) => (
            <div key={c.id} className="row" style={{ cursor: "default", gridTemplateColumns: "1fr auto" }}>
              <div>
                {c.name}
                <div className="tiny">{c.mc} · on-time {c.onTimePct}% · {c.preferredLanes.join(" · ")}</div>
                <VetPill vet={c.vet} />
              </div>
              <button
                className="btn btn-gold"
                onClick={() => onCover(load.id, c.id)}
                disabled={c.vet === "blocked"}
              >
                {needsHumanVet(c) ? "Send to human" : "Cover"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
