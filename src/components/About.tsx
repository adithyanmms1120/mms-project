import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import CoreValueCard from "@/components/CoreValueCard";
import { FaLinkedinIn } from "react-icons/fa";
import {
  Shield,
  Lightbulb,
  Users,
  CheckCircle,
  Search,
  Target,
  Rocket,
  BarChart3,
  Globe,
  Building2,
  Users2,
  Server,
  Zap,
  LineChart,
} from "lucide-react";

import aboutVideo from "../assets/hero_optim.mp4";
import ceoImg from "../assets/ZU-01.png";
import cooImg from "../assets/TH-01.png";
import adminImg from "../assets/Re-01.png";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* =========================
      VIDEO FULL → CARD
  ========================= */
  useEffect(() => {
    if (isMobile) {
      // On mobile, ensure video plays automatically
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
      return;
    }

    if (!heroRef.current || !videoWrapRef.current || !targetRef.current || !contentRef.current)
      return;

    const ctx = gsap.context(() => {
      const heroBox = heroRef.current!.getBoundingClientRect();
      const targetBox = targetRef.current!.getBoundingClientRect();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=700",
          scrub: true,
          pin: true,
        },
      });

      tl.fromTo(
        videoWrapRef.current,
        {
          width: heroBox.width,
          height: heroBox.height,
          borderRadius: 0,
          x: 0,
          y: 0,
        },
        {
          width: 420,
          height: 260,
          borderRadius: 24,
          x: targetBox.left - heroBox.left,
          y: targetBox.top - heroBox.top,
          ease: "none",
        }
      ).to(contentRef.current, { opacity: 1 }, "-=0.2");
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* =========================
          DATA
  ========================= */
  const values = [
    { icon: Shield, title: "Integrity", description: "Doing what's right, always." },
    { icon: Lightbulb, title: "Innovation", description: "Opening doors to new ideas." },
    { icon: Users, title: "Teamwork", description: "Together we grow." },
    { icon: CheckCircle, title: "Reliability", description: "Delivering results." },
  ];

  const leaders = [
    {
      name: "Zulfikar S",
      role: "Founder & CEO",
      img: ceoImg,
      link: "https://www.linkedin.com/in/szulfikar"
    },
    {
      name: "Thasleema N",
      role: "Co-Founder & COO",
      img: cooImg,
      link: "https://www.linkedin.com/in/thasleema-nasrin-338685330/"
    },
    {
      name: "Reshma S",
      role: "Director of Admin",
      img: adminImg,
      link: "https://www.linkedin.com/in/reshma-s-1b7218276/"
    },
  ];

  const stats = [
    { value: "2+", label: "Branch office " },
    { value: "118+", label: "Web & App Projects" },
    { value: "75+", label: "Corporate Video Shoots" },
    { value: "124+", label: "Digital Marketing" },
  ];

  const vision2026 = [
    { icon: Globe, value: "5+", label: "Global Virtual Office" },
    { icon: Building2, value: "5+", label: "PAN India Channel Partners" },
    { icon: Users2, value: "100+", label: "Corporate Video Shoots" },
    { icon: Rocket, value: "500+", label: "Web & App Projects" },
    { icon: Users, value: "100+", label: "Technical Team" },
    { icon: Server, value: "2000+", label: "Hosting Clients" },
  ];

  const coreValues2026 = [
    {
      icon: Shield,
      title: "Integrity & Transparency",
      description: "Integrity is doing what's right, even when no one is watching."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Adaptability",
      description: "Innovation opens doors, adaptability keeps them open."
    },
    {
      icon: Users,
      title: "Collaboration & Teamwork",
      description: "Teamwork turns dreams into reality."
    },
    {
      icon: CheckCircle,
      title: "Reliability & Accountability",
      description: "True integrity is delivering not just words, but results."
    },
  ];

  const workStages = [
    {
      icon: Search,
      title: "Discovery Phase",
      description: "During this initial stage, we deep dive into understanding the client's business goals, target audience, and market landscape. We conduct thorough research and analysis to identify opportunities and challenges, laying the foundation for a successful campaign."
    },
    {
      icon: Target,  // Fixed: Changed from TargetIcon to Target
      title: "Strategy Development",
      description: "With insights gathered from the discovery phase, we develop a customized strategy tailored to your specific needs and objectives. This comprehensive plan outlines the key tactics, channels, and timelines needed to achieve your business goals effectively."
    },
    {
      icon: Zap,
      title: "Implementation & Execution",
      description: "Once the strategy is finalized and approved, we roll up our sleeves and put the plans into action. Our expert team utilizes cutting-edge tools and techniques to execute each component of the strategy with precision and efficiency,Whether it’s optimizing your website for search engines, crafting engaging social media content, or designing captivating visuals, we focus on delivering results that matter."
    },
    {
      icon: LineChart,
      title: "Monitoring & Optimization",
      description: "Continuous monitoring and optimization are essential to ensure the success and effectiveness of our projects. We closely track key performance indicators (KPIs) and metrics, analysing data to identify areas of improvement and making necessary adjustments to optimize results. This interactive process allows us to adapt changes in the market and maximize the return on your investments."
    },
  ];

  /* =========================
        ANIMATION VARIANTS
  ========================= */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -12,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const leadershipCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow: "0 25px 50px rgba(253, 243, 183, 0.15)",
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const
      }
    }
  };

  const stageCardVariants = {
    hidden: { opacity: 0, y: 50, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: i * 0.1  // Fixed: changed delay to be calculated from i
      }
    }),
    hover: {
      y: -10,
      x: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className="bg-[#652b32] text-primary-foreground relative" id="about">
      {/* Subtle Background Gradient for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

      {/* ================= HERO ================= */}
      <div ref={heroRef} className={`relative ${isMobile ? "min-h-[60vh]" : "min-h-screen"} overflow-hidden bg-[#652b32]`}>
        {/* VIDEO - Mobile responsive behavior */}
        {isMobile ? (
          /* MOBILE VIDEO LAYOUT */
          <div className="container mx-auto px-4 pt-8">
            <div className="text-[#fdf3b7] text-center mb-8">
              <motion.span
                className="text-sm font-semibold tracking-wider"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                About Us
              </motion.span>

              <motion.h1
                className="text-3xl font-extrabold mt-2 mb-4"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                MediaMatic Studio
              </motion.h1>

              <motion.p
                className="text-base mb-6 max-w-xl mx-auto"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                MediaMatic Studio (P)vt. Ltd., (MMS) is your perfect one-stop solution to manage all your Branding Activities.
              </motion.p>
            </div>

            {/* MOBILE VIDEO PLAYER - Simple version */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black/5"
            >
              <video
                ref={videoRef}
                src={aboutVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto aspect-video object-cover"
              />
            </motion.div>

            {/* Content below video on mobile */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-8 text-center"
            >
              <Button asChild className="bg-[#fdf3b7] text-[#652b32] hover:bg-[#e6d9a5] hover:text-[#652b32] shadow-lg hover:shadow-xl transition-all">
                <a href="#studio">
                  Visit Our Studio <ArrowRight className="ml-2" size={20} />
                </a>
              </Button>

              <div className="mt-12">
                <motion.p
                  className="text-base text-[#fdf3b7]/90 mb-4"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  Since our journey began in 2017, we have been passionate about delivering exceptional services focused on connecting ideas to audiences globally.
                </motion.p>

                <motion.p
                  className="text-base text-[#fdf3b7]/90"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  Over the years, we have built a reputation for being innovative, reliable, and committed to excellence.
                </motion.p>
              </div>

              {/* Scroll indicator for mobile */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mt-12 flex flex-col items-center"
              >
                <span className="text-sm text-[#fdf3b7]/70 mb-2">Scroll to explore more</span>
                <ChevronDown className="text-[#fdf3b7]" />
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* DESKTOP LAYOUT */
          <>
            {/* VIDEO */}
            <div
              ref={videoWrapRef}
              className="absolute inset-0 z-10 overflow-hidden"
            >
              <video
                ref={videoRef}
                src={aboutVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>

            {/* HERO CONTENT */}
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0 }}
              className="relative z-20 container mx-auto px-8 h-screen grid lg:grid-cols-2 items-center gap-16"
            >
              {/* TEXT */}
              <div className="text-[#fdf3b7]">
                <motion.span
                  className="text-sm font-semibold tracking-wider"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  About Us
                </motion.span>

                <motion.h1
                  className="text-5xl font-extrabold mt-4 mb-6"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  MediaMatic Studio
                </motion.h1>

                <motion.p
                  className="text-lg mb-4 max-w-xl"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  MediaMatic Studio (P)vt. Ltd., (MMS) is your perfect one-stop solution to manage all your Branding Activities. Since our journey began in 2017, we have been passionately committed to deliver exceptional services focused on connecting ideas to audiences globally.
                </motion.p>

                <motion.p
                  className="text-lg mb-8 max-w-xl"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  Over the years, we have built a reputation for being innovative, reliable, and committed to excellence.
                </motion.p>

                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                  <Button asChild className="bg-[#fdf3b7] text-[#652b32] hover:bg-[#e6d9a5] hover:text-[#652b32] shadow-lg hover:shadow-xl transition-all">
                    <a href="#studio">
                      Visit Our Studio <ArrowRight className="ml-2" size={20} />
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* VIDEO TARGET */}
              <div ref={targetRef} className="hidden lg:block h-[260px]" />
            </motion.div>
          </>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="bg-[#652b32] relative">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-24"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 text-[#fdf3b7] leading-tight">
                  Our Legacy
                </h2>
                <div className="space-y-4 md:space-y-6 text-[#fdf3b7]/90">
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                    MediaMatic Studio, incorporated in 2017 – one of India's eminent startup branding firms, supporting various industries in the field of branding services.
                  </p>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                    MediaMatic Studio is a leading 2D & 3D Animation, Corporate Shoot, Website / App Development & Designing , Digital Marketing, and Content Management company in Coimbatore,India. we also serve clients in USA, Canada, UK, Europe, Middle East, Australia, and India.
                  </p>
                </div>
              </div>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="bg-gradient-to-br from-[#652b32] via-[#6a1c2b] to-[#652b32] p-6 lg:p-8 rounded-3xl border border-[#fdf3b7]/20 hover:border-[#fdf3b7]/40 shadow-xl"
              >
                <h3 className="text-xl lg:text-2xl font-bold mb-6 text-[#fdf3b7]">Our Journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-3 h-3 bg-[#fdf3b7] rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="font-semibold text-[#fdf3b7] group-hover:text-[#fdf3b7] transition-colors">2017</span>
                    <span className="text-[#fdf3b7]/70 group-hover:text-[#fdf3b7] transition-colors">- Start-Up</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-3 h-3 bg-[#fdf3b7] rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="font-semibold text-[#fdf3b7] group-hover:text-[#fdf3b7] transition-colors">2023</span>
                    <span className="text-[#fdf3b7]/70 group-hover:text-[#fdf3b7] transition-colors">- Registered as Proprietorship Firm</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-3 h-3 bg-[#fdf3b7] rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="font-semibold text-[#fdf3b7] group-hover:text-[#fdf3b7] transition-colors">2024</span>
                    <span className="text-[#fdf3b7]/70 group-hover:text-[#fdf3b7] transition-colors">- Registered as Private Limited Company</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-3 h-3 bg-[#fdf3b7] rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="font-semibold text-[#fdf3b7] group-hover:text-[#fdf3b7] transition-colors">2025</span>
                    <span className="text-[#fdf3b7]/70 group-hover:text-[#fdf3b7] transition-colors">- Expanding Operations & Aiming to be a Global Fortune company by 2030.</span>

                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="mb-16 lg:mb-24">
            <h3 className="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-14 text-[#fdf3b7]">
              Our Current Stats
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 ">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <StatsCard {...s} index={i} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* VISION 2026 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-32"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-center mb-8 lg:mb-16 text-[#fdf3b7] uppercase tracking-wider">
              Our 2026 Vision
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {vision2026.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover="hover"
                  className="bg-gradient-to-br from-[#652b32] via-[#6e1e2d] to-[#652b32] p-6 lg:p-8 rounded-[2rem] shadow-xl shadow-black/20 border border-[#fdf3b7]/10 hover:border-[#fdf3b7]/30 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#fdf3b7]/5 rounded-2xl group-hover:bg-[#fdf3b7]/10 transition-colors">
                      <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#fdf3b7] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="text-2xl lg:text-3xl font-black text-[#fdf3b7] tracking-tighter">{item.value}</span>
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-[#fdf3b7]/70 font-medium group-hover:text-[#fdf3b7]/90 transition-colors">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CORE VALUES 2026 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-32"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-center mb-8 lg:mb-16 text-[#fdf3b7] uppercase tracking-wider">
              MMS Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues2026.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover="hover"
                  className="group"
                >
                  <div className="h-full bg-gradient-to-br from-[#652b32] via-[#6e1e2d] to-[#652b32] p-7 md:p-8 rounded-[2.5rem] shadow-xl shadow-black/20 border border-[#fdf3b7]/10 hover:border-[#fdf3b7]/30 transition-all duration-500">
                    <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 group-hover:bg-white/10 transition-all duration-500">
                      <value.icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#fdf3b7] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h4 className="text-xl lg:text-2xl font-black mb-4 text-[#fdf3b7] leading-tight">{value.title}</h4>
                    <p className="text-[#fdf3b7]/60 text-sm md:text-base leading-relaxed group-hover:text-[#fdf3b7]/80 transition-colors">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WORK STRATEGY */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-24"
          >
            <h3 className="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-14 text-[#fdf3b7]">
              Our Strategy of Work
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workStages.map((stage, i) => (
                <motion.div
                  key={stage.title}
                  variants={stageCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover="hover"
                  className="group"
                >
                  <div className="h-full bg-gradient-to-br from-[#652b32] via-[#6a1c2b] to-[#652b32] p-6 rounded-3xl shadow-lg shadow-[#fdf3b7]/10 border border-[#fdf3b7]/20 hover:border-[#fdf3b7]/40 transition-all relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#fdf3b7] via-[#fdf3b7]/50 to-transparent group-hover:from-[#fdf3b7] group-hover:via-[#fdf3b7]/70 group-hover:to-transparent transition-all"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#fdf3b7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="ml-4 relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-[#fdf3b7]/10 to-[#fdf3b7]/5 rounded-lg group-hover:from-[#fdf3b7]/20 group-hover:to-[#fdf3b7]/10 group-hover:scale-110 transition-all duration-300">
                          <stage.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#fdf3b7] group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-sm font-semibold text-[#fdf3b7]/50 group-hover:text-[#fdf3b7] transition-colors">Stage {i + 1}</span>
                      </div>
                      <h4 className="text-lg lg:text-xl font-bold mb-3 text-[#fdf3b7] group-hover:text-[#fdf3b7] transition-colors">{stage.title}</h4>
                      <p className="text-[#fdf3b7]/80 text-sm lg:text-base group-hover:text-[#fdf3b7]/90 transition-colors">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* LEADERSHIP - Fixed to redirect on entire card click */}
          <div className="mb-8">
            <h3 className="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-14 text-[#fdf3b7]">
              Our Leadership
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {leaders.map((l, i) => (
                <motion.div
                  key={l.name}
                  variants={leadershipCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover="hover"
                  className="relative h-72 lg:h-96 rounded-3xl overflow-hidden group border border-[#fdf3b7]/10 shadow-2xl"
                >
                  <a
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                    onClick={(e) => {
                      // Prevent the click from bubbling to parent elements
                      e.stopPropagation();
                    }}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={l.img}
                        alt={l.name}
                        className="w-full h-full object-contain md:object-cover group-hover:md:scale-105 transition-transform duration-700"
                      />
                      {/* Subtle overlay to help text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#652b32]/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>

                    {/* Floating Glass Card for info */}
                    <div className="absolute bottom-4 left-4 right-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:bg-[#fdf3b7]/10 group-hover:border-[#fdf3b7]/30 group-hover:bottom-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-xl lg:text-2xl mb-1 text-[#fdf3b7]">{l.name}</h4>
                          <p className="text-xs lg:text-sm uppercase tracking-[0.1em] text-[#fdf3b7]/80 group-hover:text-[#fdf3b7] transition-colors">{l.role}</p>
                        </div>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#fdf3b7]/10 hover:bg-[#fdf3b7]/20 backdrop-blur-sm border border-[#fdf3b7]/20 hover:border-[#fdf3b7]/40 transition-all flex-shrink-0">
                          <FaLinkedinIn className="w-5 h-5 text-[#fdf3b7]" />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#fdf3b7]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span>Connect Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};