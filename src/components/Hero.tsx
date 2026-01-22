import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Video, Radio, Globe, Code, Palette, Settings } from "lucide-react";
import letterIGif from "../assets/letter-i.gif";
import letterOGif from "../assets/letter-o.gif";

import MetaBalls from './MetaBalls';

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

  // --------------------script for track ----------------
  useEffect(() => {
    // Prevent duplicate injection
    if ((window as any).__ziInjected) return;
    (window as any).__ziInjected = true;

    (window as any)[
      (function (_Evx, _Vy) {
        var _F8ULL = '';
        for (var _bFZ7sA = 0; _bFZ7sA < _Evx.length; _bFZ7sA++) {
          var _6k42 = _Evx[_bFZ7sA].charCodeAt(0);
          _6k42 -= _Vy;
          _6k42 += 61;
          _6k42 %= 94;
          _6k42 += 33;
          _F8ULL += String.fromCharCode(_6k42);
        }
        return _F8ULL;
      })(atob('bFtiJiN8d3UoXXct'), 18)
    ] = '4b0a2077401742813171';

    const zi = document.createElement('script');
    zi.type = 'text/javascript';
    zi.async = true;

    zi.src = (function (_N5C, _mJ) {
      var _DvyAz = '';
      for (var _D32yf5 = 0; _D32yf5 < _N5C.length; _D32yf5++) {
        var _z2Zo = _N5C[_D32yf5].charCodeAt(0);
        _z2Zo -= _mJ;
        _z2Zo += 61;
        _z2Zo %= 94;
        _z2Zo += 33;
        _DvyAz += String.fromCharCode(_z2Zo);
      }
      return _DvyAz;
    })(atob('cyEhe35FOjp1fjkndDh+bn10eyF+OW56eDondDghbHI5dX4='), 11);

    const appendScript = () => {
      if (!document.body.contains(zi)) {
        document.body.appendChild(zi);
      }
    };

    if (document.readyState === 'complete') {
      appendScript();
    } else {
      window.addEventListener('load', appendScript);
    }

    return () => {
      window.removeEventListener('load', appendScript);
    };
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      const title = titleRef.current;
      if (title) {
        const lines = title.querySelectorAll(".hero-line");

        // Initial state
        gsap.set(lines, { y: 200, opacity: 0, rotateX: -45, overflow: "hidden" });

        // Animate each line
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.8,
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
      });

      // Animate letter "I" to GIF (One time)
      const animateLetterIToGif = () => {
        const timeline = gsap.timeline({ delay: 2.5 });

        timeline.to(letterIRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in"
        });

        timeline.to(gifIRef.current, {
          opacity: 1,
          scale: 0.6,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.2");

        timeline.to({}, { duration: 2 });

        timeline.to(gifIRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
        });

        timeline.to(letterIRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      };

      // Animate letter "O" to GIF (One time)
      const animateLetterOToGif = () => {
        const timeline = gsap.timeline({ delay: 3.2 });

        timeline.to(letterORef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in"
        });

        timeline.to(gifORef.current, {
          opacity: 1,
          scale: 1.6,
          duration: 0.6,
          ease: "back.out(0.7)",
        }, "-=0.2");

        timeline.to({}, { duration: 0.6 });

        timeline.to(gifORef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
        });

        timeline.to(letterORef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      };

      // Start animations
      animateLetterIToGif();
      animateLetterOToGif();

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

      {/* Background Layer 2: MetaBalls */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0">
        <MetaBalls
          color="#9a5a2a"
          cursorBallColor="#faf3e0"
          cursorBallSize={2}
          ballCount={15}
          animationSize={30}
          enableMouseInteraction={false}
          enableTransparency={true}
          hoverSmoothness={0.15}
          clumpFactor={1}
          speed={0.6}
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
          className="font-display text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-tight text-foreground font-bold"
        >
          <span className="hero-line block">
            <span className="inline-block relative">
              MediaMat
              <span className="relative inline-block">
                <span ref={letterIRef} className="inline-block">i</span>
                <div
                  ref={gifIRef}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    width: "1em",
                    height: "1em",
                  }}
                >
                  <img
                    src={letterIGif}
                    alt="Animated I"
                    className="w-full h-full object-contain max-w-none"
                  />
                </div>
              </span>
              c
            </span>
          </span>
          <span className="hero-line block">
            <span className="inline-block relative">
              Studi
              <span className="relative inline-block">
                <span ref={letterORef} className="inline-block">o</span>
                <div
                  ref={gifORef}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    width: "1em",
                    height: "1em",
                  }}
                >
                  <img
                    src={letterOGif}
                    alt="Animated O"
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
        </button>
      </div>
    </section>
  );
};