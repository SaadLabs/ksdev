import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cloud,
} from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function Pricing({ services, settings }) {
  const [active, setActive] = useState("web");
  const visibleServices = services.filter(
    (service) => service.status !== "hidden",
  );
  const selected =
    visibleServices.find((s) => s.key === active) || visibleServices[0];
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionTitle
          eyebrow="Transparent contract tiers"
          title="Fiverr Packages & Guaranteed Deliveries"
          copy="Select a production-ready package or request custom enterprise scope with milestone-backed delivery."
        />
        <div className="service-tabs">
          {visibleServices.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={active === s.key ? "selected" : ""}
              disabled={s.status === "hidden"}
            >
              {s.title}
              {s.status === "coming_soon" && <small>Coming soon</small>}
            </button>
          ))}
        </div>
        {selected?.tiers?.length ? (
          <div className="pricing-grid">
            {selected.tiers.map((tier, i) => (
              <div
                className={`price-card ${i === 2 ? "featured" : ""}`}
                key={tier.name}
              >
                {i === 2 && (
                  <div className="popular">Most popular · cloud ready</div>
                )}
                <span className="eyebrow">{tier.name} tier</span>
                <h3>{tier.subtitle}</h3>
                <div className="price">
                  ${tier.price}
                  <span> / fixed gig</span>
                </div>
                <div className="delivery">
                  ◷ {tier.delivery} delivery · {tier.revisions}
                </div>
                {tier.includesDevops && (
                  <div className="cloud-included">
                    <Cloud size={16} /> Includes cloud & DevOps setup
                  </div>
                )}
                <ul>
                  {tier.features.map((x) => (
                    <li key={x}>
                      <CheckCircle2 size={17} />
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn ${i === 2 ? "btn-emerald" : "btn-dark"} full`}
                  href={tier.fiverrUrl || settings.fiverrUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Continue to Fiverr <ArrowUpRight size={16} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="coming-box">
            <span>Early access</span>
            <h3>Mobile systems are on the way.</h3>
            <p>Tell us about your app and we’ll scope it with you.</p>
            <button
              className="btn btn-primary"
              onClick={() => window.dispatchEvent(new Event("open-brief"))}
            >
              Request a custom quote <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
