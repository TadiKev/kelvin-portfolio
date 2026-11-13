import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { education, experience, site, stack } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "How Kelvin Machaka works: AI engineer in Harare building production AI, full-stack and geospatial products.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "2026", text: `${experience[0].role} at ${experience[0].org}: satellite crop monitoring, insurer risk monitoring, field boundary and crop detection.` },
  { year: "2026", text: "Built the dispatch orchestrator, FuelGuard, guard scheduling, hospital relief and tobacco leaf diagnosis systems." },
  { year: "2025", text: "Moved into machine learning with cattle disease diagnosis, alongside business systems for bars, utilities, pensions and online stores." },
  { year: "2024", text: "First full-stack applications with React, Node.js and MongoDB." },
];

const principles = [
  {
    title: "Start with the person doing the job",
    body: "A dispatcher, a pump attendant, a farmer with a phone. The software is right when their day gets easier, not when the demo looks good.",
  },
  {
    title: "Models are advice, not dependencies",
    body: "Every model I ship has a fallback. If the prediction service is slow or wrong, the product keeps working and the failure is visible.",
  },
  {
    title: "Built for weak networks",
    body: "Offline queues, small payloads and honest loading states, because many of my users are in the field, not on office Wi-Fi.",
  },
  {
    title: "AI-assisted, human-owned",
    body: "I use AI coding tools every day to move fast, and I own the architecture, the review and the testing of everything that ships.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="gutter field-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-24">
          <div>
            <p className="label">About</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              I build software that holds up in the real world.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
              I&apos;m Kelvin Machaka, an AI engineer in {site.location}. I studied Informatics and Analytics, and I build
              production systems end to end: the data model, the API, the machine learning, the interface and the
              deployment.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[300px]">
            <div className="overflow-hidden rounded-xl border border-line">
              <Image src={site.photo} alt="Kelvin Machaka" width={960} height={1200} sizes="300px" className="h-auto w-full" priority />
            </div>
          </figure>
        </div>
      </section>

      <section className="gutter">
        <div className="mx-auto max-w-6xl py-20">
          <p className="label">How I work</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.06}>
                <div className="h-full rounded-xl border border-line bg-surface p-7">
                  <h2 className="font-display text-xl font-semibold">{p.title}</h2>
                  <p className="mt-2.5 leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="gutter border-y border-line bg-surface/60">
        <div className="mx-auto grid max-w-6xl gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="label">Timeline</p>
            <ol className="mt-6 space-y-6 border-l border-line pl-6">
              {timeline.map((t) => (
                <li key={t.text} className="relative">
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                  <p className="font-mono text-xs text-accent">{t.year}</p>
                  <p className="mt-1 leading-relaxed">{t.text}</p>
                </li>
              ))}
            </ol>
            <p className="label mt-12">Education</p>
            {education.map((e) => (
              <p key={e.degree} className="mt-3">
                {e.degree}
                {e.school && <span className="text-muted"> · {e.school}</span>}
                {e.period && <span className="text-muted"> · {e.period}</span>}
              </p>
            ))}
          </div>
          <div>
            <p className="label">Tools I use</p>
            <dl className="mt-6 space-y-6">
              {stack.map((g) => (
                <div key={g.group}>
                  <dt className="font-display font-semibold">{g.group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="gutter">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 py-16">
          <p className="font-display text-2xl md:text-3xl">Have a project in mind?</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#contact" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg">
              Get in touch
            </Link>
            <Link href="/cv" className="rounded-full border border-line px-5 py-3 text-sm">
              Read my CV
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
