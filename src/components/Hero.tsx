import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Video, Radio, Globe, Code, Palette, Settings } from "lucide-react";
import letterIGif from "../assets/letter-i.gif";
import letterOGif from "../assets/letter-o.gif";


gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconsTopRef = useRef<HTMLDivElement>(null);
  const iconsBottomRef = useRef<HTMLDivElement>(null);
  const letterIRef = useRef<HTMLSpanElement>(null);
  const letterORef = useRef<HTMLSpanElement>(null);
  const gifIRef = useRef<HTMLDivElement>(null);
  const gifORef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      const title = titleRef.current;
      if (title) {
        const lines = title.querySelectorAll(".hero-line");

        // Initial state
        gsap.set(lines, { y: 200, opacity: 0, rotateX: -45, overflow: "hidden" });

        // Check for fast loading cookie
        const isFastLoad = document.cookie.includes("mms_fast_load=true");

        // Animate each line
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: isFastLoad ? 0.6 : 1.2,
          stagger: isFastLoad ? 0.05 : 0.15,
          ease: "power4.out",
          delay: isFastLoad ? 0.2 : 0.8,
          force3D: true,
          onComplete: () => {
            gsap.set(lines, { overflow: "visible" });
          }
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
              force3D: true,
            }
          );
        }
      }

      // Initial GIF setups
      gsap.set([gifIRef.current, gifORef.current], {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        left: "50%",
        top: "50%",
        force3D: true,
      });

      // Animate letter "I" to GIF (One time)
      const animateLetterIToGif = () => {
        const timeline = gsap.timeline({ delay: 2.5 });

        timeline.to(letterIRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
          force3D: true,
        });

        timeline.to(gifIRef.current, {
          opacity: 1,
          scale: 0.6,
          duration: 0.8,
          ease: "back.out(1.7)",
          force3D: true,
        }, "-=0.2");

        timeline.to({}, { duration: 2 });

        timeline.to(gifIRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
          force3D: true,
        });

        timeline.to(letterIRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          force3D: true,
        });
      };

      // Animate letter "O" to GIF (One time)
      const animateLetterOToGif = () => {
        const timeline = gsap.timeline({ delay: 3.2 });

        timeline.to(letterORef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
          force3D: true,
        });

        timeline.to(gifORef.current, {
          opacity: 1,
          scale: 1.6,
          duration: 0.6,
          ease: "back.out(0.7)",
          force3D: true,
        }, "-=0.2");

        timeline.to({}, { duration: 0.6 });

        timeline.to(gifORef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
          force3D: true,
        });

        timeline.to(letterORef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          force3D: true,
        });
      };

      // Start animations
      animateLetterIToGif();
      animateLetterOToGif();

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 1.5,
          force3D: true,
        }
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
            force3D: true,
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
            force3D: true,
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
        force3D: true,
      });

      gsap.to(".float-down", {
        y: 20,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
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
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background with Matte Glass Base */}
      <div
        className="absolute inset-0 bg-[#fdfaf2] will-change-transform"
        style={{
          backgroundImage: 'url("/download.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15, // Made it light
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Light Vector Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none will-change-transform"
        style={{
          backgroundImage: 'url("/vector.png")',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backfaceVisibility: 'hidden',
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Top Icons */}
        <div ref={iconsTopRef} className="flex justify-center gap-6 md:gap-12 mb-8 md:mb-12">
          <Video className="hero-icon float-up w-8 h-8 md:w-12 md:h-12 text-foreground/60 will-change-transform" />
          <Radio className="hero-icon float-down w-8 h-8 md:w-12 md:h-12 text-foreground/60 will-change-transform" />
          <Palette className="hero-icon float-up w-8 h-8 md:w-12 md:h-12 text-foreground/60 will-change-transform" />
        </div>

        {/* Title with bold modern typography */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(2.2rem,10vw,8rem)] leading-[1] md:leading-[0.9] tracking-tight text-foreground font-bold will-change-transform transform-gpu"
        >
          <span className="hero-line block will-change-transform">
            <span className="inline-block relative">
              MediaMat
              <span className="relative inline-block">
                <span ref={letterIRef} className="inline-block will-change-transform">i</span>
                <div
                  ref={gifIRef}
                  className="absolute flex items-center justify-center pointer-events-none will-change-transform"
                  style={{
                    width: "1em",
                    height: "1em",
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={letterIGif}
                    alt="Animated I"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-contain max-w-none"
                  />
                </div>
              </span>
              c
            </span>
          </span>
          <span className="hero-line block will-change-transform">
            <span className="inline-block relative">
              Studi
              <span className="relative inline-block ml-[0.02em]">
                <span ref={letterORef} className="inline-block will-change-transform">o</span>
                <div
                  ref={gifORef}
                  className="absolute flex items-center justify-center pointer-events-none will-change-transform"
                  style={{
                    width: "1em",
                    height: "1em",
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={letterOGif}
                    alt="Animated O"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-contain max-w-none"
                  />
                </div>
              </span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl text-foreground/70 max-w-xl mx-auto font-body will-change-transform"
        >
          Crafting digital experiences that resonate. <br className="hidden md:block" />
          <span className="text-foreground font-semibold block md:inline mt-2 md:mt-0">Branding • Design • Strategy</span>
        </p>

        <div ref={iconsBottomRef} className="flex justify-center gap-6 md:gap-12 mt-8 md:mt-12">
          <Globe className="hero-icon float-down w-8 h-8 md:w-12 md:h-12 text-foreground/60 will-change-transform" />
          <Code className="hero-icon float-up w-8 h-8 md:w-12 md:h-12 text-foreground/60 will-change-transform" />
          <Settings className="hero-icon float-down w-8 h-8 md:w-12 md:h-12 text-foreground/60 will-change-transform" />
        </div>
      </div>
    </section>
  );
};
