import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Image as ImageIcon, Save, X } from "lucide-react";
import { AdminShell } from "./AdminLayout";
import { request } from "../lib/api";
import { blankProject } from "../data/projectDefaults";

export function ProjectEditor() {
  const { id } = useParams(),
    nav = useNavigate(),
    [p, setP] = useState(blankProject),
    [catalog, setCatalog] = useState([]),
    [err, setErr] = useState(""),
    [saving, setSaving] = useState(false),
    [otherTechnology, setOtherTechnology] = useState("");
  const isNew = !id || id === "new";
  useEffect(() => {
    request("/admin/catalog")
      .then(setCatalog)
      .catch((e) => setErr(e.message));
    if (id && id !== "new")
      request("/admin/projects")
        .then((xs) => setP(xs.find((x) => x._id === id) || blankProject))
        .catch((e) => setErr(e.message));
  }, [id]);
  const set = (k, v) => setP((old) => ({ ...old, [k]: v }));
  const upload = async (e) => {
    const files = [...e.target.files];
    if (files.some((f) => f.size > 5 * 1024 * 1024)) {
      setErr("Images must be 5 MB or smaller.");
      return;
    }
    const fd = new FormData();
    files.forEach((f) => fd.append("images", f));
    try {
      const urls = await request("/upload", { method: "POST", body: fd });
      set("gallery", [...(p.gallery || []), ...urls]);
      if (!p.image) set("image", urls[0]);
    } catch (e) {
      setErr(e.message);
    }
  };
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      if (id && id !== "new")
        await request(`/admin/projects/${id}`, { method: "PUT", body: p });
      else await request("/admin/projects", { method: "POST", body: p });
      nav("/admin/projects");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <AdminShell title="Project editor">
      <div className="admin-heading">
        <span className="eyebrow">PORTFOLIO CMS</span>
        <h1>{isNew ? "Create a project" : "Edit project"}</h1>
        <p>Build a clear case study to show how the system works.</p>
      </div>
      {err && <div className="error-box">{err}</div>}
      <form className="editor-grid" onSubmit={save}>
        <div className="editor-main">
          <section className="admin-card">
            <h2>Project details</h2>
            <div className="form-stack">
              <label>
                Project title
                <input
                  required
                  value={p.title}
                  onChange={(e) => {
                    const v = e.target.value;
                    set("title", v);
                    if (isNew)
                      set(
                        "slug",
                        v
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, ""),
                      );
                  }}
                />
              </label>
              <label>
                URL slug
                <input
                  required
                  value={p.slug}
                  onChange={(e) => set("slug", e.target.value)}
                />
              </label>
              <label>
                Category
                <select
                  value={p.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {[
                    "Web App",
                    "Mobile App",
                    "DevOps & Cloud",
                    "E-commerce",
                    "SaaS",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Short description
                <textarea
                  required
                  rows="3"
                  value={p.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </label>
              {[
                ["challenge", "The challenge"],
                ["solution", "The solution"],
                ["results", "The outcome"],
              ].map(([k, l]) => (
                <label key={k}>
                  {l}
                  <textarea
                    rows="3"
                    value={p[k] || ""}
                    onChange={(e) => set(k, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>
          <section className="admin-card">
            <h2>Links & technology</h2>
            <div className="form-stack">
              <label>
                Live demo URL
                <input
                  value={p.demoUrl || ""}
                  onChange={(e) => set("demoUrl", e.target.value)}
                />
              </label>
              <label>
                GitHub URL
                <input
                  value={p.githubUrl || ""}
                  onChange={(e) => set("githubUrl", e.target.value)}
                />
              </label>
              <label>Technologies</label>
              <div className="check-grid">
                {catalog.map((t) => (
                  <label className="check-option" key={t._id}>
                    <input
                      type="checkbox"
                      checked={p.stack?.includes(t.name) || false}
                      onChange={(e) =>
                        set(
                          "stack",
                          e.target.checked
                            ? [...p.stack, t.name]
                            : p.stack.filter((x) => x !== t.name),
                        )
                      }
                    />
                    {t.name}
                  </label>
                ))}
              </div>
              <label>
                Add other technologies
                <input
                  value={otherTechnology}
                  onChange={(e) => setOtherTechnology(e.target.value)}
                  placeholder="TypeScript, GraphQL…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const v = e.currentTarget.value.trim();
                      if (v && !p.stack.includes(v))
                        set("stack", [...p.stack, v]);
                      setOtherTechnology("");
                    }
                  }}
                />
              </label>
            </div>
          </section>
        </div>
        <div className="editor-side">
          <section className="admin-card">
            <h2>Publishing</h2>
            <div className="form-stack">
              <label>
                Status
                <select
                  value={p.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label>
                Sort order
                <input
                  type="number"
                  value={p.order || 0}
                  onChange={(e) => set("order", Number(e.target.value))}
                />
              </label>
              <label className="check-option">
                <input
                  type="checkbox"
                  checked={!!p.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />{" "}
                Feature on homepage
              </label>
            </div>
          </section>
          <section className="admin-card">
            <h2>Project media</h2>
            <label className="upload-box">
              <ImageIcon />
              <strong>Upload project images</strong>
              <span>JPEG, PNG, WebP · up to 5 MB</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={upload}
              />
            </label>
            <div className="media-list">
              {p.gallery?.map((url, i) => (
                <div className="media-item" key={url}>
                  <img src={url} alt="Project upload" />
                  <label>
                    <input
                      type="radio"
                      name="thumbnail"
                      checked={p.image === url}
                      onChange={() => set("image", url)}
                    />{" "}
                    Thumbnail
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      set(
                        "gallery",
                        p.gallery.filter((x) => x !== url),
                      );
                      if (p.image === url) set("image", "");
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
            <label>
              Thumbnail URL
              <input
                value={p.image || ""}
                onChange={(e) => set("image", e.target.value)}
              />
            </label>
          </section>
          <button disabled={saving} className="btn btn-primary full">
            <Save size={16} />
            {saving ? "Saving…" : "Save project"}
          </button>
          <Link className="btn btn-outline full" to="/admin/projects">
            Cancel
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
