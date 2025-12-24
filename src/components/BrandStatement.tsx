import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------------- TEXT ANIMATION ---------------- */
      const line1Chars = line1Ref.current?.querySelectorAll(".char");
      const line2Chars = line2Ref.current?.querySelectorAll(".char");

      if (line1Chars) {
        gsap.fromTo(
          line1Chars,
          { x: -200, opacity: 0, rotateY: -90 },
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
            },
          }
        );
      }

      if (line2Chars) {
        gsap.fromTo(
          line2Chars,
          { x: 200, opacity: 0, rotateY: 90 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.05,
            delay: 0.3,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      /* ---------------- BACKGROUND RINGS ---------------- */
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
          },
        }
      );

      /* ---------------- BRAND CARDS ---------------- */
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }

      /* ---------------- WHY BRANDING ---------------- */
      if (whyRef.current) {
        gsap.fromTo(
          whyRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: whyRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderTextWithChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary py-32 md:py-48 overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[800, 600, 400].map((size, i) => (
          <div
            key={i}
            className="brand-bg-element absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 rounded-full 
            border border-primary-foreground/10"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* HEADLINE */}
        <div ref={line1Ref} className="overflow-hidden mb-4">
          <h2 className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.9] text-primary-foreground">
            {renderTextWithChars("YOUR BRAND")}
          </h2>
        </div>

        <div ref={line2Ref} className="overflow-hidden">
          <h2 className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.9] italic text-primary-foreground/80">
            {renderTextWithChars("WE MANAGE")}
          </h2>
        </div>

        {/* BRANDING CONTENT */}
        <div className="max-w-4xl mx-auto mt-16 text-primary-foreground/80 space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Branding</strong> is the strategic process of creating and managing
            the identity of a business, product, or service.
          </p>
          <p>
            It defines how an organization connects with its target audience through
            logos, colors, design systems, websites, and overall customer experience.
          </p>
          <p>
            Branding is both an art and a science—shaping perceptions, building trust,
            and helping brands stand out in competitive markets.
          </p>
        </div>

        {/* BRANDING CARDS */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {[
            ["Brand Identity", "Visual and verbal expression of the brand."],
            ["Brand Positioning", "How the brand differentiates itself in the market."],
            ["Brand Promise", "The value customers can consistently expect."],
            ["Brand Personality", "Human traits like innovative, trustworthy, fun."],
            ["Brand Experience", "How audiences feel at every touchpoint."],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-primary-foreground/5 backdrop-blur rounded-2xl p-8 
              border border-primary-foreground/10 text-left"
            >
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">
                {title}
              </h3>
              <p className="text-primary-foreground/70">{desc}</p>
            </div>
          ))}
        </div>

        {/* WHY BRANDING MATTERS */}
        <div ref={whyRef} className="max-w-3xl mx-auto mt-24 text-left">
          <h3 className="text-3xl font-bold text-primary-foreground mb-6">
            Why Branding Matters
          </h3>
          <ul className="space-y-4 text-primary-foreground/80 text-lg">
            <li>• Builds recognition and trust</li>
            <li>• Creates emotional connections with audiences</li>
            <li>• Supports premium pricing and loyalty</li>
            <li>• Helps businesses stand out in competitive markets</li>
          </ul>

          <p className="mt-8 italic text-primary-foreground/70">
            “Branding is the process of defining and communicating a business identity
            and value proposition, shaping perceptions and building long-term loyalty.”
          </p>
        </div>
      </div>
    </section>
  );
};
