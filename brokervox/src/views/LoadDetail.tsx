
import type { DeskState } from "../domain";
import { EQUIP_LABEL, margin } from "../domain";
import { canTender, matchCarriers, suggestRate } from "../engine";
import { lbs, usd, when } from "../format";
import { Lane, StatusPill } from "../components/Ui";

export default function LoadDetail({
  state,
  loadId,
  onBack,
  onQualify,
  onCover,
  onDispatch,
  onCheckCall,
  onDeliver,
  onPod,
  onEscalate,
}: {
  state: DeskState;
  loadId: string;
  onBack: () => void;
  onQualify: (id: string) => void;
  onCover: (loadId: string, carrierId: string) => void;
  onDispatch: (id: string) => void;
  onCheckCall: (id: string) => void;
  onDeliver: (id: string) => void;
  onPod: (id: string) => void;
  onEscalate: (id: string) => void;
}) {
  const load = state.loads.find((l) => l.id === loadId);
  if (!load) return <p className="muted">Load not found.</p>;
  const quote = suggestRate(state, load);
  const matches = matchCarriers(state, load);
  const carrier = state.carriers.find((c) => c.id === load.carrierId);
  const rc = state.rateCons.find((r) => r.loadId === load.id);

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">{load.ref}</p>
          <h1>
            <Lane origin={`${load.pickup.city}, ${load.pickup.state}`} dest={`${load.delivery.city}, ${load.delivery.state}`} />
          </h1>
          <p>{EQUIP_LABEL[load.equipment]} · {lbs(load.weightLbs)} · {load.commodity} · {load.miles} mi</p>
        </div>
        <div className="btn-row">
          <StatusPill status={load.status} />
          <button className="btn btn-ghost" type="button" onClick={onBack}>Back</button>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi"><span>Sell</span><strong>{usd(load.sellRate)}</strong></div>
        <div className="kpi"><span>Buy</span><strong>{usd(load.buyRate)}</strong></div>
        <div className="kpi"><span>Margin</span><strong>{usd(margin(load))}</strong></div>
        <div className="kpi"><span>Fuel on book</span><strong>{usd(load.fuel)}</strong></div>
        <div className="kpi"><span>Human?</span><strong>{load.needsHuman ? "Yes" : "No"}</strong></div>
      </div>

      <div className="btn-row" style={{ marginBottom: 16 }}>
        {load.status === "inquiry" && <button className="btn btn-gold" type="button" onClick={() => onQualify(load.id)}>Joe: qualify + quote</button>}
        {load.status === "covered" && <button className="btn btn-gold" type="button" onClick={() => onDispatch(load.id)}>Joe: dispatch</button>}
        {["dispatched", "in_transit"].includes(load.status) && (
          <>
            <button className="btn btn-gold" type="button" onClick={() => onCheckCall(load.id)}>Joe: check-call</button>
            <button className="btn btn-ghost" type="button" onClick={() => onDeliver(load.id)}>Mark delivered</button>
          </>
        )}
        {load.status === "pod_pending" && <button className="btn btn-gold" type="button" onClick={() => onPod(load.id)}>Joe: attach POD + invoice</button>}
        <button className="btn btn-bad" type="button" onClick={() => onEscalate(load.id)}>Park for human</button>
      </div>

      {load.needsHuman && (
        <section className="panel" style={{ marginBottom: 14, outline: "1px solid var(--bad)" }}>
          <h2>Human hold</h2>
          <p>{load.humanReason}</p>
        </section>
      )}

      <div className="grid-2">
        <div>
          <section className="panel" style={{ marginBottom: 14 }}>
            <h2>Stops</h2>
            <p><strong>PU</strong> {load.pickup.name}, {load.pickup.city}, {load.pickup.state} {load.pickup.zip}</p>
            <p className="tiny">{when(load.pickup.windowStart)} – {when(load.pickup.windowEnd)} {load.pickup.notes}</p>
            <p style={{ marginTop: 8 }}><strong>DEL</strong> {load.delivery.name}, {load.delivery.city}, {load.delivery.state} {load.delivery.zip}</p>
            <p className="tiny">{when(load.delivery.windowStart)} – {when(load.delivery.windowEnd)}</p>
            <p className="tiny" style={{ marginTop: 8 }}>Shipper {load.shipper} · Consignee {load.consignee}</p>
          </section>
          <section className="panel">
            <h2>Lane book quote</h2>
            {quote.ok ? (
              <p>
                {quote.lane.origin} → {quote.lane.dest}. Sell {usd(quote.sell)} ({quote.rpmSell.toFixed(2)} rpm),
                buy {usd(quote.buy)} ({quote.rpmBuy.toFixed(2)} rpm). {quote.lane.notes}
              </p>
            ) : (
              <p className="muted">{quote.reason}</p>
            )}
            {carrier && (
              <p style={{ marginTop: 8 }}>
                Assigned: {carrier.name} {carrier.mc} {load.driver ? `· ${load.driver}` : ""}
              </p>
            )}
            {rc && <p className="tiny">Rate con {rc.id} · {usd(rc.buyRate)} · {rc.signed ? "signed" : "draft"}</p>}
          </section>
        </div>
        <section className="panel">
          <div className="panel-h"><h2>Cover from the book</h2></div>
          <ul className="list">
            {matches.slice(0, 6).map((c) => {
              const vet = canTender(c);
              return (
                <li key={c.id}>
                  <div className="split">
                    <strong>{c.name}</strong>
                    <span className="tiny">{c.mc} · {c.onTimePct}% on time</span>
                  </div>
                  <p className="tiny">{vet.reason} · cargo ${c.cargoLimit.toLocaleString()}</p>
                  <button
                    className={vet.ok ? "btn btn-gold" : "btn btn-ghost"}
                    type="button"
                    style={{ marginTop: 8 }}
                    onClick={() => onCover(load.id, c.id)}
                  >
                    {vet.ok ? "Joe: tender + rate con" : "Joe: park / flag"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
