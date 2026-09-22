import { useDesk } from "../store";
import { EQUIP_LABEL } from "../domain";
import { vetCarrier } from "../engine";
import { Pill } from "../components/Ui";

export default function Carriers() {
  const { state } = useDesk();
  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Carriers</p>
        <h2>The book, not the board spray.</h2>
        <p className="muted">Joe covers book carriers with active authority and in-date insurance. First-time and flagged packets wait for a human.</p>
      </header>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Carrier</th>
              <th>MC / DOT</th>
              <th>Equip</th>
              <th>Vet</th>
              <th>Authority</th>
              <th>COI</th>
              <th>On-time</th>
            </tr>
          </thead>
          <tbody>
            {state.carriers.map((c) => {
              const v = vetCarrier(c);
              const tone = c.vet === "blocked" || c.authority === "inactive" ? "bad" : c.vet === "book" && !v.human ? "ok" : "warn";
              return (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                    <div className="tiny">{c.city}, {c.state} · {c.phone}</div>
                  </td>
                  <td className="mono">{c.mc}<br />{c.dot}</td>
                  <td>{c.equipment.map((e) => EQUIP_LABEL[e]).join(", ")}</td>
                  <td><Pill tone={tone}>{c.vet}</Pill></td>
                  <td>{c.authority}</td>
                  <td>{c.insuranceExpiry}</td>
                  <td>{c.onTimePct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
