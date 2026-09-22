import { useDesk } from "../store";
import { EQUIP_LABEL } from "../domain";
import { usd } from "../format";

export default function Rates() {
  const { state } = useDesk();
  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Lane book</p>
        <h2>Joe only quotes numbers that are in the book.</h2>
        <p className="muted">Not a live DAT pull. Not a promise. Sell / buy RPM is what this desk is allowed to say.</p>
      </header>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Lane</th>
              <th>Equip</th>
              <th>Miles</th>
              <th>Sell RPM</th>
              <th>Buy RPM</th>
              <th>Book sell</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {state.lanes.map((ln) => (
              <tr key={ln.id}>
                <td>{ln.origin} → {ln.dest}</td>
                <td>{EQUIP_LABEL[ln.equipment]}</td>
                <td>{ln.miles}</td>
                <td>${ln.rpmSell.toFixed(2)}</td>
                <td>${ln.rpmBuy.toFixed(2)}</td>
                <td>{usd(Math.round(ln.rpmSell * ln.miles))}</td>
                <td className="tiny">{ln.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
