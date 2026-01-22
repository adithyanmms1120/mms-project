import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import img1 from "../assets/studio/uukzi2llluqkegeoty7s.webp";
// import img2 from "../assets/studio/bzd1dbdjx8eannngwkxn.webp";
import img3 from "../assets/studio/audio.avif";
import img4 from "../assets/studio/xlvuhl3xqvrxaxswpkaz.webp";

import lightingImg from "../assets/studio/feature-lighting.jpg";
import greenscreenImg from "../assets/studio/feature-greenscreen.jpg";
import postproductionImg from "../assets/studio/feature-postproduction.jpg";
import collaborationImg from "../assets/studio/feature-collaboration.jpg";
import audioImg from "../assets/studio/feature-audio.jpg";

const galleryItems = [
  { image: img1, text: "Production Suite", size: "md:col-span-2 md:row-span-2" },
  { image: img3, text: "Audio Booth", size: "md:col-span-2 md:row-span-1" },
  { image: img4, text: "Collaborative Space", size: "md:col-span-2 md:row-span-1" },
];

const features = [
  { text: "4K Post Production", image: postproductionImg },
  { text: "Hi-Fi Audio Recording", image: audioImg },
  { text: "Cinematic Lighting", image: lightingImg },
  { text: "Green Screen Facilities", image: greenscreenImg },
  { text: "Creative Collaboration Zones", image: collaborationImg },
];

export const Studio: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="studio"
      ref={containerRef}
      className="relative min-h-screen bg-[#faf3e0] py-24 lg:py-32 overflow-hidden"
    >
      {/* Dynamic Background Elements for depth without lag */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#652b32]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#652b32]/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[#652b32]/40 text-sm font-bold tracking-[0.3em] uppercase mb-6">
              Our Creative Hub
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-[#652b32] mb-8 tracking-tight">
              MEDIAMATIC STUDIO
            </h2>
            <div className="w-20 h-1 bg-[#652b32]/20 mx-auto mb-8 rounded-full" />
            <p className="text-xl md:text-2xl text-[#652b32]/70 font-light leading-relaxed max-w-3xl mx-auto">
              A state-of-the-art facility designed to transform your boldest ideas into digital reality through
              innovation and technical excellence.
            </p>
          </motion.div>
        </div>

        {/* Optimized Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px] md:auto-rows-[320px] mb-24">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`group relative rounded-[2.5rem] overflow-hidden border border-[#652b32]/10 bg-black/5 ${item.size}`}
            >
              <img
                src={item.image}
                alt={item.text}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Overlay with high performance gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#652b32]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold text-xl md:text-2xl tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights Section - Redesigned for impact and performance */}
        <div className="bg-[#652b32] rounded-[3rem] p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-4xl md:text-5xl font-black text-[#faf3e0] leading-tight">
                Cutting-Edge <br /> Infrastructure
              </h3>
              <p className="text-lg md:text-xl text-[#faf3e0]/80 leading-relaxed font-medium">
                Our ecosystem provides everything needed for high-end digital output.
                From professional lighting to advanced editing suites, we ensure your
                brand stands at the pinnacle of quality.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }
                }}
                className="px-10 py-4 bg-[#faf3e0] text-[#652b32] rounded-full font-bold text-lg hover:shadow-strong transition-all"
              >
                Connect with us
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredImage(feature.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onMouseMove={handleMouseMove}
                  className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm cursor-pointer transition-all hover:bg-white/20"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#faf3e0]" />
                  <span className="text-[#faf3e0] font-bold text-sm lg:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {hoveredImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 5 }}
                  style={{
                    position: 'fixed',
                    top: mousePos.y + 20,
                    left: mousePos.x + 20,
                    pointerEvents: 'none',
                    zIndex: 100,
                  }}
                  className="w-48 h-32 md:w-64 md:h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 hidden lg:block"
                >
                  <img src={hoveredImage} className="w-full h-full object-cover" alt="Preview" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};