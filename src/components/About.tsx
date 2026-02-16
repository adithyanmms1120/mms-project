import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

import aboutImg from "@/assets/about.png";
import ceoImg from "../assets/ZU-01.webp";
import cooImg from "../assets/TH-01.webp";
import adminImg from "../assets/Re-01.webp";



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
    icon: Target,
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

export const About = () => {
  /* =========================
      HERO SECTION (Simplified)
  ========================= */

  /* =========================
      VIDEO FULL → CARD
  ========================= */


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
        delay: i * 0.1
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



  /* =========================
      SCROLL ON MOUNT
  ========================= */
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about") {
      setTimeout(() => {
        const el = document.getElementById("about");
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 500); // Delay to ensure rendering
    }
  }, [location]);

  return (
    <section className="bg-[#652b32] text-primary-foreground relative z-0" id="about">


      {/* ================= HERO ================= */}
      <div className="relative">



        <div className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="text-sm font-semibold tracking-wider text-[#fdf3b7]">
              About Us
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 mb-6 leading-tight text-[#fdf3b7]">
              MediaMatic Studio
            </h1>

            <p className="text-lg mb-6 max-w-xl text-[#fdf3b7]/90">
              MediaMatic Studio (P)vt. Ltd., (MMS) is your perfect one-stop solution to manage all your Branding Activities. Since our journey began in 2017, we have been passionately committed to deliver exceptional services focused on connecting ideas to audiences globally.
            </p>

            <p className="text-lg mb-8 max-w-xl text-[#fdf3b7]/90">
              Over the years, we have built a reputation for being innovative, reliable, and committed to excellence.
            </p>

            <Button asChild className="bg-[#fdf3b7] text-[#652b32] hover:bg-[#e6d9a5] hover:text-[#652b32] shadow-lg hover:shadow-xl transition-all">
              <a href="#studio">
                Visit Our Studio <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Rounded Card */}
            <div className="relative">
              <img
                src={aboutImg}
                alt="MediaMatic Studio"
                className="w-[350px] md:w-[420px] rounded-[30px] object-cover"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
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
                className="bg-[#652b32] p-6 lg:p-8 rounded-3xl border border-[#fdf3b7]/20 hover:border-[#fdf3b7]/40 shadow-xl"
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
          <div className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-10 text-[#fdf3b7]">
              Our Current Stats
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8 ">
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
            className="mb-12 lg:mb-20"
          >
            <h3 className="text-2xl md:text-3xl lg:text-3xl font-black text-center mb-6 lg:mb-10 text-[#fdf3b7] uppercase tracking-wider">
              Our 2026 Vision
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {vision2026.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover="hover"
                  className="bg-[#652b32] p-6 lg:p-8 rounded-[2rem] shadow-xl shadow-black/20 border border-[#fdf3b7]/10 hover:border-[#fdf3b7]/30 transition-all group"
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
            className="mb-12 lg:mb-20"
          >
            <h3 className="text-2xl md:text-3xl lg:text-3xl font-black text-center mb-6 lg:mb-10 text-[#fdf3b7] uppercase tracking-wider">
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
                  <div className="h-full bg-[#652b32] p-7 md:p-8 rounded-[2.5rem] shadow-xl shadow-black/20 border border-[#fdf3b7]/10 hover:border-[#fdf3b7]/30 transition-all duration-500 will-change-transform transform-gpu">
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
            className="mb-12 lg:mb-16"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-10 text-[#fdf3b7]">
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
                  <div className="h-full bg-[#652b32] p-6 rounded-3xl shadow-lg shadow-[#fdf3b7]/10 border border-[#fdf3b7]/20 hover:border-[#fdf3b7]/40 transition-all relative overflow-hidden">
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
                      <p className="text-[#fdf3b7]/80 text-base md:text-lg lg:text-xl group-hover:text-[#fdf3b7]/90 transition-colors">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* BRAND JOURNEY SECTION - REDESIGNED TO MATCH CORE VALUES STYLE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-20 bg-[#652b32] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl shadow-black/20 border border-[#fdf3b7]/10 hover:border-[#fdf3b7]/30 transition-all duration-500"
          >


            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
              <div className="flex-1">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-yellow-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 block"
                >
                  Shape Something Remarkable
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-black text-[#fdf3b7] leading-[1.1] tracking-tighter mb-6"
                >
                  Build a Brand <br /> That Speaks
                </motion.h3>
              </div>

              <div className="flex-1 space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-[#fdf3b7]/80 leading-relaxed font-medium"
                >
                  Mediamatic Studio builds meaningful brands through strategy, design, content, and digital experiences that drive business growth.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg font-bold text-[#fdf3b7]/90"
                >
                  If you’re ready to shape something remarkable, let’s talk.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-6 pt-4"
                >
                  <Link
                    to="/get-quote/"
                    className="px-6 py-4 rounded-xl font-bold bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#652b32] transition-all duration-300 uppercase tracking-widest text-xs"
                  >
                    Start Your Brand Journey
                  </Link>
                  <a
                    href="https://www.paypal.com/ncp/payment/Q54LAB9Y3BBLS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-8 py-4 rounded-xl font-bold bg-yellow-400 text-[#652b32] shadow-[0_5px_0_#9a7d0a] hover:shadow-[0_3px_0_#9a7d0a] hover:translate-y-[2px] active:shadow-none active:translate-y-[5px] transition-all duration-150 uppercase tracking-widest text-xs text-center"
                  >
                    Pay Now
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* LEADERSHIP */}
          <div className="mb-0">
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
                        width="400"
                        height="500"
                        loading="lazy"
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