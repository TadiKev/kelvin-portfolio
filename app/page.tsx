import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { FieldScan } from "@/components/field-scan";
import { ProjectCard, healthColor } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { archive, featured } from "@/content/projects";
import { capabilities, experience, site } from "@/content/site";

export default function Home() {
  const now = experience[0];
  return (
    <>
      {/* Hero */}
      <section className="gutter relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:pb-24 md:pt-16">
          <div className="min-w-0">
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2 text-text">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sprout opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sprout" />
                </span>
                Available for projects
              </span>
              <span aria-hidden="true">/</span>
              <span>AI Engineer · Harare</span>
            </p>
            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
              AI and software for the work that happens{" "}
              <span className="text-accent">outside the office.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
              I&apos;m Kelvin Machaka. I build production systems for farms, filling stations, hospitals and field teams:
              satellite crop monitoring, fraud detection, and disease diagnosis from a phone photo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#work" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg transition hover:brightness-110">
                See the work
              </Link>
              <a href={site.cv} download className="rounded-full border border-line px-5 py-3 text-sm transition hover:border-accent">
                Download CV
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3 py-3 text-sm text-muted underline-offset-4 transition hover:text-text hover:underline"
              >
                WhatsApp {site.phone}
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-line bg-surface">
              <FieldScan />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg/90 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] text-muted">
                <span>PASS 07 · {site.coordinates}</span>
                <span className="hidden sm:inline">crop health · soil → canopy</span>
              </div>
            </div>
            <div className="mt-3 flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
              {["--soil", "--dry", "--sprout", "--leaf", "--canopy"].map((v) => (
                <span key={v} className="flex-1" style={{ background: `var(${v})` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="gutter border-y border-line bg-surface/60">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            ["Now", `${now.role} at ${now.org}`],
            ["Focus", "Computer vision, predictive models, geospatial"],
            ["Stack", "Django · FastAPI · React · Next.js"],
            ["Education", "Informatics and Analytics"],
          ].map(([k, v]) => (
            <li key={k} className="py-6 pr-4">
              <p className="label">{k}</p>
              <p className="mt-1.5 text-[15px] leading-snug">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Selected work */}
      <section id="work" className="gutter scroll-mt-20">
        <div className="mx-auto max-w-6xl py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label">Selected work</p>
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
                  Systems that solve a real problem for someone.
                </h2>
              </div>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-text">
                Everything on GitHub →
              </a>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                <ProjectCard project={p} index={i} large={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="gutter field-grid border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-10 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <Reveal>
            <p className="label">Currently</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {now.role} at {now.org}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">{now.summary}</p>
            <p className="mt-4 text-sm text-muted">{now.period}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="divide-y divide-line rounded-xl border border-line bg-bg/80 backdrop-blur-sm">
              {now.points.map((pt, i) => (
                <li key={pt} className="flex gap-4 p-5">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* What I do */}
      <section className="gutter">
        <div className="mx-auto max-w-6xl py-20 md:py-28">
          <Reveal>
            <p className="label">What I can build for you</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">From the first sketch to production.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {capabilities.map((c, i) => (
              <div key={c.title} className="bg-bg p-7 md:p-9">
                <span className="block h-1 w-10 rounded-full" style={{ background: healthColor(0.25 + i * 0.22) }} aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="gutter border-t border-line">
        <div className="mx-auto max-w-6xl py-20">
          <p className="label">Earlier work</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {archive.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="group grid gap-1 py-5 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-6">
                  <span className="font-display text-lg font-semibold group-hover:text-accent">{p.title}</span>
                  <span className="text-[15px] text-muted">{p.tagline}</span>
                  <span className="font-mono text-xs text-muted">
                    {p.domain} · {p.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About teaser */}
      <section className="gutter border-t border-line bg-surface/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 py-20 md:grid-cols-[320px_1fr] md:gap-16">
          <figure className="relative mx-auto w-full max-w-[320px]">
            <div className="overflow-hidden rounded-xl border border-line">
              <Image src={site.photo} alt="Kelvin Machaka" width={960} height={1200} sizes="320px" className="h-auto w-full" priority={false} />
            </div>
            <figcaption className="mt-2 flex justify-between font-mono text-[11px] text-muted">
              <span>Ground truth</span>
              <span>{site.coordinates}</span>
            </figcaption>
          </figure>
          <div className="min-w-0">
            <p className="label">About</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Built in Harare, for the people doing the work.</h2>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-muted">
              I studied Informatics and Analytics and now work as an AI engineer. Most of what I build starts with a person
              doing a hard job with poor information: a farmer guessing at a sick leaf, a station owner losing fuel, a
              dispatcher planning a day by hand. I like systems that make that job easier and keep working when the
              network, the data or the model doesn&apos;t.
            </p>
            <Link href="/about" className="mt-6 inline-flex text-sm text-accent underline-offset-4 hover:underline">
              More about how I work →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="gutter scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
          <div>
            <p className="label">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">Let&apos;s build it.</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              Freelance projects, contracts or a full-time role. Tell me what you need and I&apos;ll reply within one working day.
            </p>
            <ul className="mt-8 space-y-4 text-[15px]">
              <li>
                <p className="label">WhatsApp · fastest</p>
                <a className="mt-1 inline-block hover:text-accent" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  {site.phone}
                </a>
              </li>
              <li>
                <p className="label">Email</p>
                <a className="mt-1 inline-block break-all hover:text-accent" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <p className="label">Phone</p>
                <a className="mt-1 inline-block hover:text-accent" href={site.phoneHref}>
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-5 pt-2">
                <a className="text-muted hover:text-text" href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                {site.linkedin && (
                  <a className="text-muted hover:text-text" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                <Link className="text-muted hover:text-text" href="/cv">
                  CV
                </Link>
              </li>
            </ul>
          </div>
          <div className="min-w-0 rounded-2xl border border-line bg-surface p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
