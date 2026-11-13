import type { CSSProperties, ReactNode } from "react";

/**
 * Lifts content into place as it scrolls into view, in CSS alone (scroll-driven animation), so it
 * costs no JavaScript. Browsers without support, and visitors who prefer reduced motion, see the
 * content in place.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-delay": `${delay * 100}%` } as CSSProperties}>
      {children}
    </div>
  );
}
