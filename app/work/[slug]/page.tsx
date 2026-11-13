import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { healthColor } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — Kelvin Machaka`, description: project.tagline, url: `${site.url}/work/${project.slug}` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="gutter field-grid border-b border-line">
        <div className="mx-auto max-w-6xl py-16 md:py-24">
          <Link href="/#work" className="label hover:text-text">
            ← All work
          </Link>
          <p className="label mt-10">
            {project.domain} · {project.year}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{project.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg">
                Open the live app
              </a>
            )}
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-3 text-sm hover:border-accent">
                View the code on GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="gutter">
        <div className="mx-auto grid max-w-6xl gap-12 py-16 md:grid-cols-[1fr_280px] md:py-20">
          <div className="min-w-0 space-y-14">
            {project.image && (
              <Reveal>
                <figure className="overflow-hidden rounded-xl border border-line">
                  <Image src={project.image.src} alt={project.image.alt} width={1600} height={1000} className="h-auto w-full" sizes="(min-width: 768px) 720px, 100vw" />
                </figure>
              </Reveal>
            )}
            <Reveal>
              <section>
                <h2 className="label">The problem</h2>
                <p className="mt-4 max-w-[65ch] text-lg leading-relaxed">{project.problem}</p>
              </section>
            </Reveal>
            <Reveal>
              <section>
                <h2 className="label">What I built</h2>
                <ul className="mt-5 space-y-4">
                  {project.built.map((b) => (
                    <li key={b} className="flex max-w-[65ch] gap-4 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: healthColor(project.health) }} aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            {project.ai && (
              <Reveal>
                <section className="rounded-xl border border-accent/40 bg-accent-soft/40 p-6">
                  <h2 className="label text-accent">The AI part</h2>
                  <p className="mt-3 max-w-[65ch] leading-relaxed">{project.ai}</p>
                </section>
              </Reveal>
            )}
            {project.decisions && project.decisions.length > 0 && (
              <Reveal>
                <section>
                  <h2 className="label">Decisions worth noting</h2>
                  <ul className="mt-5 space-y-4">
                    {project.decisions.map((d) => (
                      <li key={d} className="max-w-[65ch] border-l-2 border-line pl-4 leading-relaxed text-muted">
                        {d}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}
          </div>

          <aside className="space-y-8 md:sticky md:top-24 md:self-start">
            <div>
              <h2 className="label">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="font-display text-lg">Need something like this?</p>
              <p className="mt-1.5 text-sm text-muted">Tell me what you are building. I reply within one working day.</p>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg">
                Message me on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>

      <div className="gutter border-t border-line">
        <Link href={`/work/${next.slug}`} className="group mx-auto flex max-w-6xl items-center justify-between py-12">
          <span>
            <span className="label">Next project</span>
            <span className="mt-2 block font-display text-2xl md:text-3xl">{next.title}</span>
          </span>
          <span aria-hidden="true" className="text-3xl text-accent transition group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
