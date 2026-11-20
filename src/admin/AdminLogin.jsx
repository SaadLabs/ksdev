import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { request } from "../lib/api";
import { Brand } from "../components/Brand";

export function AdminLogin() {
  const [form, setForm] = useState({
      email: "admin@ksdev.studio",
      password: "",
    }),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const x = await request("/auth/login", { method: "POST", body: form });
      localStorage.setItem("ksdev-token", x.token);
      nav("/admin");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="login-page">
      <div className="login-grid" />
      <div className="login-card">
        <Brand />
        <span className="eyebrow">Studio console</span>
        <h1>Sign in to your workspace.</h1>
        <p>Manage projects, services, and site content.</p>
        <form className="form-stack" onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          {error && <div className="error-box">{error}</div>}
          <button disabled={busy} className="btn btn-primary full">
            {busy ? "Signing in…" : "Sign in"} <ArrowRight size={16} />
          </button>
        </form>
        <Link to="/" className="back-link">
          ← Back to the public site
        </Link>
      </div>
    </main>
  );
}
