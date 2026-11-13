import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description =
  "Kelvin Machaka is an AI engineer in Harare building production AI, full-stack and geospatial products, from satellite crop monitoring to LLM assistants. Available for freelance projects and remote roles.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Kelvin Machaka — AI Engineer", template: "%s — Kelvin Machaka" },
  description,
  applicationName: "Kelvin Machaka",
  authors: [{ name: site.name, url: site.url }],
  keywords: ["AI engineer", "full-stack developer", "Zimbabwe", "Harare", "LLM", "RAG", "Next.js", "Django", "FastAPI", "geospatial"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Kelvin Machaka",
    title: "Kelvin Machaka — AI Engineer",
    description,
    locale: "en_ZW",
  },
  twitter: { card: "summary_large_image", title: "Kelvin Machaka — AI Engineer", description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080d11" },
    { media: "(prefers-color-scheme: light)", color: "#f1f4f0" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  image: `${site.url}${site.photo}`,
  email: `mailto:${site.email}`,
  telephone: site.phone.replace(/\s/g, ""),
  address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "ZW" },
  sameAs: [site.github, site.linkedin].filter(Boolean),
  knowsAbout: ["Artificial intelligence", "Large language models", "Retrieval-augmented generation", "Full-stack web development", "Geospatial data"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
