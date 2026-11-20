import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-browser-bar">
        <span className="browser-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span>{project.slug}.ksdev.studio</span>
        <span className="build-badge">
          <CheckCircle2 size={12} /> KSDev build
        </span>
      </div>
      <Link to={`/projects/${project.slug}`} className="project-image">
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} application preview`}
            loading="lazy"
          />
        )}
      </Link>
      <div className="project-body">
        <div className="project-title-row">
          <h3>
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          <span className="eyebrow">{project.category}</span>
        </div>
        <p>{project.description}</p>
        <div className="tags">
          {(project.stack || []).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <div className="card-foot">
          <Link to={`/projects/${project.slug}`}>
            Read Case Study <ArrowRight size={14} />
          </Link>
          {project.demoUrl && (
            <a
              className="demo-link"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
