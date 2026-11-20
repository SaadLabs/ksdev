import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { useSite } from "../hooks/useSite";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BriefDrawer } from "../components/BriefDrawer";

export function CaseStudy() {
  const { slug } = useParams(),
    { projects, settings } = useSite(),
    [photo, setPhoto] = useState(0);
  const p = projects.find((x) => x.slug === slug);
  if (!p)
    return (
      <>
        <Header settings={settings} />
        <main className="page-main">
          <div className="container empty-state">
            <h2>Project not found</h2>
            <Link className="btn btn-outline" to="/projects">
              Browse all work
            </Link>
          </div>
        </main>
        <Footer settings={settings} />
      </>
    );
  const gallery = p.gallery?.length ? p.gallery : [p.image];
  return (
    <>
      <Header settings={settings} />
      <main className="page-main case-page">
        <div className="container">
          <div className="crumb">
            <Link to="/">Studio</Link>
            <ChevronRight size={14} />
            <Link to="/projects">Projects</Link>
            <ChevronRight size={14} />
            {p.title}
          </div>
          <div className="case-heading">
            <span className="eyebrow">{p.category} · Case study</span>
            <h1>{p.title}</h1>
            <p>{p.description}</p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href={p.demoUrl || settings.fiverrUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live demo <ExternalLink size={16} />
              </a>
              {p.githubUrl && (
                <a
                  className="btn btn-outline"
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="case-gallery">
            <img src={gallery[photo]} alt={`${p.title} project preview`} />
            {gallery.length > 1 && (
              <div className="gallery-thumbs">
                {gallery.map((g, i) => (
                  <button
                    className={photo === i ? "selected" : ""}
                    onClick={() => setPhoto(i)}
                    key={g}
                  >
                    <img src={g} alt={`Preview ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="case-layout">
            <article className="case-copy">
              {[
                ["The challenge", p.challenge],
                ["The solution", p.solution],
                ["The outcome", p.results],
              ]
                .filter((x) => x[1])
                .map(([h, t]) => (
                  <section key={h}>
                    <h2>{h}</h2>
                    <p>{t}</p>
                  </section>
                ))}
            </article>
            <aside className="case-aside">
              <div className="aside-card">
                <span className="eyebrow">Technology</span>
                <div className="tags">
                  {p.stack?.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
              <div className="aside-card blue-tint">
                <span className="eyebrow">Have a similar challenge?</span>
                <p>Build your next system with the KSDev Studio team.</p>
                <button
                  className="btn btn-primary full"
                  onClick={() => window.dispatchEvent(new Event("open-brief"))}
                >
                  Start a project <ArrowRight size={15} />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
