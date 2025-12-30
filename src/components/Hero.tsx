import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Video, Radio, Globe, Code, Palette, Settings } from "lucide-react";
import letterIGif from "../assets/Letter i.gif";
import finalGif from "../assets/Final.gif";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconsTopRef = useRef<HTMLDivElement>(null);
  const iconsBottomRef = useRef<HTMLDivElement>(null);
  const letterIWrapperRef = useRef<HTMLSpanElement>(null);
  const letterOWrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get elements
      const letterI = titleRef.current?.querySelector<HTMLSpanElement>(".letter-i");
      const letterO = titleRef.current?.querySelector<HTMLSpanElement>(".letter-o");
      const iGifContainer = letterIWrapperRef.current?.querySelector<HTMLDivElement>(".gif-i");
      const oGifContainer = letterOWrapperRef.current?.querySelector<HTMLDivElement>(".gif-o");
      const titleLines = titleRef.current?.querySelectorAll(".hero-line");
      const topIcons = iconsTopRef.current?.querySelectorAll(".hero-icon");
      const bottomIcons = iconsBottomRef.current?.querySelectorAll(".hero-icon");

      if (!letterI || !letterO || !iGifContainer || !oGifContainer || !titleLines) return;

      // ===== INITIAL STATES =====
      // Hide GIFs initially
      gsap.set([iGifContainer, oGifContainer], { 
        opacity: 0,
        scale: 0.8,
        display: "none"
      });
      
      // Show letters initially
      gsap.set([letterI, letterO], { opacity: 1 });
      
      // Hide subtitle and icons initially
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set([...topIcons!, ...bottomIcons!], { opacity: 0, scale: 0 });

      // ===== MAIN TIMELINE =====
      const tl = gsap.timeline({ delay: 0.2 });

      // 1️⃣ TITLE LINES SLIDE IN
      tl.fromTo(
        titleLines,
        { y: 120 },
        { 
          y: 0, 
          duration: 1.2, 
          ease: "power4.out",
          stagger: 0.1 
        }
      )

      // 2️⃣ "i" ANIMATION SEQUENCE
      // Hide letter I
      .to(letterI, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, "+=0.3")
      
      // Show GIF I
      .call(() => {
        gsap.set(iGifContainer, { display: "flex" });
      })
      .to(iGifContainer, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      
      // Hold GIF I
      .to(iGifContainer, { duration: 1.2 })
      
      // Hide GIF I
      .to(iGifContainer, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(iGifContainer, { display: "none" });
        }
      })
      
      // Show letter I again
      .to(letterI, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")

      // 3️⃣ "o" ANIMATION SEQUENCE
      // Hide letter O
      .to(letterO, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, "+=0.4")
      
      // Show GIF O
      .call(() => {
        gsap.set(oGifContainer, { display: "flex" });
      })
      .to(oGifContainer, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)"
      })
      
      // Hold GIF O
      .to(oGifContainer, { duration: 1.8 })
      
      // Hide GIF O with fade up
      .to(oGifContainer, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(oGifContainer, { display: "none" });
        }
      })
      
      // Show letter O again
      .to(letterO, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")

      // 4️⃣ SUBTITLE
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )

      // 5️⃣ ICONS
      .add(
        gsap.to(
          topIcons,
          {
            opacity: 0.7,
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.7)",
          }
        ),
        "-=0.3"
      )
      .add(
        gsap.to(
          bottomIcons,
          {
            opacity: 0.7,
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.7)",
          }
        ),
        "-=0.5"
      );

      // ===== FLOATING ICONS =====
      gsap.utils.toArray(".float-up, .float-down").forEach((el: any, i) => {
        gsap.to(el, {
          y: el.classList.contains("float-up") ? -15 : 15,
          repeat: -1,
          yoyo: true,
          duration: 2 + (i * 0.3),
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });

      // ===== PARALLAX =====
      if (ScrollTrigger.isTouch !== 1) {
        gsap.to(titleRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: -80,
          opacity: 0.4,
        });
      }

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const topIcons = [
    { Icon: Video, class: "float-up" },
    { Icon: Radio, class: "float-down" },
    { Icon: Palette, class: "float-up" }
  ];

  const bottomIcons = [
    { Icon: Globe, class: "float-down" },
    { Icon: Code, class: "float-up" },
    { Icon: Settings, class: "float-down" }
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Top Icons */}
        <div ref={iconsTopRef} className="flex justify-center gap-8 md:gap-12 mb-8 md:mb-12">
          {topIcons.map(({ Icon, class: className }, i) => (
            <Icon 
              key={i} 
              className={`hero-icon ${className} w-10 h-10 md:w-12 md:h-12 text-foreground/80`} 
            />
          ))}
        </div>

        {/* Title */}
        <div ref={titleRef} className="relative">
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tight text-foreground font-bold">
            {/* First Line */}
            <div className="hero-line overflow-hidden mb-2 md:mb-4">
              MediaMat
              <span 
                ref={letterIWrapperRef}
                className="relative inline-flex w-[1ch] h-[1.2em] items-center justify-center"
              >
                <span className="letter-i text-current">i</span>
                <div className="gif-i absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                  <img 
                    alt="I animation" 
                    src={letterIGif} 
                    className="w-full h-full object-contain min-w-[100%] min-h-[100%]"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
              </span>
              c
            </div>
            
            {/* Second Line */}
            <div className="hero-line overflow-hidden">
              Studi
              <span 
                ref={letterOWrapperRef}
                className="relative inline-flex w-[1.2ch] h-[1.2em] items-center justify-center"
              >
                <span className="letter-o text-current">o</span>
                <div className="gif-o absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                  <img 
                    alt="O animation" 
                    src={finalGif} 
                    className="w-full h-full object-contain min-w-[100%] min-h-[100%]"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
              </span>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-foreground/70 max-w-xl mx-auto font-body">
          Crafting digital experiences that resonate. <br />
          <span className="text-foreground font-semibold">Branding • Design • Strategy</span>
        </p>

        {/* Bottom Icons */}
        <div ref={iconsBottomRef} className="flex justify-center gap-8 md:gap-12 mt-8 md:mt-12">
          {bottomIcons.map(({ Icon, class: className }, i) => (
            <Icon 
              key={i} 
              className={`hero-icon ${className} w-10 h-10 md:w-12 md:h-12 text-foreground/80`} 
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-foreground/50 hover:text-foreground transition-colors group"
          aria-label="Scroll to about section"
        >
          <svg 
            className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round"   
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      </div>
    </section>
  );
};