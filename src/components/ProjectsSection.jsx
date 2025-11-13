import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Inventory Management System",
    description:
      "Frontend for an inventory system — product lists, stock levels and management UI.",
    // your image file (spaces URL-encoded)
    image: "/projects/inventory%20management%20system.png",
    tags: ["React", "Vite", "TailwindCSS"],
    demoUrl: "https://barventory-frontend.vercel.app/",
    githubUrl: "https://github.com/TadiKev/barventory-frontend",
  },
  {
    id: 2,
    title: "Local Language Learning",
    description:
      "A language learning platform that helps users practice and preserve local African languages through gamified lessons.",
    image: "/projects/language-learning.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://local-language-app.vercel.app",
    githubUrl: "https://github.com/TadiKev/my-local-language-app",
  },
  {
    id: 3,
    title: "Smart Meter Reader Dashboard",
    description:
      "An interactive analytics dashboard for visualizing energy consumption data using charts and filters.",
    image: "/projects/meter-reader.png",
    tags: ["React", "Django", "REST API"],
    demoUrl: "https://your-frontend.vercel.app",
    githubUrl: "https://github.com/TadiKev/django-react-meter-logger",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={`${project.id}-tag-${i}`}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live demo for ${project.title}`}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open GitHub repo for ${project.title}`}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/TadiKev"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
