import { stats } from "../data";

export default function Stats() {
  return (
    <section className="stats" aria-label="At a glance">
      <div className="wrap">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
