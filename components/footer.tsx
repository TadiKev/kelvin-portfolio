import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print gutter border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="hover:text-text" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="hover:text-text" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a className="hover:text-text" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          {site.linkedin && (
            <li>
              <a className="hover:text-text" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          )}
          <li>
            <Link className="hover:text-text" href="/cv">
              CV
            </Link>
          </li>
        </ul>
        <p className="label">{site.coordinates}</p>
      </div>
    </footer>
  );
}
