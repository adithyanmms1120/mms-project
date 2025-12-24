import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutVideo from "../assets/hero_optim.mp4";

gsap.registerPlugin(ScrollTrigger);

// Helper for splitting text into words (Train Effect)
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
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Main Scroll Layout Manager
      // We pin the section but allow inner scrolling via sticky positioning in CSS
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Video Morph Logic (Optional: fine-tune if needed, keeping simple for now)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500",
        scrub: 1,
        animation: gsap.fromTo(
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
            height: 260,
            borderRadius: 20,
            x: 60,
            y: 60,
            ease: "power2.out",
          }
        )
      });

      // Reveal Left Content (Under Video)
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=200",
            toggleActions: "play reverse play reverse"
          }
        }
      );


      /* 🔤 Heading Animation */
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll(".about-word"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            }
          }
        );
      }

      /* ✨ Train Text Reveal - Right Column */
      const textParagraphs = rightContentRef.current?.querySelectorAll(".reveal-text");
      textParagraphs?.forEach((para) => {
        const words = para.querySelectorAll(".reveal-word");
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.01,
          ease: "power3.out",
          scrollTrigger: {
            trigger: para,
            start: "top 85%",
            end: "bottom 70%",
            scrub: 1,
          },
        });
      });

      /* ↘️ Content Slide In from Right-Bottom (Parallax feel) */
      const contentCards = rightContentRef.current?.querySelectorAll(".content-block-anim");
      contentCards?.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, x: 100, y: 100 }, // From Bottom Right
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 60%",
              scrub: 1, // Parallax effect on scroll
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#5a0f1b] text-[#fdf3b7] overflow-hidden"
    >
      <div className="flex flex-col md:flex-row min-h-screen">

        {/* === LEFT COLUMN (STICKY) === */}
        <div
          ref={leftColRef}
          className="md:w-[45vw] h-screen sticky top-0 flex flex-col z-20 pointer-events-none md:pointer-events-auto"
        >
          {/* Video Container */}
          <div className="relative w-full h-full">
            <div
              ref={videoRef}
              className="absolute top-0 left-0 bg-black overflow-hidden shadow-2xl z-20 origin-top-left"
              style={{ width: "100%", height: "100%" }}
            >
              <video
                src={aboutVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Text Under Video */}
            <div
              ref={leftContentRef}
              className="absolute top-[360px] left-[60px] right-[40px] z-10 opacity-0"
            >
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 opacity-80">
                Where Art Meets Strategy
              </h3>
              <p className="text-lg opacity-70 leading-relaxed font-light">
                We believe in the power of visual storytelling. By combining data-driven strategy with world-class design, we create brands that don't just stand out—they stand for something.
              </p>
              <div className="mt-8 flex gap-4">
                <div className="h-[1px] w-12 bg-[#fdf3b7] opacity-50 my-auto"></div>
                <span className="text-sm tracking-widest uppercase opacity-60">Est. 2017</span>
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN (SCROLLABLE) === */}
        <div className="md:w-[55vw] relative z-10 flex flex-col">
          {/* Spacer to push content down so it starts appearing as video shrinks */}
          <div className="h-[40vh] w-full"></div>

          <div
            ref={rightContentRef}
            className="px-8 md:px-16 pb-32 opacity-100"
          >
            <span className="inline-block text-xs tracking-[0.35em] opacity-60 uppercase mb-8 ml-1">
              About Us
            </span>

            <h2
              ref={headingRef}
              className="mb-16 font-bold leading-[1.05] text-[clamp(2.5rem,4.5vw,4.5rem)]"
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

            {/* MAIN INTRODUCTION */}
            <div className="space-y-10 text-lg leading-relaxed opacity-90 mb-24 content-block-anim">
              <AnimatedText text="MediaMatic Studio Pvt. Ltd., (MMS) could be a perfect one-stop solution to manage all your Branding Activities. Since our journey began in 2017, the one thing we have been hugely passionate about is always delivering exceptional services focused on connecting ideas to audiences globally." />

              <AnimatedText text="And over the years, we have built a reputation for being innovative, reliable, and committed to excellence. This milestone marked a new chapter in our journey, allowing us to streamline operations and offer our clients the best branding service. While our progression has been steady, it has been fuelled by a crystal-clear vision and unwavering dedication to meeting the evolving needs of our clients." />

              <AnimatedText text="Now, MediaMatic Studio is ready to scale new heights. We are taking our expertise to the global stage, ensuring businesses and individuals worldwide can benefit from our top-notch Branding service." />
            </div>

            {/* LEGACY */}
            <div className="content-block-anim mb-16 p-10 rounded-3xl bg-[#fdf3b7]/5 border border-[#fdf3b7]/10 backdrop-blur-sm hover:bg-[#fdf3b7]/10 transition-colors duration-500">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 opacity-80 border-b border-[#fdf3b7]/20 pb-4">
                Legacy
              </h3>
              <AnimatedText className="text-lg opacity-85" text="MediaMatic Studio, incorporated in 2017 – one of India’s eminent start-up Branding firms supporting the arena in fields of Branding Services. MediaMatic Studio is one of the best leading 2D & 3D Animation, Corporate Shoot, Website & App Development & Designing, Digital Marketing, Content Management Company in Coimbatore, majorly supporting clients in USA, Canada, UK, Europe, Middle East, Australia and India." />
            </div>

            {/* MISSION */}
            <div className="content-block-anim mb-12 p-10 rounded-3xl bg-[#fdf3b7]/5 border border-[#fdf3b7]/10 backdrop-blur-sm hover:bg-[#fdf3b7]/10 transition-colors duration-500">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 opacity-80 border-b border-[#fdf3b7]/20 pb-4">
                Our Mission
              </h3>
              <ul className="space-y-5 font-mono text-lg opacity-80">
                <li className="flex gap-6 items-baseline"><span className="font-bold min-w-[60px] text-[#fdf3b7]">2017</span> <span>Start-Up</span></li>
                <li className="flex gap-6 items-baseline"><span className="font-bold min-w-[60px] text-[#fdf3b7]">2023</span> <span>Registered as Properiatorship Firm</span></li>
                <li className="flex gap-6 items-baseline"><span className="font-bold min-w-[60px] text-[#fdf3b7]">2024</span> <span>Registered as Private Limited Company</span></li>
                <li className="flex gap-6 items-baseline"><span className="font-bold min-w-[60px] text-[#fdf3b7]">2025</span> <span>Aiming to be one of the Global Fortune Company by 2030</span></li>
              </ul>
            </div>

            {/* VISION 2026 */}
            <div className="content-block-anim mb-16 p-10 rounded-3xl bg-[#fdf3b7]/5 border border-[#fdf3b7]/10 backdrop-blur-sm hover:bg-[#fdf3b7]/10 transition-colors duration-500">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-8 opacity-80 border-b border-[#fdf3b7]/20 pb-4">
                Our 2026 Vision
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-lg opacity-85">
                {[
                  ["Global Virtual Office", "5+"],
                  ["PAN India Locations", "5+"],
                  ["Corporate Video Shoots", "100+"],
                  ["Web & App Projects", "500+"],
                  ["Tech Support Team", "100+"],
                  ["Technical Team", "100+"],
                  ["Hosting Clients", "2000+"]
                ].map(([label, val], i) => (
                  <div key={i} className="flex justify-between items-center border-b border-[#fdf3b7]/10 pb-2 group">
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{label}</span>
                    <span className="font-bold text-[#fdf3b7]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CORE VALUE */}
            <div className="mb-24 content-block-anim">
              <div className="flex items-baseline justify-between mb-10 border-b border-[#fdf3b7]/20 pb-4">
                <h3 className="text-2xl font-bold uppercase tracking-widest opacity-80">
                  MMS Core Value
                </h3>
                <span className="font-mono opacity-50">2026</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "Integrity & Transparency", desc: "Integrity is doing what’s right, even when no one is watching." },
                  { title: "Innovation & Adaptability", desc: "Innovation opens doors, adaptability keeps them open." },
                  { title: "Collaboration & Teamwork", desc: "Teamwork turns dreams into reality." },
                  { title: "Reliability & Accountability", desc: "True integrity is delivering not just words, but results." }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-[#fdf3b7]/5 border border-[#fdf3b7]/10 hover:bg-[#fdf3b7]/10 transition-all duration-300 hover:-translate-y-2">
                    <h4 className="text-xl font-bold text-[#fdf3b7] mb-3">{item.title}</h4>
                    <p className="opacity-70 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* STRATEGY */}
            <div className="content-block-anim mb-20">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-12 opacity-80 border-b border-[#fdf3b7]/20 pb-4">
                Our Strategy of Work
              </h3>
              <div className="space-y-12 relative border-l-2 border-[#fdf3b7]/20 pl-8 ml-4">
                {[
                  { stage: "Stage 1", title: "Discovery Phase", desc: "Understanding guidelines, goals, and market landscape. Research and analysis to set the foundation." },
                  { stage: "Stage 2", title: "Strategy Development", desc: "Customized strategy tailored to specific needs. Outlining tactics, channels, and timelines." },
                  { stage: "Stage 3", title: "Implementation", desc: "Executing the plan with precision. Optimizing search engines, crafting content, and designing visuals." },
                  { stage: "Stage 4", title: "Monitoring", desc: "Tracking KPIs and metrics. Analyzing data for improvement and maximizing ROI." }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[45px] top-0 h-6 w-6 rounded-full bg-[#5a0f1b] border-2 border-[#fdf3b7] z-10 group-hover:bg-[#fdf3b7] transition-colors duration-300"></span>
                    <div className="p-8 rounded-3xl bg-[#fdf3b7]/5 border border-[#fdf3b7]/10 hover:bg-[#fdf3b7]/10 transition-all duration-300 hover:pl-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#fdf3b7]/60 block mb-2">{item.stage}</span>
                      <h4 className="text-xl font-bold text-[#fdf3b7] mb-4">{item.title}</h4>
                      <p className="opacity-80 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
