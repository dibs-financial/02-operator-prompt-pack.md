import { desks } from "../data";

const glyphs: Record<string, JSX.Element> = {
  "real-estate": <path d="M4 11 12 4l8 7v9H4z M10 20v-6h4v6" />,
  mortgage: <path d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-5h6v5" />,
  insurance: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />,
  freight: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  "m-and-a": <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 9l2 6" />,
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
