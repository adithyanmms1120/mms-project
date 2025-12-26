import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedinIn } from "react-icons/fa";

import aboutVideo from "../assets/hero_optim.mp4";
import ceoImg from "../assets/zulfikar.png";
import cooImg from "../assets/thasleema.png";
import adminImg from "../assets/reshma.png";

gsap.registerPlugin(ScrollTrigger);

/* =======================
   Animated Text Component
======================= */
interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const words = text.split(" ");

  return (
    <p className={`reveal-text ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top mr-[0.3em] pb-[0.2em]"
        >
          <span className="reveal-word inline-block translate-y-full opacity-0">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
};

/* =======================
        About Section
======================= */
export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const rightContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* 1️⃣ PIN LEFT COLUMN */
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current!,
        pinSpacing: false,
      });

      /* 2️⃣ VIDEO RESIZE */
      gsap.fromTo(
        videoRef.current!,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          x: 0,
          y: 0,
        },
        {
          width: 420,
          height: 260,
          borderRadius: 20,
          x: 60,
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: "top -30%",
            scrub: true,
          },
        }
      );

      /* 3️⃣ TEXT REVEAL */
      const paragraphs =
        rightContentRef.current?.querySelectorAll<HTMLElement>(".reveal-text");

      paragraphs?.forEach((para) => {
        const words = para.querySelectorAll(".reveal-word");

        gsap.to(words, {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: para,
            start: "top 90%",
            end: "bottom 70%",
            scrub: true,
          },
        });
      });

      /* 4️⃣ BLOCK ANIMATIONS */
      gsap.utils
        .toArray<HTMLElement>(".content-block-anim")
        .forEach((block) => {
          gsap.from(block, {
            y: 100,
            opacity: 0,
            scrollTrigger: {
              trigger: block,
              start: "top 95%",
              end: "top 70%",
              scrub: true,
            },
          });
        });

      /* 5️⃣ LEADERSHIP CARDS */
      gsap.from(".leader-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".leaders-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =======================
        DATA
======================= */
  const values = [
    { title: "Integrity", desc: "Doing what’s right, even when no one is watching." },
    { title: "Innovation", desc: "Opening doors to new possibilities." },
    { title: "Teamwork", desc: "Collaborating to achieve greatness." },
    { title: "Reliability", desc: "Delivering measurable results." },
  ];

  const leaders = [
    { name: "Zulfikar S.", role: "Founder & CEO", img: ceoImg, link: "#" },
    { name: "Thasleema N.", role: "Co-Founder & COO", img: cooImg, link: "#" },
    { name: "Reshma S.", role: "Director of Admin", img: adminImg, link: "#" },
  ];

  /* =======================
        JSX
======================= */
  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="dark"
      className="relative bg-[#5a0f1b] text-[#fdf3b7]"
    >
      <div className="flex min-h-screen">

        {/* LEFT */}
        <div ref={leftColRef} className="w-[45vw] h-screen relative">
          <div ref={videoRef} className="absolute inset-0 overflow-hidden">
            <video
              src={aboutVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div ref={rightContentRef} className="w-[55vw] px-16 pt-[100vh]">
          <h2 className="text-5xl font-bold mb-8">MediaMatic Studio</h2>

          <AnimatedText text="MediaMatic Studio Pvt. Ltd. is a one-stop solution for branding and digital experiences." />
          <br />
          <AnimatedText text="We connect ideas with audiences worldwide." />

          <div className="mt-32 grid grid-cols-2 gap-6 leaders-grid">
            {leaders.map((l, i) => (
              <div
                key={i}
                className="leader-card relative h-[360px] rounded-3xl overflow-hidden"
              >
                <img
                  src={l.img}
                  alt={l.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black/80">
                  <h4 className="text-xl font-bold">{l.name}</h4>
                  <p className="text-xs uppercase opacity-80">{l.role}</p>
                  <a href={l.link} className="inline-flex mt-3 gap-2 text-sm">
                    <FaLinkedinIn /> Connect
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
