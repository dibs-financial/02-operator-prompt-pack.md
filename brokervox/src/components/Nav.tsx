import { useEffect, useState } from "react";
import Mark from "./Mark";
import { hero, nav } from "../data";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 981px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-bar">
        <Mark />
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="btn gold small" href={hero.primary.href} target="_blank" rel="noreferrer">
            {hero.primary.label}
          </a>
        </div>
        <button
          className="burger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>
      {open && (
        <div className="wrap">
          <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="btn gold" href={hero.primary.href} target="_blank" rel="noreferrer">
              {hero.primary.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
