import { ogImage, ogSize } from "@/lib/og";
import { projects } from "@/content/projects";

export const alt = "Project case study by Kelvin Machaka";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return ogImage({
    eyebrow: project ? `${project.domain} · case study` : "Case study",
    title: project?.title ?? "Kelvin Machaka",
    subtitle: project?.tagline ?? "AI, full-stack and geospatial products.",
  });
}
