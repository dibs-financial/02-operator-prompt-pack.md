import { cta } from "../data";

export default function Cta() {
  return (
    <section className="cta" id="cta">
      <div className="wrap">
        <h2>{cta.title}</h2>
        <p className="lede">{cta.body}</p>
        <div className="cta-actions">
          <a className="btn gold" href={cta.primary.href} target="_blank" rel="noreferrer">
            {cta.primary.label}
          </a>
          <a className="btn ghost" href={cta.secondary.href}>
            {cta.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
