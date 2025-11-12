import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Code, Database, Wrench } from "lucide-react";

/**
 * SkillsSection — shows MERN + Django + tooling skills with categories
 * - accessible: progress bars include aria attributes
 * - responsive: 1 / 2 / 3 column grid
 */
const SKILLS = [
  // Frontend
  { name: "HTML/CSS", level: 96, category: "frontend", desc: "Semantic, responsive CSS, modern layouts" },
  { name: "JavaScript (ES6+)", level: 93, category: "frontend", desc: "Modern patterns, async, DOM" },
  { name: "React", level: 92, category: "frontend", desc: "Hooks, context, perf, testing" },
  { name: "Next.js", level: 82, category: "frontend", desc: "SSR / SSG, routing, image optimization" },
  { name: "TypeScript", level: 86, category: "frontend", desc: "Types-first frontends and safer refactors" },
  { name: "Tailwind CSS", level: 90, category: "frontend", desc: "Utility-first, rapid UI creation" },

  // Backend
  { name: "Node.js", level: 85, category: "backend", desc: "Event-driven servers and tooling" },
  { name: "Express", level: 80, category: "backend", desc: "REST APIs, middleware patterns" },
  { name: "MongoDB", level: 80, category: "backend", desc: "Schema design, Mongoose, replica sets" },
  { name: "Mongoose", level: 78, category: "backend", desc: "ODM patterns and validation" },
  { name: "PostgreSQL", level: 72, category: "backend", desc: "Relational modeling, indexes, queries" },
  { name: "Django", level: 82, category: "backend", desc: "DRF, ORM, admin, rapid APIs" },
  { name: "GraphQL", level: 68, category: "backend", desc: "Apollo / schema design" },

  // Tools / infra / design
  { name: "Docker", level: 78, category: "tools", desc: "Containerizing apps and CI builds" },
  { name: "Git / GitHub", level: 94, category: "tools", desc: "Branching, PRs, code reviews" },
  { name: "CI/CD (GitHub Actions)", level: 75, category: "tools", desc: "Automated builds & deployments" },
  { name: "AWS / GCP (basics)", level: 70, category: "tools", desc: "Cloud deployments and storage" },
  { name: "VS Code", level: 96, category: "tools", desc: "Daily driver, extensions & debugging" },
  { name: "Figma", level: 85, category: "tools", desc: "Design handoff, prototypes, components" },
];

const CATEGORIES = ["all", "frontend", "backend", "tools"];

/* small helper to render an icon or small mark for a skill */
function SkillBadge({ name }) {
  const k = name.toLowerCase();
  if (k.includes("react")) {
    return <Code className="w-4 h-4 text-primary" aria-hidden />;
  }
  if (k.includes("node")) {
    return <Wrench className="w-4 h-4 text-primary" aria-hidden />;
  }
  if (k.includes("mongo") || k.includes("postgre") || k.includes("django")) {
    return <Database className="w-4 h-4 text-primary" aria-hidden />;
  }
  if (k.includes("figma")) {
    // inline tiny Figma-ish mark (keeps you from needing an external asset)
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="3" width="6" height="6" rx="3" fill="currentColor" style={{ opacity: 0.95 }} />
        <rect x="11" y="3" width="6" height="6" rx="3" fill="currentColor" style={{ opacity: 0.75 }} />
        <rect x="17" y="3" width="4" height="4" rx="2" fill="currentColor" style={{ opacity: 0.55 }} />
      </svg>
    );
  }
  return <span className="inline-block w-3 h-3 rounded-full bg-primary/80" aria-hidden />;
}

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = SKILLS.filter((s) => activeCategory === "all" || s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <p className="text-center max-w-2xl mx-auto text-muted-foreground mb-8">
          Core skills I use day-to-day — focused on MERN stack, Django for Python backends, and product design using Figma.
        </p>

        {/* category chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-foreground/90 hover:bg-primary/10"
              )}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill) => (
            <article
              key={skill.name}
              className="bg-card p-5 rounded-lg shadow-xs card-hover"
              aria-labelledby={`skill-${skill.name.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <header className="flex items-center justify-between mb-3 gap-4">
                <div className="flex items-center gap-3">
                  <SkillBadge name={skill.name} />
                  <h3
                    id={`skill-${skill.name.replace(/\s+/g, "-").toLowerCase()}`}
                    className="font-semibold text-sm text-foreground"
                  >
                    {skill.name}
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground tabular-nums">{skill.level}%</div>
              </header>

              <div
                className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skill.level}
                aria-label={`${skill.name} proficiency ${skill.level} percent`}
              >
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-800 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {skill.desc && (
                <p className="mt-3 text-xs text-muted-foreground leading-snug">{skill.desc}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
