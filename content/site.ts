export const site = {
  name: "Kelvin Machaka",
  role: "AI Engineer",
  // Switch to the custom domain (e.g. https://kelvinmachaka.dev) once it is bought and added in Vercel.
  url: "https://kelvin-portfolio-lac.vercel.app",
  displayUrl: "kelvin-portfolio-lac.vercel.app",
  location: "Harare, Zimbabwe",
  coordinates: "17.83°S · 31.05°E",
  availability: "Available for freelance projects and remote roles",
  email: "machakakelvin903@gmail.com",
  phone: "+263 78 125 5971",
  phoneHref: "tel:+263781255971",
  whatsapp: "https://wa.me/263781255971",
  github: "https://github.com/TadiKev",
  linkedin: "https://www.linkedin.com/in/kelvin-machaka-571248303/",
  formspree: process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/mqawazjk",
  cv: "/cv.pdf",
  photo: "/kelvin.jpg",
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "AI Engineer",
    org: "Earthasoft",
    period: "2026 — present",
    summary:
      "Agritech platform for crop monitoring and agricultural insurance across Zimbabwe and southern Africa.",
    points: [
      "Satellite crop monitoring: growth stages from optical imagery, radar to fill cloudy weeks, yield estimates and pest and disease risk.",
      "Insurer risk monitoring: claims, field evidence packs, damage maps, assessment and review steps, payouts and limits.",
      "Machine learning for field boundary detection and crop type detection.",
      "Full-stack delivery: Python services (FastAPI, Django, Celery), Next.js front end, PostgreSQL/PostGIS, Kubernetes releases, privacy-first product analytics.",
    ],
  },
];

export const education = [
  {
    degree: "Degree in Informatics and Analytics",
    // TODO(Kelvin): university name and graduation year.
    school: "",
    period: "",
  },
];

export const capabilities = [
  {
    title: "AI features that ship",
    body: "Image models that diagnose crops and livestock, predictive models for operations, and the serving, fallbacks and monitoring that keep them dependable in production.",
  },
  {
    title: "Full-stack products",
    body: "From database schema to the last pixel: Python and Node back ends, React and Next.js front ends, authentication, payments and dashboards.",
  },
  {
    title: "Geospatial and data",
    body: "Satellite imagery, maps and field boundaries, PostGIS, time series and the analytics that turn raw data into decisions.",
  },
  {
    title: "Delivery and operations",
    body: "Docker, CI/CD, Kubernetes and cloud deployment, with monitoring and error tracking so problems surface before users report them.",
  },
];

export const stack = [
  { group: "AI / ML", items: ["Python", "TensorFlow / Keras", "PyTorch", "scikit-learn", "Model serving (FastAPI)", "Satellite imagery"] },
  { group: "Back end", items: ["Django REST", "FastAPI", "Node.js / Express", "Celery", "WebSockets (Channels)", "OpenAPI"] },
  { group: "Front end", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Mapbox"] },
  { group: "Data & infra", items: ["PostgreSQL / PostGIS", "MongoDB", "Redis", "Docker", "Kubernetes", "GitHub Actions"] },
];
