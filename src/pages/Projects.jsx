import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useSite } from "../hooks/useSite";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { ProjectCard } from "../components/ProjectCard";

export function Archive() {
  const { projects, settings } = useSite();
  const [q, setQ] = useState(""),
    [filter, setFilter] = useState("All");
  const categories = [
    "All",
    ...new Set(projects.flatMap((p) => [p.category, ...(p.stack || [])])),
  ];
  const shown = projects.filter(
    (p) =>
      (filter === "All" ||
        p.category === filter ||
        (p.stack || []).includes(filter)) &&
      `${p.title} ${p.description} ${(p.stack || []).join(" ")}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <>
      <Header settings={settings} />
      <main className="page-main">
        <div className="container">
          <div className="crumb">
            <Link to="/">Studio</Link>
            <ChevronRight size={14} />
            Projects
          </div>
          <SectionTitle
            eyebrow="Portfolio archive"
            title="Proof in the product."
            copy="Explore selected systems built by KSDev Studio. Search projects or filter by category and technology."
          />
          <div className="archive-controls">
            <div className="searchbox">
              <Search size={17} />
              <input
                placeholder="Search projects or technologies"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="filter-pills">
              {categories.map((c) => (
                <button
                  key={c}
                  className={filter === c ? "active" : ""}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid archive-grid">
            {shown.map((p) => (
              <ProjectCard key={p._id || p.slug} project={p} />
            ))}
          </div>
          {!shown.length && (
            <div className="empty-state">
              <Search />
              <h3>No matching projects</h3>
              <p>Try a different term or category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
