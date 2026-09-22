import { useDesk } from "../store";
import { usd, when } from "../format";

export default function Docs() {
  const { state } = useDesk();
  return (
    <>
      <header className="section-head">
        <p className="eyebrow">Documents</p>
        <h2>Rate cons and invoices from the load record.</h2>
        <p className="muted">Not official books-and-records until counsel says so. Transcript + rate con live with the load.</p>
      </header>
      <div className="split">
        <div className="panel">
          <h3>Rate confirmations</h3>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Load</th><th>Carrier</th><th>Buy</th><th>Signed</th></tr>
            </thead>
            <tbody>
              {state.rateCons.map((rc) => {
                const load = state.loads.find((l) => l.id === rc.loadId);
                const carrier = state.carriers.find((c) => c.id === rc.carrierId);
                return (
                  <tr key={rc.id}>
                    <td className="mono">{rc.id}</td>
                    <td>{load?.ref}</td>
                    <td>{carrier?.name}<div className="tiny">{carrier?.mc}</div></td>
                    <td>{usd(rc.buyRate)}</td>
                    <td>{rc.signed ? "Signed" : "Out"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Shipper invoices</h3>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Shipper</th><th>Amount</th><th>Status</th><th>Issued</th></tr>
            </thead>
            <tbody>
              {state.invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="mono">{inv.id}</td>
                  <td>{inv.shipper}</td>
                  <td>{usd(inv.amount)}</td>
                  <td>{inv.status}</td>
                  <td>{when(inv.issuedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
