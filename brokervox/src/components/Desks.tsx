import { desks } from "../data";

const glyphs: Record<string, JSX.Element> = {
  checkin: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  dispatch: <path d="M4 6h12v9H4zM16 9h3l2 3v3h-5zM7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM4 3h5" />,
  assign: <path d="M6 3h9l4 4v14H6zM9 12h6M9 16h6M9 8h3" />,
  exception: <path d="M12 3 2 20h20zM12 9v5M12 17v1" />,
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
