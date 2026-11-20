import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";
import { defaults } from "../data/defaults";
import { Brand } from "./Brand";

export function Header({ settings = defaults }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav container">
        <Brand name={settings.brand} />
        <button
          className="menu-btn"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          <a href="/#studio">Studio</a>
          <a href="/#projects">Featured work</a>
          <a href="/#pricing">Services & pricing</a>
          <a href="/#stack">Tech stack</a>
          <button
            className="link-button"
            onClick={() => window.dispatchEvent(new Event("open-brief"))}
          >
            Custom scope
          </button>
        </nav>
        <div className="nav-end">
          <span className="availability">
            <i />
            {settings.availability === false
              ? "Currently unavailable"
              : "Available for new projects"}
          </span>
          <a
            className="btn btn-dark small"
            href={settings.fiverrUrl || defaults.fiverrUrl}
            target="_blank"
            rel="noreferrer"
          >
            Order on Fiverr <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
