import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutVideo from "../assets/hero_optim.mp4";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=900",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* 🎥 VIDEO: fullscreen → left card */
      tl.fromTo(
        videoRef.current,
        {
          width: "100vw",
          height: "100vh",
          x: 0,
          y: 0,
          borderRadius: 0,
        },
        {
          width: 420,
          height: 260,
          x: 60,
          y: 60,
          borderRadius: 20,
          ease: "power2.out",
        }
      );

      /* 📝 CONTENT comes up earlier */
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.25
      );

      /* 🔤 Heading word animation */
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".about-word") || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
   <section
  ref={sectionRef}
  id="about"
  className="relative min-h-[200vh] bg-[#5a0f1b] text-[#fdf3b7] overflow-hidden"
>
  {/* GRID LAYOUT */}
  <div className="grid grid-cols-[40vw_1fr]">

      {/* 🎥 VIDEO */}
<div className="relative">
  <div
    ref={videoRef}
    className="fixed top-0 left-0 z-20 overflow-hidden shadow-2xl"
    style={{ width: "40vw", height: "100vh" }}
  >
    <div className="w-full h-full relative">
      <video
        src={aboutVideo}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  </div>
</div>


{/* 📝 CONTENT */}
<div
  ref={contentRef}
  className="relative z-10 pt-[36vh] pb-32 opacity-0"
>
  <div className="max-w-5xl px-12">
    <span className="text-xs tracking-[0.35em] opacity-60 uppercase">
      About Us
    </span>

    <h2
      ref={headingRef}
      className="mt-6 mb-14 font-bold leading-[1.05] text-[clamp(2.8rem,6vw,5.4rem)]"
    >
      <span className="about-word inline-block mr-3">We</span>
      <span className="about-word inline-block mr-3">build</span>
      <span className="about-word inline-block mr-3 italic opacity-70">
        cohesive
      </span>
      <span className="about-word inline-block mr-3">brands</span>
      <br />
      <span className="about-word inline-block mr-3">from</span>
      <span className="about-word inline-block mr-3">idea</span>
      <span className="about-word inline-block italic opacity-70">
        to launch
      </span>
    </h2>

    <div className="grid md:grid-cols-2 gap-14">
      <p className="text-xl leading-relaxed opacity-85">
        MediaMatic Studio (MMS) is a one-stop solution for managing complete
        branding activities.
      </p>

      <p className="text-lg leading-relaxed opacity-65">
        Our multidisciplinary team blends strategy, design, and technology.
      </p>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};
