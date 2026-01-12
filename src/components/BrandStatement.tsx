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
            duration: 1.2,
            stagger: 0.05,
            ease: "power3.out",
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
            duration: 1.2,
            stagger: 0.05,
            delay: 0.3,
            ease: "power3.out",
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
          duration: 2,
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
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
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
      className="relative bg-[#53131b] py-32 md:py-48 overflow-hidden"
      id="brandstatements"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[800, 600, 400].map((size, i) => (
          <div
            key={i}
            className="brand-bg-element absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 rounded-full 
            border border-[#fdf3b7]/10"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADLINE */}
        <div className="text-center mb-20 space-y-4">
          <div ref={line1Ref} className="overflow-hidden">
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] text-[#fdf3b7] tracking-tight">
              {renderTextWithChars("YOUR BRAND")}
            </h2>
          </div>
          <div ref={line2Ref} className="overflow-hidden">
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] italic text-[#fdf3b7]/80 tracking-tight">
              {renderTextWithChars("WE MANAGE")}
            </h2>
          </div>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-[#fdf3b7]/60 mt-8 font-light">
            Crafting identities that resonate, communicate, and endure.
          </p>
        </div>

        {/* BRANDING CARDS - NEW LAYOUT */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {[
            {
              title: "Brand Identity",
              desc: "The visual and verbal expression of your brand, from logos to tone of voice.",
              delay: 0
            },
            {
              title: "Brand Positioning",
              desc: "Strategically defining how your brand differentiates itself in the competitive market landscape.",
              delay: 0.1
            },
            {
              title: "Brand Promise",
              desc: "The consistent value and experience customers can expect from every interaction.",
              delay: 0.2
            },
            {
              title: "Brand Personality",
              desc: "Human traits like innovative, trustworthy, or playful that define your brand's character.",
              delay: 0.3
            },
            {
              title: "Brand Experience",
              desc: "The holistic journey and emotional connection audiences feel at every touchpoint.",
              delay: 0.4,
              className: "md:col-span-2 lg:col-span-1"
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group bg-[#fdf3b7]/5 hover:bg-[#fdf3b7]/10 rounded-[2rem] p-8 md:p-10 
              border border-[#fdf3b7]/10 shadow-sm hover:shadow-2xl 
              transition-all duration-500 flex flex-col justify-between ${item.className || ''}`}
            >
              <div>
                <h3 className="text-2xl font-bold text-[#fdf3b7] mb-4 tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-[#fdf3b7]/70 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* WHY BRANDING MATTERS - REDESIGNED */}
        <div ref={whyRef} className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-[#fdf3b7]/5 rounded-full blur-2xl" />
            <h3 className="text-4xl md:text-5xl font-bold text-[#fdf3b7] mb-8 relative z-10 leading-tight">
              Why Branding <br />
              <span className="italic opacity-80 decoration-4 underline decoration-[#fdf3b7]/20">Matters</span>
            </h3>
            <p className="text-xl md:text-2xl text-[#fdf3b7]/80 font-light italic leading-relaxed border-l-4 border-[#fdf3b7]/20 pl-6 my-8">
              “Branding is the process of defining and communicating a business identity
              and value proposition, shaping perceptions and building long-term loyalty.”
            </p>
          </div>

          <div className="bg-[#fdf3b7] text-[#53131b] p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Decorative circle inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

            <ul className="space-y-6 relative z-10">
              {[
                "Builds recognition and trust",
                "Creates emotional connections",
                "Supports premium pricing",
                "Stands out in competitive markets"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <div className="w-2 h-2 rounded-full bg-[#53131b] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
