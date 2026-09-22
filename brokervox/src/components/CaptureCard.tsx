import { captureCard } from "../data";

/** Hero panel: the fields a freight desk records on every call. No sample data. */
export default function CaptureCard() {
  return (
    <aside className="capture-card" aria-label={captureCard.title}>
      <div className="capture-head">
        <div className="capture-title">{captureCard.title}</div>
        <div className="capture-sub">{captureCard.subtitle}</div>
      </div>
      <ul className="capture-fields">
        {captureCard.fields.map((f) => (
          <li key={f}>
            <span className="tick" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <p className="capture-outcome">{captureCard.outcome}</p>
    </aside>
  );
}
