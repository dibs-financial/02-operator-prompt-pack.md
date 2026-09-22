import { features } from "../data";

export default function Features() {
  return (
    <section className="section light" id="features">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{features.eyebrow}</p>
          <h2 className="h2">{features.title}</h2>
        </div>
        <div className="features-grid">
          {features.items.map((f) => (
            <article className="feature" key={f.title}>
              <div className="dot" aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
