import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Mobile App Redesign",
    category: "UI/UX Design",
    year: "2024",
    color: "from-rose-500/20 to-orange-500/20",
  },
  {
    title: "Visual Identity",
    category: "Branding",
    year: "2024",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Campaign Launch",
    category: "Marketing",
    year: "2023",
    color: "from-green-500/20 to-teal-500/20",
  },
];

export const Studio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ------------------ Heading reveal ------------------ */
      gsap.fromTo(
        ".studio-heading",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".studio-heading",
            start: "top 85%",
          },
        }
      );

      /* ------------------ Horizontal gallery scroll ------------------ */
      const track = document.querySelector(".projects-track") as HTMLElement;

      if (track) {
        const scrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-wrapper",
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      /* ------------------ Marquee animation ------------------ */
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-body block mb-4">
            Our Work
          </span>
          <h2 className="studio-heading font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
            Featured{" "}
            <span className="italic text-foreground/60">Projects</span>
          </h2>
        </div>
      </div>

      {/* ------------------ Horizontal Projects Gallery ------------------ */}
      <div className="projects-wrapper overflow-hidden">
        <div className="projects-track flex gap-8 px-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative aspect-[4/5] min-w-[80vw] md:min-w-[32vw] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card content */}
              <div className="relative h-full p-8 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-wider text-foreground/60 font-body">
                  {project.category}
                </span>

                <div className="transform group-hover:-translate-y-4 transition-transform duration-500">
                  <h3 className="font-display text-3xl mb-2 group-hover:text-background transition-colors duration-500">
                    {project.title}
                  </h3>
                  <span className="text-sm text-foreground/50 group-hover:text-background/70 transition-colors duration-500 font-body">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------ Marquee ------------------ */}
      <div className="relative overflow-hidden py-10 border-y border-foreground/10 mt-32">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="font-display text-6xl text-foreground/10">
                Design
              </span>
              <span className="w-3 h-3 rounded-full bg-foreground/20" />
              <span className="font-display text-6xl text-foreground/10 italic">
                Strategy
              </span>
              <span className="w-3 h-3 rounded-full bg-foreground/20" />
              <span className="font-display text-6xl text-foreground/10">
                Branding
              </span>
              <span className="w-3 h-3 rounded-full bg-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
