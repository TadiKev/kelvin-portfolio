import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gutter field-grid">
      <div className="mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-center py-24">
        <p className="label">Error 404 · no signal</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold tracking-tight md:text-7xl">
          This field isn&apos;t on the map.
        </h1>
        <p className="mt-5 max-w-lg text-lg text-muted">The page moved or never existed. The work and contact details are one click away.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg">
            Back to the home page
          </Link>
          <Link href="/#work" className="rounded-full border border-line px-5 py-3 text-sm">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
