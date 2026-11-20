import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  Layers,
  LogOut,
  Plus,
  Settings,
  Tag,
  Users,
  User,
} from "lucide-react";
import { Brand } from "../components/Brand";
import { request } from "../lib/api";

const adminNav = [
  ["/admin", "Overview Dashboard", LayoutDashboard],
  ["/admin/settings", "Site Copy & Settings", Settings],
  ["/admin/services", "Services & Pricing", Layers],
  ["/admin/projects", "Projects Directory", FolderKanban],
  ["/admin/projects/new", "New Project", Plus],
  ["/admin/catalog", "Tech Stack Catalog", Tag],
  ["/admin/users", "Admin Users & Roles", Users],
];
export function AdminShell({ children, title }) {
  const nav = useNavigate();
  const location = useLocation();
  const [me, setMe] = useState(null);
  const [health, setHealth] = useState(null);
  useEffect(() => {
    request("/auth/me")
      .then(setMe)
      .catch(() => {
        localStorage.removeItem("ksdev-token");
        nav("/admin/login");
      });
    request("/health")
      .then(setHealth)
      .catch(() => setHealth({ database: "unavailable" }));
  }, [nav]);
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand-row">
          <Brand />
          <span className="console-label">ADMIN CMS</span>
        </div>
        <nav>
          {adminNav
            .filter(([to]) => to !== "/admin/users" || me?.role === "admin")
            .map(([to, label, Icon]) => (
              <Link
                key={to}
                to={to}
                title={label}
                className={location.pathname === to ? "current" : ""}
              >
                <Icon size={19} />
                {label}
              </Link>
            ))}
        </nav>
        <div className="side-bottom">
          <span className="db-status">
            API: {health?.ok ? "Online" : "Connecting"}
            <br />
            MongoDB: {health?.database || "Checking"}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("ksdev-token");
              nav("/admin/login");
            }}
          >
            <LogOut size={17} />
            Log Out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-top">
          <div>
            <span>ksdev › Console › </span>
            {title}
          </div>
          <div className="admin-top-right">
            <Link to="/" target="_blank">
              View Live Site <ExternalLink size={15} />
            </Link>
            <div className="admin-identity">
              <div>
                {me?.name || "Studio Admin"}
                <small>{me?.email}</small>
              </div>
              <span className="avatar">
                <User size={19} />
              </span>
            </div>
          </div>
        </header>
        <main className="admin-content">{me && children}</main>
      </div>
    </div>
  );
}
