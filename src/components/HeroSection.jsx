// src/components/HeroSection.jsx
import React from "react";
import { ArrowDown } from "lucide-react";

/**
 * Professional, responsive HeroSection (named export)
 *
 * Usage:
 *   import { HeroSection } from "@/components/HeroSection";
 *   <HeroSection
 *     name="Kelvin Machaka"
 *     role="Full-stack Engineer"
 *     stacks={['React','TypeScript','Django','Node.js']}
 *     location="Harare, Zimbabwe"
 *     resumeUrl="/resume.pdf"
 *     avatarUrl="/projects/profile.png"   // default uses public/projects/profile.png
 *     compact={false}
 *   />
 */

export const HeroSection = ({
  name = "Kelvin Machaka",
  role = "Full-stack Engineer",
  stacks = ["React", "TypeScript", "Django", "Node.js"],
  location = "Harare, Zimbabwe",
  resumeUrl = "/resume.pdf",
  avatarUrl = "/projects/profile.png", // default image (public/projects/profile.png)
  compact = false,
}) => {
  const stacksLine = stacks.join(" • ");
  const initials = name
    .split(" ")
    .map((n) => n?.[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section
      id="hero"
      aria-label={`Intro — ${name}`}
      className={`relative ${compact ? "py-12" : "min-h-screen py-24"} flex items-center justify-center px-4 bg-background dark:bg-slate-900 transition-colors duration-200`}
    >
      {/* decorative background (kept minimal) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" />

      <div className="container max-w-6xl mx-auto text-left z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* LEFT: Copy (spans 2 cols on md+) */}
          <div className="md:col-span-2 order-2 md:order-1 text-center md:text-left">
            {/* meta row */}
            <div className="mb-3 text-sm text-muted-foreground">
              <span>{location}</span>
              <span className="mx-3 hidden sm:inline">•</span>
              <span className="hidden sm:inline">{stacksLine}</span>
            </div>

            {/* Headline */}
            <h1 className="font-extrabold tracking-tight text-foreground leading-tight">
              <span
                className="block"
                style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)" }}
              >
                I design and build
              </span>

              <span
                className="block mt-1 bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,var(--color-primary), rgba(139,92,246,0.9))",
                  fontSize: "clamp(1.35rem, 3.2vw, 2.1rem)",
                  fontWeight: 700,
                }}
              >
                dependable, high-performance web products.
              </span>
            </h1>

            {/* supporting paragraph */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
              I’m <strong>{name}</strong>, a <strong>{role}</strong>. I build accessible,
              maintainable frontends and robust backends (React, Node, Django) with strong emphasis
              on performance, developer experience and measurable outcomes.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="cosmic-button inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base"
                aria-label="View projects"
              >
                View Projects
              </a>

              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md text-sm sm:text-base border border-border/60 bg-transparent"
                aria-label="Download resume"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>

            <div className="mt-6 text-xs sm:text-sm text-muted-foreground">
              Open to full-time & freelance · Available immediately
            </div>
          </div>

          {/* RIGHT: avatar card */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-full max-w-xs md:max-w-md lg:max-w-lg rounded-2xl gradient-border p-5 bg-card card-hover shadow-lg">
              <div className="flex items-center gap-4">
                {/* Avatar image with fallback to initials */}
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${name} profile`}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-border/10"
                    loading="eager"
                    onError={(e) => {
                      // hide broken image if not found — show initials instead
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget?.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector(".hero-avatar-fallback");
                        if (fallback) fallback.style.display = "flex";
                      }
                    }}
                  />
                ) : null}

                {/* Fallback initials (hidden when image loads) */}
                <div
                  className="hero-avatar-fallback w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg"
                  style={{ display: avatarUrl ? "none" : "flex" }}
                  aria-hidden={!!avatarUrl}
                >
                  {initials}
                </div>

                <div>
                  <div className="font-semibold text-base md:text-lg text-foreground">{name}</div>
                  <div className="text-sm text-muted-foreground">{role}</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <strong className="text-foreground">Selected highlights</strong>
                <ul className="mt-3 grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <li className="rounded-md bg-background/50 px-3 py-2">10+ production apps</li>
                  <li className="rounded-md bg-background/50 px-3 py-2">Performance wins</li>
                  <li className="rounded-md bg-background/50 px-3 py-2">WCAG AA</li>
                  <li className="rounded-md bg-background/50 px-3 py-2">Mentored juniors</li>
                </ul>
              </div>

              <div className="mt-4 flex gap-4">
                <a href="#contact" className="text-sm text-primary underline">
                  Hire me
                </a>
                <a href="#projects" className="text-sm text-muted-foreground underline">
                  See work
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
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
