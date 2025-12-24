import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedinIn } from "react-icons/fa";
import aboutVideo from "../assets/hero_optim.mp4";
// Leader images
import ceoImg from "../assets/zulfikar.png";
import cooImg from "../assets/thasleema.png";
import adminImg from "../assets/reshma.png";

gsap.registerPlugin(ScrollTrigger);

// Helper for splitting text into words (Train/Reveal Effect)
const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <p className={`reveal-text ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.3em] pb-[0.2em]">
          <span className="reveal-word inline-block transform translate-y-full opacity-0">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
};

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PIN THE ENTIRE SECTION
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });

      // 2. VIDEO RESIZE ANIMATION (Full Screen to Box)
      gsap.fromTo(
        videoRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          x: 0,
          y: 0,
        },
        {
          width: 420,
          height: 260, // Fixed height for the video box
          borderRadius: 20,
          x: 60,
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "top -30%", // Finish resizing before content reaches the middle
            scrub: true,
          },
        }
      );

      // 3. TRAIN TEXT REVEAL FOR PARAGRAPHS
      const textParagraphs = rightContentRef.current?.querySelectorAll(".reveal-text");
      textParagraphs?.forEach((para) => {
        const words = para.querySelectorAll(".reveal-word");
        gsap.to(words, {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          scrollTrigger: {
            trigger: para,
            start: "top 90%",
            end: "bottom 70%",
            scrub: 1,
          },
        });
      });

      // 4. BLOCK REVEALS
      const blocks = gsap.utils.toArray(".content-block-anim");
      blocks.forEach((block: any) => {
        gsap.from(block, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: block,
            start: "top 95%",
            end: "top 70%",
            scrub: 1,
          },
        });
      });

      // 5. LEADERSHIP CARDS STAGGER
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

  const values = [
    { title: "Integrity", desc: "Doing what’s right, even when no one is watching." },
    { title: "Innovation", desc: "Opening doors to new possibilities and adapting to stay ahead." },
    { title: "Teamwork", desc: "Collaborating to turn ambitious dreams into reality." },
    { title: "Reliability", desc: "Delivering not just words, but measurable results." },
  ];

  const strategies = [
    { stage: "01", title: "Discovery Phase", desc: "Understanding client business goals, audience, and market landscape." },
    { stage: "02", title: "Strategy Development", desc: "Developing a customized plan with tactics and timelines." },
    { stage: "03", title: "Execution", desc: "Putting the plan into action with cutting-edge tools." },
    { stage: "04", title: "Monitoring", desc: "Tracking KPIs and refining for maximum ROI." },
  ];

  const leaders = [
    { name: "Zulfikar S.", role: "Founder & CEO", img: ceoImg, link: "https://www.linkedin.com/in/szulfikar" },
    { name: "Thasleema N.", role: "Co-Founder & COO", img: cooImg, link: "https://www.linkedin.com/in/thasleema-nasrin-338685330/" },
    { name: "Reshma S.", role: "Director of Admin", img: adminImg, link: "https://www.linkedin.com/in/reshma-s-1b7218276/" },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#5a0f1b] text-[#fdf3b7]">
      <div className="flex flex-col md:flex-row min-h-screen">

        {/* === LEFT COLUMN (PINNED VIDEO) === */}
        <div ref={leftColRef} className="md:w-[45vw] h-screen relative z-20">
          <div ref={videoRef} className="absolute top-0 left-0 bg-black overflow-hidden z-20 origin-top-left">
            <video src={aboutVideo} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80" />
          </div>
          {/* Decorative text that appears after video shrinks */}
          <div className="absolute top-[360px] left-[60px] z-10 hidden lg:block">
            <p className="text-sm tracking-widest uppercase opacity-60 max-w-[300px] leading-relaxed">
              We create digital experiences that resonate with your audience and drive growth.
            </p>
          </div>
        </div>

        {/* === RIGHT COLUMN (SCROLLABLE TEXT) === */}
        <div ref={rightContentRef} className="md:w-[55vw] px-8 md:px-16 pt-[100vh]">

          {/* INTRO */}
          <div className="mb-24 content-block-anim">
            <h2 className="text-[clamp(2rem,4vw,4.5rem)] font-bold leading-tight mb-8">MediaMatic Studio</h2>
            <AnimatedText text="MediaMatic Studio Pvt. Ltd., (MMS) could be a perfect one-stop solution to manage all your Branding Activities. Since our journey began in 2017, the one thing we have been hugely passionate about is always delivering exceptional services focused on connecting ideas to audiences globally." />
            <br />
            <AnimatedText text="And over the years, we have built a reputation for being innovative, reliable, and committed to excellence. Now, MediaMatic Studio is ready to scale new heights on the global stage." />
          </div>

          {/* LEGACY & MISSION */}
          <div className="grid md:grid-cols-2 gap-8 mb-24 content-block-anim">
            <div className="p-6 border border-[#fdf3b7]/20 rounded-2xl hover:bg-[#fdf3b7]/5 transition-colors">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4 opacity-80">Legacy</h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Incorporated in 2017 – India’s eminent start-up supporting global arenas in Animation, Web Development, and Digital Marketing.
              </p>
            </div>
            <div className="p-6 border border-[#fdf3b7]/20 rounded-2xl hover:bg-[#fdf3b7]/5 transition-colors">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4 opacity-80">Growth</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex justify-between"><span>2017</span> <span>Start-Up</span></li>
                <li className="flex justify-between"><span>2024</span> <span>Pvt. Ltd.</span></li>
                <li className="flex justify-between"><span>2030</span> <span>Fortune 500</span></li>
              </ul>
            </div>
          </div>

          {/* VISION 2026 */}
          <div className="mb-24 content-block-anim p-8 bg-gradient-to-br from-[#fdf3b7]/10 to-transparent rounded-[2rem] border border-[#fdf3b7]/10">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-8">2026 Vision</h3>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {[["Global Offices", "5+"], ["App Projects", "500+"], ["Video Shoots", "100+"], ["Clients", "2K+"]].map(([label, val], i) => (
                <div key={i}>
                  <div className="text-4xl font-black mb-1 text-[#fdf3b7]">{val}</div>
                  <div className="text-xs uppercase tracking-widest opacity-60">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CORE VALUES (CARDS) */}
          <div className="mb-24 content-block-anim">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-[#fdf3b7]/20 pb-4">Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-[#fdf3b7] text-[#5a0f1b] hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                  <h4 className="font-bold text-lg uppercase mb-2 group-hover:underline decoration-2 underline-offset-4">{v.title}</h4>
                  <p className="font-medium opacity-90 text-sm leading-snug">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STRATEGY (CARDS) */}
          <div className="mb-32 content-block-anim">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-[#fdf3b7]/20 pb-4">Our Strategy</h3>
            <div className="space-y-4">
              {strategies.map((s, i) => (
                <div key={i} className="group flex items-center gap-6 p-6 rounded-2xl bg-[#fdf3b7]/5 hover:bg-[#fdf3b7] hover:text-[#5a0f1b] transition-all duration-300">
                  <span className="text-3xl font-black opacity-30 group-hover:opacity-100 transition-opacity">{s.stage}</span>
                  <div>
                    <h4 className="text-lg font-bold uppercase leading-none mb-1">{s.title}</h4>
                    <p className="text-xs opacity-70 group-hover:opacity-100">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TEAM / LEADERSHIP (IMAGE CARDS) */}
          <div className="pb-40 content-block-anim">
            <div className="flex items-end justify-between mb-10">
              <h3 className="text-3xl font-bold uppercase tracking-widest">Leadership</h3>
              <div className="hidden md:block h-px w-20 bg-[#fdf3b7]/30 mb-3"></div>
            </div>

            <div className="leaders-grid grid md:grid-cols-2 gap-6 leading-none">
              {leaders.map((leader, i) => (
                <div key={i} className="leader-card group relative h-[380px] rounded-[2rem] overflow-hidden bg-black border border-[#fdf3b7]/20">
                  {/* Background Image */}
                  <img src={leader.img} alt={leader.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#5a0f1b] via-[#5a0f1b]/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-xl font-bold text-white mb-1">{leader.name}</h4>
                    <p className="text-[#fdf3b7] uppercase text-[10px] tracking-[0.2em] mb-4 opacity-90">{leader.role}</p>

                    <a
                      href={leader.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-[#005582] transition-colors"
                    >
                      <FaLinkedinIn /> Connect
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};