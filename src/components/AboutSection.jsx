import React from "react";
import { Briefcase, ArrowDown } from "lucide-react";

/**
 * Full, professional AboutSection component (named export)
 * - Shows MERN stack logos + Django + Figma prominently
 * - Left column: summary, metrics, CTAs, tech badges (balanced)
 * - Right card: engineering highlights sized for large screens (no zig-zag)
 *
 * Drop into src/components/AboutSection.jsx (overwrite).
 * Import:  import { AboutSection } from "@/components/AboutSection";
 */
export const AboutSection = ({
  name = "Kelvin Machaka",
  role = "Full-stack Engineer",
  experienceYears = 2,
  location = "Harare, Zimbabwe",
  // Default stack emphasises MERN + Django + Figma (you can override)
  stacks = ["MongoDB", "Express", "React", "Node.js", "Django", "Figma", "TypeScript"],
  resumeUrl = "/resume.pdf",
}) => {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Full-stack engineer — MERN & Django experience, plus product design (Figma). I build robust,
            maintainable systems from UI to infra.
          </p>
        </div>

        {/* Grid: copy (2 cols) | card (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* LEFT: Main copy, metrics, CTAs, tech badges */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold">{name}</h3>
              <div className="mt-2 text-sm text-muted-foreground">
                <strong className="text-foreground">{role}</strong> • {location} • {experienceYears}+ years
              </div>
            </div>

            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              I design and deliver end-to-end products: performant frontends (React), scalable backends (Node / Django),
              and production-ready infrastructure. I collaborate with product and design (Figma) to ship measurable outcomes.
            </p>

            {/* Key highlights / metrics */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard value="10+" label="Apps shipped" />
              <StatCard value="0.9s" label="avg LCP" sub="(client builds)" />
              <StatCard value="WCAG AA" label="Accessibility" />
              <StatCard value="Mentor" label="Juniors mentored" />
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#projects"
                className="cosmic-button inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base"
                aria-label="View projects"
              >
                <Briefcase className="w-4 h-4" />
                View Projects
              </a>

              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md text-sm sm:text-base border border-border/60"
                aria-label="Download resume"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>

            {/* Tech badges (professional logos / badges) */}
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Core tools & technologies</h4>

              <div className="flex flex-wrap gap-3">
                {stacks.map((s) => (
                  <div
                    key={s}
                    className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-2 bg-card border border-border/50 text-muted-foreground"
                    aria-label={s}
                    title={s}
                  >
                    <LogoBadge name={s} />
                    <span className="text-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Card - balanced size on large screens */}
          <aside className="order-1 lg:order-2">
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-2xl gradient-border p-5 bg-card card-hover shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                  {initials(name)}
                </div>
                <div>
                  <div className="font-semibold text-base text-foreground">{name}</div>
                  <div className="text-sm text-muted-foreground">{role}</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <strong className="text-foreground">What I do</strong>
                <ul className="mt-3 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-background/50">
                      <IconSmall name="frontend" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Frontend</div>
                      <div className="text-xs text-muted-foreground">React, performance, accessibility</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-background/50">
                      <IconSmall name="backend" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Backend & APIs</div>
                      <div className="text-xs text-muted-foreground">Node (Express), Django, GraphQL/REST</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-background/50">
                      <IconSmall name="infra" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Infra & Data</div>
                      <div className="text-xs text-muted-foreground">MongoDB, Postgres, Docker, CI/CD</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-5 flex gap-3">
                <a href="#contact" className="inline-block w-full text-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium">
                  Let’s talk
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* small scroll hint (non-distracting) */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col items-center text-muted-foreground motion-safe:animate-bounce">
            <span className="text-xs mb-2">Scroll</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- small presentational helpers --- */

function StatCard({ value, label, sub }) {
  return (
    <div className="rounded-lg gradient-border p-3 text-center bg-card">
      <div className="text-lg font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {sub ? <div className="text-2xs text-muted-foreground mt-1">{sub}</div> : null}
    </div>
  );
}

function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** LogoBadge: returns small SVG or styled initial for each tool.
 *  Keeps visuals consistent even if you don't have external logo files.
 */
function LogoBadge({ name }) {
  const key = (name || "").toLowerCase();
  // simple colored circular badges with small SVGs or initials
  switch (key) {
    case "react":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="12" rx="5.5" ry="9.5" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="5.5" ry="9.5" transform="rotate(-30 12 12)" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          </g>
        </svg>
      );
    case "node.js":
    case "node":
      return (
        <div className="w-4 h-4 rounded-sm flex items-center justify-center text-xs font-semibold" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2l8 4v12l-8 4-8-4V6l8-4z" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      );
    case "mongodb":
    case "mongo":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2s-2 3-2.5 5.5S11 12 11 12s1.5-2 3-3.5S12 2 12 2z" fill="currentColor" />
        </svg>
      );
    case "express":
      return (
        <div className="text-[10px] font-semibold" aria-hidden>
          ex
        </div>
      );
    case "django":
      return (
        <div className="text-[10px] font-semibold" aria-hidden>
          Dj
        </div>
      );
    case "figma":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="6" height="6" rx="3" fill="currentColor" />
          <rect x="10" y="3" width="6" height="6" rx="3" fill="currentColor" opacity="0.85" />
          <rect x="17" y="3" width="4" height="4" rx="2" fill="currentColor" opacity="0.7" />
        </svg>
      );
    case "typescript":
    case "ts":
      return (
        <div className="text-xs font-semibold" aria-hidden>
          TS
        </div>
      );
    default:
      // default small colored dot
      return <span className="w-2 h-2 rounded-full bg-primary inline-block" aria-hidden />;
  }
}

/* IconSmall: tiny inline icons for right-card bullet list */
function IconSmall({ name }) {
  switch ((name || "").toLowerCase()) {
    case "frontend":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "backend":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
  }
}
