import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminShell } from "./AdminLayout";
import { request } from "../lib/api";

export function AdminServices() {
  const [items, setItems] = useState([]),
    [err, setErr] = useState(""),
    [saved, setSaved] = useState("");
  useEffect(() => {
    request("/admin/services")
      .then(setItems)
      .catch((e) => setErr(e.message));
  }, []);
  const update = (i, k, v) =>
    setItems((xs) => xs.map((x, n) => (n === i ? { ...x, [k]: v } : x)));
  const tier = (i, j, k, v) =>
    setItems((xs) =>
      xs.map((x, n) =>
        n === i
          ? {
              ...x,
              tiers: x.tiers.map((t, z) => (z === j ? { ...t, [k]: v } : t)),
            }
          : x,
      ),
    );
  const save = async (i) => {
    try {
      await request(`/admin/services/${items[i]._id}`, {
        method: "PUT",
        body: items[i],
      });
      setSaved("Package settings saved.");
      setTimeout(() => setSaved(""), 2500);
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <AdminShell title="Services & pricing">
      <div className="admin-heading">
        <span className="eyebrow">OFFER MANAGEMENT</span>
        <h1>Services & pricing</h1>
        <p>
          Manage availability, Fiverr links, and the packages shown to clients.
        </p>
      </div>
      {err && <div className="error-box">{err}</div>}
      {items.map((s, i) => (
        <section className="admin-card service-editor" key={s._id}>
          <div className="service-admin-head">
            <div>
              <h2>{s.title}</h2>
              <input
                className="inline-input"
                value={s.description}
                onChange={(e) => update(i, "description", e.target.value)}
              />
            </div>
            <select
              value={s.status}
              onChange={(e) => update(i, "status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="coming_soon">Coming soon</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
          <div className="tier-editor-grid">
            {s.tiers?.map((t, j) => (
              <div className="tier-editor" key={t.name}>
                <span className="eyebrow">{t.name}</span>
                {[
                  "subtitle",
                  "price",
                  "delivery",
                  "revisions",
                  "fiverrUrl",
                ].map((k) => (
                  <label key={k}>
                    {k}
                    <input
                      value={t[k] || ""}
                      onChange={(e) => tier(i, j, k, e.target.value)}
                    />
                  </label>
                ))}
                <label>
                  Features, one per line
                  <textarea
                    rows="5"
                    value={t.features?.join("\n")}
                    onChange={(e) =>
                      tier(i, j, "features", e.target.value.split("\n"))
                    }
                  />
                </label>
                <label className="check-option">
                  <input
                    type="checkbox"
                    checked={!!t.includesDevops}
                    onChange={(e) =>
                      tier(i, j, "includesDevops", e.target.checked)
                    }
                  />{" "}
                  Includes DevOps
                </label>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => save(i)}>
            <Save size={15} /> Save {s.title}
          </button>
        </section>
      ))}
      <div className="save-message">{saved}</div>
    </AdminShell>
  );
}
