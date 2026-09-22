import { pricing } from "../data";

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{pricing.eyebrow}</p>
          <h2 className="h2">{pricing.title}</h2>
        </div>
        <div className="tiers">
          {pricing.tiers.map((t) => (
            <article className={`tier${t.featured ? " featured" : ""}`} key={t.name}>
              <h3>{t.name}</h3>
              <div className="price">
                {t.price}
                {t.period && <small> {t.period}</small>}
              </div>
              <p className="body">{t.body}</p>
              <ul>
                {t.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a className={`btn ${t.featured ? "gold" : "ghost"}`} href={t.cta.href} target="_blank" rel="noreferrer">
                {t.cta.label}
              </a>
            </article>
          ))}
        </div>
        <p className="footnote">{pricing.footnote}</p>
      </div>
    </section>
  );
}
