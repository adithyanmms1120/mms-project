import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for each character
      const line1Chars = line1Ref.current?.querySelectorAll(".char");
      const line2Chars = line2Ref.current?.querySelectorAll(".char");

      // Line 1: "YOUR BRAND" - slide in from left with stagger
      if (line1Chars) {
        gsap.fromTo(
          line1Chars,
          { 
            x: -200, 
            opacity: 0,
            rotateY: -90,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Line 2: "WE MANAGE" - slide in from right with stagger and delay
      if (line2Chars) {
        gsap.fromTo(
          line2Chars,
          { 
            x: 200, 
            opacity: 0,
            rotateY: 90,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            delay: 0.3,
          }
        );
      }

      // Subtle background movement
      gsap.fromTo(
        ".brand-bg-element",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 0.1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderTextWithChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="brand-statement"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-primary overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="brand-bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-foreground/10" />
        <div className="brand-bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground/10" />
        <div className="brand-bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary-foreground/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Line 1: YOUR BRAND */}
          <div
            ref={line1Ref}
            className="overflow-hidden mb-4"
          >
            <h2 className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.9] tracking-tight text-primary-foreground">
              {renderTextWithChars("YOUR BRAND")}
            </h2>
          </div>

          {/* Line 2: WE MANAGE */}
          <div
            ref={line2Ref}
            className="overflow-hidden"
          >
            <h2 className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.9] tracking-tight text-primary-foreground/80 italic">
              {renderTextWithChars("WE MANAGE")}
            </h2>
          </div>

          {/* Exclamation marks animation */}
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3].map((_, i) => (
              <span
                key={i}
                className="text-6xl md:text-8xl font-bold text-primary-foreground/60 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                !
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
