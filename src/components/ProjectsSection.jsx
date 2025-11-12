// src/components/ProjectsSection.jsx
import React, { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProjectsSection — displays 3 selected repos from https://github.com/tadikev
 *
 * Props:
 *  - githubUsername (string) : used for "Check my GitHub" CTA (default "tadikev")
 *
 * Notes:
 *  - Replace image paths (image) with real screenshots in /public/projects/
 *  - If you have live demo URLs, replace demoUrl: "#" with the real link
 */

const projects = [
  {
    id: "ecommerce-mern-2",
    title: "E-Commerce (MERN)",
    description:
      "Full-stack e-commerce demo built with the MERN stack: product catalog, cart, auth and checkout flows — useful to demonstrate real-world full-stack skills.",
    image: "/projects/e-commerce-mern-stack-2.png", // add real screenshot in /public/projects/
    tags: ["MERN", "React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#", // replace with live demo if available
    githubUrl: "https://github.com/tadikev/e-commerce-mern-stack-2",
  },
  {
    id: "ecommerce-js",
    title: "Ecommerce (JS)",
    description:
      "A focused e-commerce frontend & lightweight backend demo showcasing product pages, cart UX, and payment integration.",
    image: "/projects/ecommerce.png",
    tags: ["JavaScript", "Node", "Express", "Payments"],
    demoUrl: "#",
    githubUrl: "https://github.com/tadikev/Ecommerce",
  },
  {
    id: "talent-verify",
    title: "talent-verify",
    description:
      "An online talent verification service — demonstrates backend work, data modelling, and integration logic (useful for SaaS/marketplace roles).",
    image: "/projects/talent-verify.png",
    tags: ["Python", "Django/Flask?", "APIs"],
    demoUrl: "#",
    githubUrl: "https://github.com/tadikev/talent-verify",
  },
];

export const ProjectsSection = ({ githubUsername = "tadikev" }) => {
  const [query, setQuery] = useState("");

  // derive tags for quick filter chips (optional)
  const tags = useMemo(() => {
    const setTags = new Set();
    projects.forEach((p) => p.tags.forEach((t) => setTags.add(t)));
    return ["All", ...Array.from(setTags)];
  }, []);

  const filtered = projects.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q)
    );
  });

  const githubProfileUrl = `https://github.com/${encodeURIComponent(githubUsername)}`;

  return (
    <section id="projects" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            Selected projects from my GitHub showcasing full-stack (MERN & Django) work, production patterns, and integrations.
          </p>
        </header>

        {/* search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-sm bg-card text-foreground/90 border border-border/40"
                aria-hidden
              >
                {t}
              </span>
            ))}
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="proj-search" className="sr-only">
              Search projects
            </label>
            <input
              id="proj-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, tag or tech..."
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary"
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow transition-transform hover:-translate-y-1"
              aria-labelledby={`proj-${project.id}`}
            >
              <div className="h-44 bg-gray-50 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-3" aria-hidden>
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.id}-${tag}`}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 id={`proj-${project.id}`} className="text-lg font-semibold mb-1">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.demoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/40 text-foreground/90 hover:text-primary transition"
                      aria-label={`Open demo for ${project.title}`}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/40 text-foreground/90 hover:text-primary transition"
                      aria-label={`Open GitHub repo for ${project.title}`}
                    >
                      <Github size={16} />
                      <span className="text-sm">Repo</span>
                    </a>
                  </div>

                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground"
                    aria-label={`Hire me for a project like ${project.title}`}
                  >
                    Hire me <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button inline-flex items-center gap-2 px-5 py-3"
            target="_blank"
            rel="noopener noreferrer"
            href={githubProfileUrl}
            aria-label={`Open ${githubUsername}'s GitHub profile`}
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
