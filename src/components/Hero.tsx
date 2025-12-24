import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Video, Radio, Globe, Code, Palette, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconsTopRef = useRef<HTMLDivElement>(null);
  const iconsBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      const title = titleRef.current;
      if (title) {
        const lines = title.querySelectorAll(".hero-line");
        
        // Initial state
        gsap.set(lines, { y: 200, opacity: 0, rotateX: -45 });
        
        // Animate each line
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.8,
        });

        // Character stagger effect for main text
        const chars = title.querySelectorAll(".hero-char");
        if (chars.length) {
          gsap.fromTo(
            chars,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.02,
              ease: "power3.out",
              delay: 1,
            }
          );
        }
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
      );

      // Icons animation
      const topIcons = iconsTopRef.current?.querySelectorAll(".hero-icon");
      const bottomIcons = iconsBottomRef.current?.querySelectorAll(".hero-icon");

      if (topIcons) {
        gsap.fromTo(
          topIcons,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 0.7,
            rotation: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 1.8,
          }
        );
      }

      if (bottomIcons) {
        gsap.fromTo(
          bottomIcons,
          { scale: 0, opacity: 0, rotation: 180 },
          {
            scale: 1,
            opacity: 0.7,
            rotation: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 2,
          }
        );
      }

      // Floating animation for icons
      gsap.to(".float-up", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-down", {
        y: 20,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax on scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        opacity: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Top Icons */}
        <div ref={iconsTopRef} className="flex justify-center gap-12 mb-12">
          <Video className="hero-icon float-up w-12 h-12 text-foreground" />
          <Radio className="hero-icon float-down w-12 h-12 text-foreground" />
          <Palette className="hero-icon float-up w-12 h-12 text-foreground" />
        </div>

        {/* Title with bold modern typography */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tight text-foreground font-bold"
        >
          <span className="hero-line block overflow-hidden">
            <span className="inline-block">MediaMatic</span>
            <span className="inline-block">Studio</span>
          </span>
          {/* <span className="hero-line block overflow-hidden">
            <span className="inline-block italic font-normal opacity-70">Studio</span>
          </span> */}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl text-foreground/70 max-w-xl mx-auto font-body"
        >
          Crafting digital experiences that resonate. <br />
          <span className="text-foreground font-semibold">Branding • Design • Strategy</span>
        </p>

        {/* Bottom Icons */}
        <div ref={iconsBottomRef} className="flex justify-center gap-12 mt-12">
          <Globe className="hero-icon float-down w-12 h-12 text-foreground" />
          <Code className="hero-icon float-up w-12 h-12 text-foreground" />
          <Settings className="hero-icon float-down w-12 h-12 text-foreground" />
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
        >
          {/* <span className="text-xs uppercase tracking-widest font-body">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" /> */}
        </button>
      </div>
    </section>
  );
};
