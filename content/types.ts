export type Project = {
  slug: string;
  title: string;
  /** One line a client understands: what it does and for whom. */
  tagline: string;
  domain: string;
  year: string;
  /** 0 = bare soil, 1 = full canopy: sets the card's colour on the crop-health ramp. */
  health: number;
  stack: string[];
  /** Only set when the repository really contains AI or ML. */
  ai?: string;
  problem: string;
  built: string[];
  decisions?: string[];
  links: { live?: string; code?: string };
  image?: { src: string; alt: string };
  featured: boolean;
};
