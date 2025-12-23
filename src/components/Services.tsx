import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Megaphone, Layers, Sparkles, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Visual identity systems, logos, and brand guidelines that make lasting impressions.",
    features: ["Logo Design", "Color Systems", "Typography", "Brand Guidelines"],
  },
  {
    icon: Megaphone,
    title: "Brand Strategy",
    description: "Strategic positioning and messaging that resonates with your target audience.",
    features: ["Market Research", "Positioning", "Messaging", "Voice & Tone"],
  },
  {
    icon: Layers,
    title: "Digital Design",
    description: "Beautiful, functional interfaces that convert visitors into customers.",
    features: ["UI/UX Design", "Web Design", "App Design", "Prototyping"],
  },
  {
    icon: Sparkles,
    title: "Campaign Launch",
    description: "Launch strategies and creative campaigns that drive engagement.",
    features: ["Launch Strategy", "Social Media", "Content Creation", "Analytics"],
  },
];

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".services-title",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateY: index % 2 === 0 ? -15 : 15,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Hover animations
      cards?.forEach((card) => {
        const icon = card.querySelector(".service-icon");
        const arrow = card.querySelector(".service-arrow");

        card.addEventListener("mouseenter", () => {
          gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3 });
          gsap.to(arrow, { x: 5, y: -5, duration: 0.3 });
          gsap.to(card, { y: -10, duration: 0.3 });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
          gsap.to(arrow, { x: 0, y: 0, duration: 0.3 });
          gsap.to(card, { y: 0, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-foreground/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-foreground/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-body block mb-4">
            What We Do
          </span>
          <h2 className="services-title font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] max-w-2xl">
            Learn how to use the{" "}
            <span className="italic text-foreground/60">coolest</span>{" "}
            design principles
          </h2>
        </div>

        {/* Services grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-card border border-border rounded-3xl p-10 cursor-pointer transition-shadow duration-500 hover:shadow-2xl"
              style={{ perspective: "1000px" }}
            >
              {/* Card number */}
              <span className="absolute top-8 right-8 text-6xl font-display text-foreground/5">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="service-icon inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground text-background mb-8">
                <service.icon size={28} />
              </div>

              {/* Content */}
              <h3 className="font-display text-3xl mb-4 flex items-center gap-3">
                {service.title}
                <ArrowUpRight className="service-arrow w-6 h-6 text-foreground/40" />
              </h3>
              <p className="text-foreground/60 mb-8 font-body text-lg leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs uppercase tracking-wider bg-foreground/5 text-foreground/70 px-4 py-2 rounded-full font-body"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
