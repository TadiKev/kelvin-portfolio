"use client";

import { useEffect, useRef } from "react";

/**
 * A night-time satellite pass over a patchwork of fields. Parcels start as dark ground; the scan
 * line reveals each one in its crop-health colour, from bare soil to full canopy. Deterministic
 * (seeded), drawn once per frame only while visible, and fully revealed and still when the visitor
 * prefers reduced motion.
 */

type Parcel = { x: number; y: number; w: number; h: number; health: number; label?: string };

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function subdivide(x: number, y: number, w: number, h: number, depth: number, rnd: () => number, out: Parcel[]) {
  const small = w < 70 || h < 52;
  if (depth === 0 || small || (depth < 3 && rnd() < 0.18)) {
    out.push({ x, y, w, h, health: rnd() });
    return;
  }
  const vertical = w / h > 1.2 ? true : w / h < 0.8 ? false : rnd() < 0.5;
  const t = 0.3 + rnd() * 0.4;
  if (vertical) {
    const a = Math.round(w * t);
    subdivide(x, y, a, h, depth - 1, rnd, out);
    subdivide(x + a, y, w - a, h, depth - 1, rnd, out);
  } else {
    const a = Math.round(h * t);
    subdivide(x, y, w, a, depth - 1, rnd, out);
    subdivide(x, y + a, w, h - a, depth - 1, rnd, out);
  }
}

function readVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  const n = parseInt(v.length === 3 ? v.split("").map((c) => c + c).join("") : v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rampColor(t: number, stops: [number, number, number][]) {
  const p = Math.min(0.9999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(p);
  const f = p - i;
  const a = stops[i];
  const b = stops[i + 1];
  return `rgb(${a.map((c, k) => Math.round(c + (b[k] - c) * f)).join(",")})`;
}

export function FieldScan({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let parcels: Parcel[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let start = performance.now();
    const PASS_MS = 5200;
    const HOLD_MS = 2600;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rnd = seeded(17_83);
      parcels = [];
      subdivide(0, 0, width, height, 6, rnd, parcels);
      // A few parcels carry a reading, as a real pass would.
      parcels
        .filter((p) => p.w > 90 && p.h > 60)
        .slice(0, 5)
        .forEach((p, i) => (p.label = `F-${String(12 + i * 7).padStart(2, "0")} · ${p.health.toFixed(2)}`));
    };

    // Reading CSS variables forces style work, so the palette is read once and again only on theme change.
    let palette = { bg: "", line: "", accent: "", muted: "", font: "", stops: [] as [number, number, number][] };
    const readPalette = () => {
      palette = {
        bg: readVar("--bg"),
        line: readVar("--line"),
        accent: readVar("--accent"),
        muted: readVar("--muted"),
        font: readVar("--font-geist-mono") || "ui-monospace, monospace",
        stops: ["--soil", "--dry", "--sprout", "--leaf", "--canopy"].map((v) => hexToRgb(readVar(v))),
      };
    };
    readPalette();

    const draw = (progress: number) => {
      const { bg, line, accent, muted, stops } = palette;
      const scanX = progress * (width + 80) - 40;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      for (const p of parcels) {
        const revealed = p.x + p.w * 0.5 < scanX;
        ctx.fillStyle = revealed ? rampColor(p.health, stops) : line;
        ctx.globalAlpha = revealed ? 0.82 : 0.55;
        ctx.fillRect(p.x + 1.5, p.y + 1.5, Math.max(0, p.w - 3), Math.max(0, p.h - 3));
        // Crop rows inside revealed parcels.
        if (revealed) {
          ctx.globalAlpha = 0.18;
          ctx.strokeStyle = bg;
          ctx.lineWidth = 1;
          ctx.beginPath();
          const step = 7;
          for (let r = p.y + 6; r < p.y + p.h - 3; r += step) {
            ctx.moveTo(p.x + 5, r);
            ctx.lineTo(p.x + p.w - 5, r);
          }
          ctx.stroke();
        }
        if (revealed && p.label) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = bg;
          ctx.font = `500 10px ${palette.font}`;
          const tw = ctx.measureText(p.label).width;
          ctx.fillRect(p.x + 8, p.y + 8, tw + 10, 17);
          ctx.fillStyle = muted;
          ctx.fillText(p.label, p.x + 13, p.y + 20);
        }
      }
      ctx.globalAlpha = 1;

      // The pass itself.
      if (scanX > -40 && scanX < width + 40) {
        const grad = ctx.createLinearGradient(scanX - 70, 0, scanX, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, accent);
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = grad;
        ctx.fillRect(scanX - 70, 0, 70, height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent;
        ctx.fillRect(scanX - 1, 0, 2, height);
      }
    };

    let last = 0;
    const tick = (now: number) => {
      if (!visible) return;
      // About 30 frames a second is smooth for a slow pass and halves the work.
      if (now - last >= 32) {
        last = now;
        const elapsed = (now - start) % (PASS_MS + HOLD_MS);
        draw(Math.min(1, elapsed / PASS_MS));
      }
      frame = requestAnimationFrame(tick);
    };

    layout();
    // Paint a finished frame at once, then start the pass after the page has settled.
    draw(1.1);
    let idle = 0;
    if (!reduce) {
      const begin = () => {
        start = performance.now();
        frame = requestAnimationFrame(tick);
      };
      idle = window.setTimeout(begin, 1200);
    }

    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) draw(1.1);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduce) frame = requestAnimationFrame(tick);
    });
    io.observe(canvas);

    // Theme switches change the palette.
    const mo = new MutationObserver(() => {
      readPalette();
      if (reduce) draw(1.1);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label="Illustration: a satellite pass revealing the crop health of a patchwork of fields"
    />
  );
}
