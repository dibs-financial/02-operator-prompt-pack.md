import Mark from "./Mark";
import { footer } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <Mark small />
          <p style={{ marginTop: 14 }}>{footer.line}</p>
          <p className="disclaimer">{footer.disclaimer}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {footer.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
