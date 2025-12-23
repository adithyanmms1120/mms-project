import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".about-word") || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll(".stat-number");
      stats?.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0");
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stats cards stagger
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-card") || [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 28, suffix: "%", label: "Avg. Signup Increase" },
    { value: 5, suffix: "", label: "Years Experience" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-primary text-primary-foreground overflow-hidden"
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-l from-primary-foreground/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 font-body">
            About Us
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] max-w-4xl">
            <span className="about-word inline-block mr-4">We</span>
            <span className="about-word inline-block mr-4">build</span>
            <span className="about-word inline-block mr-4 italic text-primary-foreground/70">cohesive</span>
            <span className="about-word inline-block mr-4">brands</span>
            <span className="about-word inline-block mr-4">—</span>
            <span className="about-word inline-block mr-4">from</span>
            <span className="about-word inline-block mr-4">naming</span>
            <span className="about-word inline-block mr-4">to</span>
            <span className="about-word inline-block italic text-primary-foreground/70">launch</span>
          </h2>
        </div>

        {/* Description */}
        <div ref={textRef} className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="text-xl text-primary-foreground/80 leading-relaxed font-body">
              Our studio brings together designers, strategists, and engineers to
              deliver end-to-end product experiences that drive real business results.
            </p>
          </div>
          <div>
            <p className="text-lg text-primary-foreground/60 leading-relaxed font-body">
              We help businesses build cohesive brands — from naming and positioning
              to visual systems and launch strategy. Every project starts with deep
              research and ends with measurable impact.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary-foreground/10"
            >
              <div className="font-display text-5xl md:text-6xl mb-2">
                <span className="stat-number" data-value={stat.value}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-primary-foreground/60 uppercase tracking-wider font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
