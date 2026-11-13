import type { Metadata } from "next";
import { featured } from "@/content/projects";
import { education, experience, site, stack } from "@/content/site";

export const metadata: Metadata = {
  title: "CV",
  description: "CV of Kelvin Machaka, AI engineer in Harare, Zimbabwe.",
  alternates: { canonical: "/cv" },
};

/**
 * One-page CV. On screen it sits on the site's theme; printed (and as public/cv.pdf, made from this
 * page by scripts/cv-pdf.mjs) it is black on white A4.
 */
export default function CvPage() {
  return (
    <div className="gutter py-10 md:py-16 print:p-0">
      <div className="no-print mx-auto mb-6 flex max-w-[860px] flex-wrap items-center justify-between gap-3">
        <p className="label">Curriculum vitae</p>
        <a href={site.cv} download className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg">
          Download PDF
        </a>
      </div>

      <article className="cv mx-auto max-w-[860px] rounded-xl border border-line bg-surface p-8 md:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight">{site.name}</h1>
            <p className="mt-1 text-lg text-accent">{site.role}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Builds production AI, full-stack and geospatial systems: computer vision, predictive models, satellite data
              and the products around them.
            </p>
          </div>
          <ul className="space-y-1 text-right text-sm">
            <li>{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <a href={site.github}>github.com/TadiKev</a>
            </li>
            <li>
              <a href={site.linkedin}>linkedin.com/in/kelvin-machaka</a>
            </li>
            <li>
              <a href={site.url}>{site.displayUrl}</a>
            </li>
          </ul>
        </header>

        <section className="mt-7">
          <h2 className="label">Experience</h2>
          {experience.map((e) => (
            <div key={e.org} className="mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg font-semibold">
                  {e.role} · {e.org}
                </p>
                <p className="font-mono text-xs text-muted">{e.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{e.summary}</p>
              <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-7">
          <h2 className="label">Selected projects</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-3 text-sm md:grid-cols-2 print:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug} className="break-inside-avoid">
                <p className="font-semibold">{p.title}</p>
                <p className="leading-relaxed text-muted">{p.tagline}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted">{p.stack.slice(0, 5).join(" · ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-7 grid gap-8 md:grid-cols-[1.4fr_1fr] print:grid-cols-[1.4fr_1fr]">
          <section>
            <h2 className="label">Skills</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {stack.map((g) => (
                <div key={g.group} className="grid grid-cols-[92px_1fr] gap-2">
                  <dt className="font-semibold">{g.group}</dt>
                  <dd className="text-muted">{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2 className="label">Education</h2>
            {education.map((e) => (
              <p key={e.degree} className="mt-3 text-sm">
                <span className="font-semibold">{e.degree}</span>
                {e.school && <span className="block text-muted">{e.school}</span>}
                {e.period && <span className="block text-muted">{e.period}</span>}
              </p>
            ))}
            <h2 className="label mt-6">Availability</h2>
            <p className="mt-3 text-sm">{site.availability}.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
