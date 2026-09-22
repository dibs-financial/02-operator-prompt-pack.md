import { captureCard } from "../data";

/** Hero panel: the stages the desk runs on one load. No sample data. */
export default function CaptureCard() {
  return (
    <aside className="capture-card" aria-label={captureCard.title}>
      <div className="capture-head">
        <div className="capture-title">{captureCard.title}</div>
        <div className="capture-sub">{captureCard.subtitle}</div>
      </div>
      <ol className="capture-fields">
        {captureCard.fields.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ol>
      <p className="capture-outcome">{captureCard.outcome}</p>
    </aside>
  );
}
