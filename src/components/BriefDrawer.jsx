import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Download, X } from "lucide-react";
import { request } from "../lib/api";
import { defaults } from "../data/defaults";

const domains = [
  [
    "Web application",
    "Custom Full-Stack Web",
    "React, Node.js, APIs and databases",
  ],
  [
    "Cloud & DevOps",
    "Cloud Infrastructure & DevOps",
    "Delivery pipelines and production infrastructure",
  ],
  [
    "Mobile app",
    "Mobile App Development",
    "Cross-platform experiences and early access",
  ],
  [
    "Code audit",
    "Code Audit & Performance",
    "Security, database design and performance",
  ],
];
const initialForm = {
  name: "",
  email: "",
  projectName: "",
  service: "Web application",
  budget: "$1k–$3k",
  timeline: "Standard (3–4 weeks)",
  requirements: [],
  message: "",
};
export function BriefDrawer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [fiverrUrl, setFiverrUrl] = useState(defaults.fiverrUrl);
  const panel = useRef(null);
  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  useEffect(() => {
    const show = () => {
      setFeedback(null);
      setOpen(true);
    };
    window.addEventListener("open-brief", show);
    return () => window.removeEventListener("open-brief", show);
  }, []);
  useEffect(() => {
    if (!open) return;
    request("/site")
      .then((data) =>
        setFiverrUrl(data.settings.fiverrUrl || defaults.fiverrUrl),
      )
      .catch(() => {});
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("button")?.focus();
    const keyboard = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = [
        ...panel.current.querySelectorAll(
          "button:not(:disabled), a[href], input, textarea, select",
        ),
      ];
      const first = controls[0],
        last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", keyboard);
      previous?.focus();
    };
  }, [open]);
  function briefText() {
    return `# ${form.projectName || "Project brief"}\n\nContact: ${form.name} (${form.email})\nDomain: ${form.service}\nBudget: ${form.budget}\nDelivery: ${form.timeline}\nRequirements: ${form.requirements.join(", ") || "To be discussed"}\n\n## Project details\n${form.message}\n`;
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([briefText()], { type: "text/markdown" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-brief.md";
    link.click();
    URL.revokeObjectURL(url);
  }
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);
    try {
      await request("/contact", {
        method: "POST",
        body: { ...form, message: briefText() },
      });
      setFeedback({
        success: true,
        text: "Your architecture brief has been submitted to the studio.",
      });
      setForm(initialForm);
    } catch (error) {
      setFeedback({ success: false, text: error.message });
    } finally {
      setBusy(false);
    }
  }
  if (!open) return null;
  return (
    <div
      className="drawer-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <aside
        ref={panel}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scope-title"
      >
        <button
          className="icon-btn drawer-close"
          aria-label="Close brief"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>
        <span className="eyebrow">PROJECT INTAKE /// SCOPE BRIEF</span>
        <h2 id="scope-title">Scope your next system.</h2>
        <div className="scope-fiverr">
          <div>
            <h3>Prefer direct contracting?</h3>
            <p>
              Message the studio on Fiverr to discuss your requirements and
              delivery milestones.
            </p>
          </div>
          <a
            className="btn btn-dark"
            href={fiverrUrl}
            target="_blank"
            rel="noreferrer"
          >
            Chat on Fiverr <ArrowUpRight size={16} />
          </a>
        </div>
        <form className="form-stack" onSubmit={submit}>
          <h3 className="scope-section-title">1. Architecture Domain</h3>
          <div className="scope-domains">
            {domains.map(([value, title, description]) => (
              <button
                type="button"
                key={value}
                aria-pressed={form.service === value}
                className={`scope-choice ${form.service === value ? "selected" : ""}`}
                onClick={() => set("service", value)}
              >
                {title}
                <small>{description}</small>
              </button>
            ))}
          </div>
          <div className="scope-grid">
            <label>
              Your name
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label>
              Technical point of contact
              <input
                required
                type="email"
                placeholder="engineering@company.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </label>
          </div>
          <label>
            System / Project name
            <input
              value={form.projectName}
              onChange={(e) => set("projectName", e.target.value)}
              placeholder="e.g. Customer Operations Platform"
            />
          </label>
          <h3 className="scope-section-title">
            2. Budget Band & Engagement Model
          </h3>
          <div className="scope-domains">
            {["Under $1k", "$1k–$3k", "$3k–$10k", "$10k+"].map((value) => (
              <button
                key={value}
                type="button"
                className={`scope-choice ${form.budget === value ? "selected" : ""}`}
                onClick={() => set("budget", value)}
              >
                {value}
              </button>
            ))}
          </div>
          <h3 className="scope-section-title">3. Target Delivery Milestone</h3>
          <select
            value={form.timeline}
            onChange={(e) => set("timeline", e.target.value)}
          >
            {[
              "Rush (under 2 weeks)",
              "Standard (3–4 weeks)",
              "Flexible delivery",
            ].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <h3 className="scope-section-title">
            4. Primary Architecture Requirements
          </h3>
          <div className="check-grid">
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Docker",
              "Cloud deployment",
              "Authentication",
            ].map((name) => (
              <label key={name} className="check-option">
                <input
                  type="checkbox"
                  checked={form.requirements.includes(name)}
                  onChange={(e) =>
                    set(
                      "requirements",
                      e.target.checked
                        ? [...form.requirements, name]
                        : form.requirements.filter((value) => value !== name),
                    )
                  }
                />
                {name}
              </label>
            ))}
          </div>
          <label>
            Project details
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Describe the goals, workflows, and constraints."
            />
          </label>
          {feedback && (
            <div
              role="status"
              className={feedback.success ? "notice" : "error-box"}
            >
              {feedback.text}
            </div>
          )}
          <div className="scope-actions">
            <button disabled={busy} className="btn btn-primary">
              {busy ? "Submitting…" : "Submit Architecture Brief"}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={download}
            >
              <Download size={16} /> Export Markdown
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
