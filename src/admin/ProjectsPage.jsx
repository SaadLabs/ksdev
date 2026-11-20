import { useEffect, useState } from "react";
import {
  Archive as ArchiveIcon,
  CheckCircle2,
  Download,
  Folder,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminShell } from "./AdminLayout";
import { request } from "../lib/api";

export function AdminProjects() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [technology, setTechnology] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const load = async () => setItems(await request("/admin/projects"));
  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    setPage(1);
  }, [filter, query, category, technology, perPage]);

  async function mutate(action) {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
      setSelected([]);
    } catch (e) {
      setError(e.message);
      await load().catch(() => {});
    } finally {
      setBusy(false);
    }
  }
  const update = (id, changes) =>
    request(`/admin/projects/${id}`, { method: "PUT", body: changes });
  const rows = items.filter(
    (p) =>
      (filter === "all" || p.status === filter) &&
      (!category || p.category === category) &&
      (!technology || p.stack?.includes(technology)) &&
      `${p.title} ${p.slug} ${(p.stack || []).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const currentPage = Math.min(page, pageCount);
  const visible = rows.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );
  const allChecked =
    visible.length > 0 && visible.every((p) => selected.includes(p._id));
  const toggle = (id) =>
    setSelected((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  function bulk(changes) {
    mutate(() => Promise.all(selected.map((id) => update(id, changes))));
  }
  function exportCsv() {
    const cell = (value) =>
      '"' +
      String(value ?? "")
        .replace(/^[=+@-]/, "'$&")
        .replaceAll('"', '""') +
      '"';
    const csv = [
      [
        "Title",
        "Slug",
        "Category",
        "Technologies",
        "Status",
        "Featured",
        "Position",
      ],
      ...rows.map((p) => [
        p.title,
        p.slug,
        p.category,
        p.stack?.join("; "),
        p.status,
        p.featured,
        p.order,
      ]),
    ]
      .map((row) => row.map(cell).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "ksdev-projects.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  const counts = Object.fromEntries(
    ["published", "draft", "archived"].map((status) => [
      status,
      items.filter((p) => p.status === status).length,
    ]),
  );
  return (
    <AdminShell title="Projects">
      <div className="admin-heading row-heading">
        <div>
          <h1>Projects Directory</h1>
          <p>
            Manage published portfolio case studies, drafts, ordering, and
            public visibility.
          </p>
        </div>
        <div className="heading-actions">
          <button className="btn btn-outline" onClick={exportCsv}>
            <Download size={17} /> Export CSV
          </button>
          <Link to="/admin/projects/new" className="btn btn-primary">
            <Plus size={17} /> New Project
          </Link>
        </div>
      </div>
      <div className="directory-metrics">
        {[
          ["Published Online", counts.published, CheckCircle2, "green"],
          ["Draft / In Review", counts.draft, Folder, "amber"],
          ["Archived", counts.archived, ArchiveIcon, "slate"],
          [
            "Featured",
            items.filter((p) => p.featured && p.status !== "archived").length,
            Star,
            "blue",
          ],
        ].map(([label, count, Icon, color]) => (
          <div className="directory-metric" key={label}>
            <span className={`metric-icon ${color}`}>
              <Icon size={23} />
            </span>
            <div>
              <strong>{count}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="error-box" role="alert">
          {error}
        </div>
      )}
      <div className="directory-toolbar">
        <div className="directory-filters">
          <div className="admin-tabs">
            {["all", "published", "draft", "archived"].map((status) => (
              <button
                key={status}
                className={filter === status ? "selected" : ""}
                onClick={() => setFilter(status)}
              >
                {status === "all"
                  ? "All"
                  : status[0].toUpperCase() + status.slice(1)}
                <small>
                  {status === "all" ? items.length : counts[status]}
                </small>
              </button>
            ))}
          </div>
          <div className="searchbox">
            <Search size={17} />
            <input
              aria-label="Search projects"
              placeholder="Search projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            aria-label="Filter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Disciplines</option>
            {[...new Set(items.map((p) => p.category))].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <select
            aria-label="Filter technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          >
            <option value="">All Technologies</option>
            {[...new Set(items.flatMap((p) => p.stack || []))]
              .sort()
              .map((value) => (
                <option key={value}>{value}</option>
              ))}
          </select>
        </div>
        {selected.length > 0 && (
          <div className="bulk-toolbar">
            <span>
              <b>{selected.length}</b> projects selected
            </span>
            <button className="link-button" onClick={() => setSelected([])}>
              Clear selection
            </button>
            <div>
              <select
                aria-label="Change selected status"
                value=""
                disabled={busy}
                onChange={(e) => bulk({ status: e.target.value })}
              >
                <option value="" disabled>
                  Change Status
                </option>
                <option value="published">Publish</option>
                <option value="draft">Draft</option>
                <option value="archived">Archive</option>
              </select>
              <button
                disabled={busy}
                className="btn btn-outline"
                onClick={() => bulk({ featured: true })}
              >
                <Star size={15} /> Set Featured
              </button>
              <button
                disabled={busy}
                className="btn btn-danger"
                onClick={() => {
                  if (
                    confirm(
                      `Permanently delete ${selected.length} selected projects?`,
                    )
                  )
                    mutate(() =>
                      Promise.all(
                        selected.map((id) =>
                          request(`/admin/projects/${id}`, {
                            method: "DELETE",
                          }),
                        ),
                      ),
                    );
                }}
              >
                <Trash2 size={15} /> Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="table-wrap directory-table">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  aria-label="Select this page"
                  checked={allChecked}
                  onChange={() =>
                    setSelected(
                      allChecked
                        ? selected.filter(
                            (id) => !visible.some((p) => p._id === id),
                          )
                        : [
                            ...new Set([
                              ...selected,
                              ...visible.map((p) => p._id),
                            ]),
                          ],
                    )
                  }
                />
              </th>
              <th>Project & Slug</th>
              <th>Discipline</th>
              <th>Tech Stack</th>
              <th>Featured</th>
              <th>Pos</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p._id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select ${p.title}`}
                    checked={selected.includes(p._id)}
                    onChange={() => toggle(p._id)}
                  />
                </td>
                <td>
                  <div className="project-table-title">
                    {p.image && (
                      <img
                        src={p.image}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />
                    )}
                    <div>
                      <Link to={`/admin/projects/${p._id}`}>{p.title}</Link>
                      <small>/projects/{p.slug}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="discipline-tag">{p.category}</span>
                </td>
                <td>
                  <div className="tags">
                    {p.stack?.map((name) => (
                      <span key={name}>{name}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <button
                    aria-label={`Toggle featured for ${p.title}`}
                    className={`star-btn ${p.featured ? "active" : ""}`}
                    disabled={busy}
                    onClick={() =>
                      mutate(() => update(p._id, { featured: !p.featured }))
                    }
                  >
                    <Star
                      size={20}
                      fill={p.featured ? "currentColor" : "none"}
                    />
                  </button>
                </td>
                <td>
                  <input
                    key={`${p._id}-${p.order}`}
                    aria-label={`Position for ${p.title}`}
                    className="order-input"
                    type="number"
                    defaultValue={p.order || 0}
                    onBlur={(e) => {
                      if (Number(e.target.value) !== p.order)
                        mutate(() =>
                          update(p._id, { order: Number(e.target.value) }),
                        );
                    }}
                  />
                </td>
                <td>
                  <span className={`status ${p.status}`}>● {p.status}</span>
                </td>
                <td className="table-actions">
                  <Link to={`/admin/projects/${p._id}`}>Edit</Link>
                  <button
                    aria-label={`Archive ${p.title}`}
                    disabled={busy}
                    onClick={() => {
                      if (confirm(`Archive ${p.title}?`))
                        mutate(() => update(p._id, { status: "archived" }));
                    }}
                  >
                    <ArchiveIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <div className="empty-state">No projects match these filters.</div>
        )}
        <div className="table-pagination">
          <span>
            Showing {rows.length ? (currentPage - 1) * perPage + 1 : 0}–
            {Math.min(currentPage * perPage, rows.length)} of {rows.length}{" "}
            projects
          </span>
          <label>
            Rows per page:{" "}
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              {[5, 10, 25].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </label>
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              ←
            </button>
            <span>
              {currentPage} / {pageCount}
            </span>
            <button
              disabled={currentPage === pageCount}
              onClick={() => setPage(currentPage + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
