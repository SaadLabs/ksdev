import { Link } from "react-router-dom";
import { defaults } from "../data/defaults";
import { Brand } from "./Brand";

export function Footer({ settings = defaults }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand name={settings.brand} />
          <p>
            Software Engineering & Cloud Infrastructure Studio. Architecture,
            development, and digital delivery.
          </p>
          <span className="eyebrow">MERN · CLOUD · PRODUCTION SYSTEMS</span>
        </div>
        <div>
          <span className="eyebrow">Engineering</span>
          <a href="/#studio">Architecture Practice</a>
          <a href="/#stack">Technology Stack</a>
          <Link to="/projects">Case Studies</Link>
        </div>
        <div>
          <span className="eyebrow">Engagements</span>
          <a href="/#pricing">Services & Pricing</a>
          <button
            className="link-button"
            onClick={() => window.dispatchEvent(new Event("open-brief"))}
          >
            Custom Scope Brief
          </button>
          <a href={settings.fiverrUrl} target="_blank" rel="noreferrer">
            Direct Fiverr Gig
          </a>
        </div>
        <div>
          <span className="eyebrow">Infrastructure</span>
          <a href={`mailto:${settings.email}`}>Contact the Studio</a>
          <Link to="/admin/login">Studio Console</Link>
          <a href="/#projects">Delivery Portfolio</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {settings.brand}. All rights reserved.
        </span>
        <span>{settings.motto}</span>
      </div>
    </footer>
  );
}
