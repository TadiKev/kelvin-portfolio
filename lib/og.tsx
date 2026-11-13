import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const ramp = ["#6b4c2c", "#a7853a", "#93b956", "#4f9f5f", "#2f8058"];

/** Shared social preview: a field mosaic on the right, the page's title on the left. */
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const tiles = Array.from({ length: 24 }, (_, i) => ramp[(i * 7 + (i % 3)) % ramp.length]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#080d11", color: "#e6ecec" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 720 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8d9ea6", textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
            <div style={{ fontSize: 28, color: "#8d9ea6", marginTop: 20, lineHeight: 1.35 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#e9b14c" }} />
            Kelvin Machaka · AI Engineer
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: 480, height: 630, padding: 24, gap: 8, position: "relative" }}>
          {tiles.map((c, i) => (
            <div key={i} style={{ width: 102, height: 90, background: c, opacity: 0.85, borderRadius: 4 }} />
          ))}
          <div style={{ position: "absolute", left: 250, top: 0, width: 4, height: 630, background: "#e9b14c" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
