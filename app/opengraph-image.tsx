import { ogImage, ogSize } from "@/lib/og";

export const alt = "Kelvin Machaka — AI Engineer, Harare";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "AI Engineer · Harare, Zimbabwe",
    title: "Kelvin Machaka",
    subtitle: "Production AI, full-stack and geospatial products.",
  });
}
