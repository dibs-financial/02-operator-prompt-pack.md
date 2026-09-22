export default function Topbar({
  openLoads,
  uncovered,
  marginDay,
  afterHours,
}: {
  openLoads: number;
  uncovered: number;
  marginDay: number;
  afterHours: boolean;
}) {
  return (
    <header className="topbar">
      <div className="desk-live">
        <span className="dot" />
        Desk online · Joe · DIBS
        {afterHours ? <span className="pill pill-gold">After hours</span> : null}
      </div>
      <div className="top-metrics">
        <span>
          <b>{openLoads}</b> working
        </span>
        <span>
          <b>{uncovered}</b> uncovered
        </span>
        <span>
          <b>
            {marginDay.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
          </b>
          booked margin
        </span>
      </div>
    </header>
  );
}
