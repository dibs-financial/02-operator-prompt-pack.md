import { desks } from "../data";

const glyphs: Record<string, JSX.Element> = {
  shipper: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  carrier: <path d="M4 17V9l4-4h8l4 4v8H4zM4 13h16M9 17v3M15 17v3" />,
  tracking: <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  rates: <path d="M4 20h16M6 16l4-5 3 3 5-7M18 7h-3M18 7v3" />,
};

export default function Desks() {
  return (
    <section className="section light" id="desks">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{desks.eyebrow}</p>
          <h2 className="h2">{desks.title}</h2>
          <p className="lede">{desks.body}</p>
        </div>
        <div className="desk-grid">
          {desks.items.map((d) => (
            <article className="desk-type" key={d.key}>
              <div className="glyph" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
                  {glyphs[d.key]}
                </svg>
              </div>
              <h3>{d.name}</h3>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
