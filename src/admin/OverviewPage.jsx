import { useEffect, useState } from "react";
import { ArrowRight, Layers, Plus, Settings, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminShell } from "./AdminLayout";
import { request } from "../lib/api";

export function AdminOverview() {
  const [summary, setSummary] = useState(null);
  const [available, setAvailable] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    Promise.all([
      request("/admin/summary"),
      request("/admin/settings"),
      request("/admin/inquiries"),
    ])
      .then(([stats, settings, briefs]) => {
        setSummary(stats);
        setAvailable(!!settings.availability);
        setInquiries(briefs);
      })
      .catch((e) => setError(e.message));
  }, []);
  async function toggle() {
    setBusy(true);
    try {
      await request("/admin/settings", {
        method: "PUT",
        body: { availability: !available },
      });
      setAvailable(!available);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AdminShell title="Overview">
      <div className="admin-heading">
        <span className="eyebrow">
          SYSTEM STATUS /// OPERATIONAL CONTROL CENTER
        </span>
        <h1>Studio Overview & Funnel Status</h1>
        <p>
          Portfolio publishing, client intake, and global availability controls.
        </p>
      </div>
      {error && <div className="error-box">{error}</div>}
      <section className="availability-control">
        <div>
          <h2>
            Public Availability Status: {available ? "ACTIVE" : "UNAVAILABLE"}
          </h2>
          <p>
            Controls the “Available for New Projects” indicator across the
            public studio site.
          </p>
        </div>
        <button
          role="switch"
          aria-checked={available}
          aria-label="Public project availability"
          disabled={busy}
          className={`toggle ${available ? "on" : ""}`}
          onClick={toggle}
        >
          <i />
        </button>
      </section>
      <div className="metric-grid">
        {[
          ["Published Projects", summary?.published, "/admin/projects"],
          ["Draft & Queued", summary?.drafts, "/admin/projects"],
          ["Active Services", summary?.services, "/admin/services"],
        ].map(([label, value, to]) => (
          <Link key={label} to={to} className="metric">
            <span>{label}</span>
            <strong>{value ?? "—"}</strong>
            <small>
              View details <ArrowRight size={14} />
            </small>
          </Link>
        ))}
        <a className="metric" href="#inquiries">
          <span>Project Inquiries</span>
          <strong>{inquiries.length}</strong>
          <small>
            Browse briefs <ArrowRight size={14} />
          </small>
        </a>
      </div>
      <div className="overview-lower">
        <section className="admin-card" id="inquiries">
          <h2>Recent Studio Inquiries & Scope Briefs</h2>
          <p className="muted">
            Project details submitted through the custom scope form.
          </p>
          {inquiries.length ? (
            inquiries.map((brief) => (
              <details className="inquiry-item" key={brief.id}>
                <summary>
                  <strong>{brief.name}</strong>
                  <span>
                    {brief.service} · {brief.budget || "Budget pending"}
                  </span>
                </summary>
                <a href={`mailto:${brief.email}`}>{brief.email}</a>
                <pre>{brief.message}</pre>
                <small>{new Date(brief.createdAt).toLocaleString()}</small>
              </details>
            ))
          ) : (
            <div className="empty-state">
              No project briefs yet. New submissions will appear here.
            </div>
          )}
        </section>
        <section className="admin-card">
          <h2>Quick Studio Actions</h2>
          <div className="quick-grid">
            <Link to="/admin/projects/new">
              <Plus /> New Case Study / Project
            </Link>
            <Link to="/admin/services">
              <Layers /> Edit Fiverr Pricing Tiers
            </Link>
            <Link to="/admin/settings">
              <Settings /> Update Hero Funnel Copy
            </Link>
            <Link to="/admin/catalog">
              <Tag /> Manage Tech Stack Tags
            </Link>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
