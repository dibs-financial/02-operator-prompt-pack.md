import { desks } from "../data";

const glyphs: Record<string, JSX.Element> = {
  intake: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  sourcing: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  paperwork: <path d="M6 3h9l4 4v14H6zM9 12h6M9 16h6M9 8h3" />,
  tracking: <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  exception: <path d="M12 3 2 20h20zM12 9v5M12 17v1" />,
  billing: <path d="M4 20h16M6 16l4-5 3 3 5-7M18 7h-3M18 7v3" />,
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
