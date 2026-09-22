import { deskCard } from "../data";

/** The Joe card. Every chip opens the live RubyVox desk in a new tab. */
export default function DeskCard() {
  return (
    <aside className="desk-card" aria-label={`${deskCard.name} desk`}>
      <div className="desk-top">
        <div className="desk-id">
          <div className="avatar" aria-hidden="true">
            {deskCard.name.charAt(0)}
          </div>
          <div>
            <div className="desk-name">{deskCard.name}</div>
            <div className="desk-role">
              {deskCard.role} · {deskCard.owner}
            </div>
          </div>
        </div>
        <span className="status">
          <i aria-hidden="true" /> {deskCard.status}
        </span>
      </div>
      <p className="desk-intro">{deskCard.intro}</p>
      <div className="chips">
        {deskCard.chips.map((chip) => (
          <a key={chip} className="chip" href={deskCard.open.href} target="_blank" rel="noreferrer">
            {chip}
          </a>
        ))}
      </div>
      <div className="desk-foot">
        <div className="wave" aria-hidden="true">
          <b /><b /><b /><b /><b /><b /><b />
        </div>
        <a className="btn gold small" href={deskCard.open.href} target="_blank" rel="noreferrer">
          {deskCard.open.label}
        </a>
      </div>
    </aside>
  );
}
