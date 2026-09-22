import { how } from "../data";

export default function How() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{how.eyebrow}</p>
          <h2 className="h2">{how.title}</h2>
        </div>
        <ol className="steps">
          {how.steps.map((s) => (
            <li className="step" key={s.n}>
              <span className="n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
