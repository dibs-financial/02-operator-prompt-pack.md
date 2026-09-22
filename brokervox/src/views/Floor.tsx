import { automationShare, HUMAN_GATES, nextBestAction, matchCarriers } from "../engine";
import { EQUIP_LABEL, margin } from "../domain";
import { Money, StatusPill, Lane } from "../components/Ui";
import { useDesk } from "../store";
import type { ViewId } from "../types";

export default function Floor({ onOpen }: { onOpen: (v: ViewId) => void }) {
  const { state, advance } = useDesk();
  const share = automationShare(state);
  const working = state.loads.filter((l) => !["closed", "dead"].includes(l.status));
  const inbox = state.conversations.filter((c) => !c.resolved);

  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Floor</p>
        <h2>Joe is running the desk.</h2>
        <p className="muted">
          Automates qualify → quote → cover → track → POD → invoice from the book.
          The human keeps claims, first-time packets, dead authority, and anything not in the book.
        </p>
      </header>

      <div className="cards">
        <div className="panel stat">
          <b>{share.pct}%</b>
          <span>of live loads running without a human</span>
        </div>
        <div className="panel stat">
          <b>{working.length}</b>
          <span>working loads</span>
        </div>
        <div className="panel stat">
          <b>{inbox.length}</b>
          <span>open inbound lines</span>
        </div>
        <div className="panel stat">
          <b>{share.human}</b>
          <span>parked for a human</span>
        </div>
      </div>

      <div className="split" style={{ marginTop: 16 }}>
        <div className="panel">
          <h3>Live board</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Lane</th>
                <th>Status</th>
                <th>Margin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {working.map((l) => (
                <tr key={l.id}>
                  <td className="mono">{l.ref}</td>
                  <td>
                    <Lane
                      origin={`${l.pickup.city}, ${l.pickup.state}`}
                      dest={`${l.delivery.city}, ${l.delivery.state}`}
                      sub={`${EQUIP_LABEL[l.equipment]} · ${l.commodity}`}
                    />
                  </td>
                  <td>
                    <StatusPill status={l.status} />
                    {l.needsHuman ? <div className="tiny">Human</div> : null}
                  </td>
                  <td>
                    <Money value={margin(l)} signed />
                  </td>
                  <td>
                    <button className="btn btn-gold" type="button" onClick={() => advance(l.id)} disabled={l.needsHuman}>
                      Joe next
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="panel" style={{ marginBottom: 12 }}>
            <h3>The 10% Joe will not touch</h3>
            <ul className="tiny" style={{ paddingLeft: 16, lineHeight: 1.7 }}>
              {HUMAN_GATES.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h3>Next actions</h3>
            {working.slice(0, 5).map((l) => (
              <p key={l.id} className="tiny" style={{ marginTop: 8 }}>
                <b>{l.ref}</b> — {nextBestAction(l, matchCarriers(state, l))}
              </p>
            ))}
            <div className="actions">
              <button className="btn btn-ghost" type="button" onClick={() => onOpen("inbox")}>
                Open inbox
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => onOpen("exceptions")}>
                Exceptions
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
