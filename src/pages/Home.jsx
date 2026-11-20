import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  Layers,
  ShieldCheck,
  Star,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../hooks/useSite";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { ProjectCard } from "../components/ProjectCard";
import { Pricing } from "../components/Pricing";
import { BriefDrawer } from "../components/BriefDrawer";

export const pillars = [
  {
    icon: Layers,
    title: "Direct senior architecture",
    text: "High-velocity systems engineering with thoughtful domain models, durable data structures, and interfaces made for real-world use.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    icon: ShieldCheck,
    title: "Zero Bloat, Production Infrastructure",
    text: "Secure foundations, clean code, and reliable deployments are built into every engagement from the first commit.",
    tags: ["TypeScript", "Docker", "CI/CD"],
  },
  {
    icon: Cloud,
    title: "Turnkey Contract Delivery",
    text: "Cloud infrastructure and delivery pipelines designed to grow with your product, without unnecessary complexity.",
    tags: ["AWS", "Terraform", "Redis"],
  },
];

export function Home() {
  const { settings, projects, services, technologies } = useSite();
  const [category, setCategory] = useState("All Projects");
  const featured = projects.filter((project) => project.featured);
  const categories = [
    "All Projects",
    ...new Set(featured.map((project) => project.category)),
  ];
  const visibleProjects = featured.filter(
    (project) => category === "All Projects" || project.category === category,
  );
  return (
    <>
      <Header settings={settings} />
      <main>
        <section className="hero">
          <div className="hero-grid" />
          <div className="container hero-inner">
            <div className="eyebrow-pill">
              <i />
              FULL-STACK WEB · CLOUD & DEVOPS · MOBILE SYSTEMS
            </div>
            <h1>{settings.heroTitle}</h1>
            <p>{settings.heroCopy}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#pricing">
                Compare Fiverr packages <ArrowDown size={16} />
              </a>
              <a className="btn btn-outline" href="#projects">
                Explore featured work <ArrowRight size={16} />
              </a>
            </div>
            <div className="trust-row">
              <div>
                <ShieldCheck />
                <span>On-time delivery, built into every plan</span>
              </div>
              <div>
                <Terminal />
                <span>Senior-level system architecture</span>
              </div>
              <div>
                <Cloud />
                <span>Cloud infrastructure when you need it</span>
              </div>
              <div>
                <Star />
                <span>Quality code, clear communication</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section subtle" id="studio">
          <div className="container">
            <SectionTitle
              eyebrow="Studio architecture"
              title="Engineered for Scale, Resilience, and Zero Tech Debt"
              copy="We work as a focused engineering studio: senior-level thinking, direct communication, and production-ready software without unnecessary layers."
            />
            <div className="pillar-grid">
              {pillars.map(({ icon: Icon, ...p }) => (
                <article className="pillar" key={p.title}>
                  <div className="pillar-icon">
                    <Icon />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="tags">
                    {p.tags.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            {settings.showTech !== false && (
              <div className="engineering-strip" id="stack">
                <span className="eyebrow">Core expertise stack</span>
                <div className="tags">
                  {technologies.map((technology) => (
                    <span key={technology._id}>{technology.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        {settings.showProjects !== false && (
          <section className="section" id="projects">
            <div className="container">
              <div className="section-head">
                <SectionTitle
                  eyebrow="Selected engineering work"
                  title="Featured Case Studies & Systems"
                  copy="Real systems, documented architecture, and production-focused engineering."
                />
                <Link className="text-link" to="/projects">
                  View Full Archive ({projects.length}) <ArrowRight size={16} />
                </Link>
              </div>
              <div className="filter-pills">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? "active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="project-grid">
                {visibleProjects.map((p) => (
                  <ProjectCard key={p._id || p.slug} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
        {settings.showPricing !== false && (
          <Pricing services={services} settings={settings} />
        )}
        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <span className="eyebrow">Have an ambitious architecture?</span>
              <h2>Let’s Build Your Next High-Performance System.</h2>
              <p>
                Bring us a rough idea, a hard problem, or a system ready to
                scale.
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => window.dispatchEvent(new Event("open-brief"))}
            >
              Open Custom Scope Brief <ArrowRight size={16} />
            </button>
            <a
              className="btn btn-dark"
              href={settings.fiverrUrl}
              target="_blank"
              rel="noreferrer"
            >
              Message Directly on Fiverr <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
