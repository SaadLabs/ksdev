import { useEffect, useState } from "react";
import { Code2, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "./AdminLayout";
import { request } from "../lib/api";

export function AdminCatalog() {
  const [items, setItems] = useState([]),
    [name, setName] = useState(""),
    [category, setCategory] = useState("Web"),
    [err, setErr] = useState("");
  const load = () =>
    request("/admin/catalog")
      .then(setItems)
      .catch((e) => setErr(e.message));
  useEffect(() => {
    load();
  }, []);
  const add = async (e) => {
    e.preventDefault();
    try {
      await request("/admin/catalog", {
        method: "POST",
        body: { name, category },
      });
      setName("");
      load();
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <AdminShell title="Tech catalog">
      <div className="admin-heading">
        <span className="eyebrow">TECHNOLOGY DIRECTORY</span>
        <h1>Tech stack catalog</h1>
        <p>
          Maintain technology tags available to the public and project editor.
        </p>
      </div>
      {err && <div className="error-box">{err}</div>}
      <form className="add-tech" onSubmit={add}>
        <input
          required
          placeholder="Technology name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Web</option>
          <option>Infrastructure</option>
          <option>Mobile</option>
          <option>Data</option>
        </select>
        <button className="btn btn-primary">
          <Plus size={16} /> Add technology
        </button>
      </form>
      <div className="tech-admin-list">
        {items.map((t) => (
          <div key={t._id}>
            <span className="tech-mark">
              <Code2 size={17} />
            </span>
            <b>{t.name}</b>
            <span>{t.category}</span>
            <button
              onClick={async () => {
                if (confirm(`Remove ${t.name} from catalog?`)) {
                  await request(`/admin/catalog/${t._id}`, {
                    method: "DELETE",
                  });
                  load();
                }
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
