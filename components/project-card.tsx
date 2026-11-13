import Link from "next/link";
import type { Project } from "@/content/types";

const rampVars = ["--soil", "--dry", "--sprout", "--leaf", "--canopy"];

export function healthColor(health: number) {
  const i = Math.min(rampVars.length - 1, Math.max(0, Math.round(health * (rampVars.length - 1))));
  return `var(${rampVars[i]})`;
}

/** Each project's own patch of fields: tiles scatter around its reading, seeded by its slug. */
function mosaic(slug: string, health: number, cols: number, rows: number) {
  let s = [...slug].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const tiles: { color: string; span: number; opacity: number }[] = [];
  // Fill row by row so every row ends flush: a double-width tile only where two cells remain.
  for (let r = 0; r < rows; r++) {
    let left = cols;
    while (left > 0) {
      const span = left >= 2 && rnd() < 0.22 ? 2 : 1;
      tiles.push({ color: healthColor(health + (rnd() - 0.5) * 0.7), span, opacity: 0.55 + rnd() * 0.4 });
      left -= span;
    }
  }
  return tiles;
}

/** A project as a surveyed parcel: a colour swatch from the crop-health ramp, its reading, then the story. */
export function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  const code = `P-${String(index + 1).padStart(2, "0")}`;
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:border-accent/70"
    >
      <div className={`relative overflow-hidden bg-raise ${large ? "h-44 md:h-56" : "h-32"}`} aria-hidden="true">
        <div
          className={`grid h-full gap-[3px] p-[3px] transition-transform duration-700 group-hover:scale-[1.03] ${
            large ? "grid-cols-8 grid-rows-4" : "grid-cols-10 grid-rows-3"
          }`}
        >
          {mosaic(project.slug, project.health, large ? 8 : 10, large ? 4 : 3).map((t, i) => (
            <span
              key={i}
              className="rounded-[2px]"
              style={{ background: t.color, opacity: t.opacity, gridColumn: `span ${t.span}` }}
            />
          ))}
        </div>
        {/* Crop rows */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, var(--bg) 0 1px, transparent 1px 8px)" }}
        />
        {/* The pass sweeps across on hover. */}
        <span className="absolute inset-y-0 -left-2 w-0.5 bg-accent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100 motion-reduce:hidden" />
        <span className="absolute left-4 top-4 rounded bg-bg/90 px-2 py-1 font-mono text-[11px] text-muted">
          {code} · {project.health.toFixed(2)}
        </span>
        {project.ai && (
          <span className="absolute right-4 top-4 rounded bg-bg/90 px-2 py-1 font-mono text-[11px] text-accent">AI</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <p className="label">
          {project.domain} · {project.year}
        </p>
        <h3 className={`font-display font-semibold tracking-tight ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-muted">{project.tagline}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, large ? 6 : 4).map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
              {s}
            </li>
          ))}
        </ul>
        <span className="text-sm text-accent">
          Read the case study <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
