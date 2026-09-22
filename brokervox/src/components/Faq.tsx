import { faq } from "../data";

/** Native <details> so the FAQ works without JavaScript, including in the static fallback. */
export default function Faq() {
  return (
    <section className="section light" id="faq">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="h2">{faq.title}</h2>
        </div>
        <div className="faq-list">
          {faq.items.map((item, i) => (
            <details className="faq-item" key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
