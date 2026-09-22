import DeskCard from "./DeskCard";
import { hero } from "../data";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>
            {hero.title.map((line, i) => (
              <span key={line} className={`line${i === hero.title.length - 1 ? " gold" : ""}`}>
                {line}
              </span>
            ))}
          </h1>
          <p className="lede">{hero.body}</p>
          <div className="hero-actions">
            <a className="btn gold" href={hero.primary.href} target="_blank" rel="noreferrer">
              {hero.primary.label}
            </a>
            <a className="btn ghost" href={hero.secondary.href} target="_blank" rel="noreferrer">
              {hero.secondary.label}
            </a>
          </div>
          <p className="hero-note">{hero.note}</p>
        </div>
        <DeskCard />
      </div>
    </section>
  );
}
