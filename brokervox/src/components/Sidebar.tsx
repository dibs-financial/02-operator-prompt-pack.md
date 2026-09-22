type Item = { id: string; label: string; count?: number };

export default function Sidebar({
  view,
  onView,
  counts,
}: {
  view: string;
  onView: (id: string) => void;
  counts: Record<string, number>;
}) {
  const items: Item[] = [
    { id: "floor", label: "Floor" },
    { id: "inbox", label: "Inbox", count: counts.inbox },
    { id: "loads", label: "Loads", count: counts.loads },
    { id: "carriers", label: "Carriers" },
    { id: "rates", label: "Lane book" },
    { id: "track", label: "Track", count: counts.track },
    { id: "exceptions", label: "Exceptions", count: counts.exceptions },
    { id: "docs", label: "Rate cons" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="mark">BV</span>
        <div>
          <strong>BrokerVox</strong>
          <span>Freight desk</span>
        </div>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          className={view === item.id ? "nav-btn active" : "nav-btn"}
          onClick={() => onView(item.id)}
          type="button"
        >
          {item.label}
          {item.count ? <span className="count">{item.count}</span> : null}
        </button>
      ))}
      <p className="foot">
        Joe · DIBS freight
        <br />
        Voice layer. Not a broker-dealer.
      </p>
    </aside>
  );
}
