import { useEffect, useState } from "react";
import { AdminShell } from "./AdminLayout";
import { request } from "../lib/api";

export function AdminUsers() {
  const [items, setItems] = useState([]),
    [err, setErr] = useState("");
  const load = () =>
    request("/admin/users")
      .then(setItems)
      .catch((e) => setErr(e.message));
  useEffect(() => {
    load();
  }, []);
  return (
    <AdminShell title="Users & roles">
      <div className="admin-heading">
        <span className="eyebrow">ACCESS MANAGEMENT</span>
        <h1>Users & roles</h1>
        <p>
          Control who can access the studio console and what they can change.
        </p>
      </div>
      {err && <div className="error-box">{err}</div>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u._id}>
                <td>
                  <b>{u.name}</b>
                </td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={async (e) => {
                      await request(`/admin/users/${u._id}`, {
                        method: "PUT",
                        body: { role: e.target.value, active: u.active },
                      });
                      load();
                    }}
                  >
                    <option>admin</option>
                    <option>editor</option>
                  </select>
                </td>
                <td>
                  <button
                    className={`status ${u.active ? "published" : "archived"}`}
                    onClick={async () => {
                      await request(`/admin/users/${u._id}`, {
                        method: "PUT",
                        body: { role: u.role, active: !u.active },
                      });
                      load();
                    }}
                  >
                    {u.active ? "Active" : "Disabled"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
