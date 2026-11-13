"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print sticky z-40 border-b transition-colors ${
        scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="gutter mx-auto flex h-16 max-w-6xl items-center justify-between" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2.5">
          <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-[6px] bg-accent font-display text-sm font-bold text-bg">
            K
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">Kelvin Machaka</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition hover:text-text"
            >
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:brightness-110"
          >
            Start a project
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-sm"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="gutter border-t border-line bg-bg pb-5 md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-3 font-display text-2xl">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg"
          >
            Start a project on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
