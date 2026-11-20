import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminShell } from "./AdminLayout";
import { defaults } from "../data/defaults";
import { request } from "../lib/api";

export function AdminSettings() {
  const [s, setS] = useState(defaults),
    [err, setErr] = useState(""),
    [saved, setSaved] = useState(false);
  useEffect(() => {
    request("/admin/settings")
      .then((x) => setS({ ...defaults, ...x }))
      .catch((e) => setErr(e.message));
  }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      await request("/admin/settings", { method: "PUT", body: s });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setErr(e.message);
    }
  };
  const text = (k, label) => (
    <label>
      {label}
      <input
        value={s[k] ?? ""}
        onChange={(e) => setS({ ...s, [k]: e.target.value })}
      />
    </label>
  );
  return (
    <AdminShell title="Site settings">
      <div className="admin-heading">
        <span className="eyebrow">GLOBAL CONTENT</span>
        <h1>Site & funnel settings</h1>
        <p>Edit public facing copy, links, and section visibility.</p>
      </div>
      {err && <div className="error-box">{err}</div>}
      <form className="settings-form" onSubmit={save}>
        <section className="admin-card">
          <h2>Brand & hero</h2>
          <div className="form-stack">
            {text("brand", "Brand name")}
            {text("motto", "Studio motto")}
            {text("heroTitle", "Hero headline")}
            <label>
              Hero description
              <textarea
                rows="4"
                value={s.heroCopy || ""}
                onChange={(e) => setS({ ...s, heroCopy: e.target.value })}
              />
            </label>
          </div>
        </section>
        <section className="admin-card">
          <h2>Contact & conversion</h2>
          <div className="form-stack">
            {text("fiverrUrl", "Primary Fiverr URL")}
            {text("email", "Studio email")}
          </div>
        </section>
        <section className="admin-card">
          <h2>Homepage sections</h2>
          {[
            ["showProjects", "Featured projects"],
            ["showPricing", "Services & pricing"],
            ["showTech", "Technology catalog"],
            ["availability", "Available for new projects"],
          ].map(([k, n]) => (
            <label className="switch-row" key={k}>
              <span>{n}</span>
              <input
                type="checkbox"
                checked={s[k] !== false}
                onChange={(e) => setS({ ...s, [k]: e.target.checked })}
              />
            </label>
          ))}
        </section>
        <div className="sticky-save">
          <span>
            {saved ? "Changes saved." : "Changes are saved when you publish."}
          </span>
          <button className="btn btn-primary">
            <Save size={16} /> Save settings
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
