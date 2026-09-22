import { useState } from "react";
import { useDesk } from "../store";
import { when } from "../format";

export default function Inbox() {
  const { state, qualify, advance } = useDesk();
  const [id, setId] = useState(state.conversations[0]?.id ?? null);
  const conv = state.conversations.find((c) => c.id === id);
  const load = conv?.loadId ? state.loads.find((l) => l.id === conv.loadId) : undefined;

  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Inbox</p>
        <h2>Every ring, on the record.</h2>
        <p className="muted">Talk page, overflow, SMS. Joe extracts the load and writes the next step.</p>
      </header>
      <div className="split">
        <div className="panel">
          {state.conversations.map((c) => (
            <div key={c.id} className={c.id === id ? "conv on" : "conv"} onClick={() => setId(c.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <strong>{c.from}</strong>
                <span className="tiny">{when(c.at)}</span>
              </div>
              <div className="tiny">
                {c.role} · {c.intent} · {c.line}
              </div>
              <p style={{ marginTop: 6 }}>{c.transcript.split("\n")[0]}</p>
            </div>
          ))}
        </div>
        <div className="panel">
          {conv ? (
            <>
              <h3>{conv.from}</h3>
              <p className="tiny">
                {conv.intent} · next: {conv.nextStep}
              </p>
              <div className="pre">{conv.transcript}</div>
              <div className="kv" style={{ marginTop: 12 }}>
                <i>Extracted</i>
                <span>
                  {conv.extracted.origin ?? "—"} → {conv.extracted.dest ?? "—"}
                  <br />
                  {conv.extracted.equipment} {conv.extracted.weightLbs ? `· ${conv.extracted.weightLbs} lb` : ""}
                  {conv.extracted.mc ? ` · ${conv.extracted.mc}` : ""}
                </span>
                <i>Load</i>
                <span>{load ? `${load.ref} · ${load.status}` : "None attached"}</span>
              </div>
              <div className="actions">
                <button className="btn btn-gold" type="button" onClick={() => qualify(conv.id)}>
                  Qualify
                </button>
                {load ? (
                  <button className="btn btn-ghost" type="button" onClick={() => advance(load.id)}>
                    Joe next on {load.ref}
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <p className="muted">Select a line.</p>
          )}
        </div>
      </div>
    </>
  );
}
