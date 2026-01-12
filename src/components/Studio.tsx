import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import img1 from "../assets/studio/IMG-20251224-WA0007.jpg";
import img2 from "../assets/studio/IMG_0054.jpg";
import img3 from "../assets/studio/IMG_0067.jpg";
import img4 from "../assets/studio/IMG_0066.jpg";

const galleryItems = [
  { image: img1, text: "Production Suite", size: "md:col-span-2 md:row-span-2" },
  { image: img2, text: "Audio Booth", size: "md:col-span-1 md:row-span-1" },
  { image: img3, text: "Creative Zone", size: "md:col-span-1 md:row-span-1" },
  { image: img4, text: "Collaborative Space", size: "md:col-span-2 md:row-span-1" },
];

export const Studio: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#53131b]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#53131b]/5 rounded-full blur-[120px]" />
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
            <span className="inline-block text-[#53131b]/40 text-sm font-bold tracking-[0.3em] uppercase mb-6">
              Our Creative Hub
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-[#53131b] mb-8 tracking-tight">
              MEDIAMATIC STUDIO
            </h2>
            <div className="w-20 h-1 bg-[#53131b]/20 mx-auto mb-8 rounded-full" />
            <p className="text-xl md:text-2xl text-[#53131b]/70 font-light leading-relaxed max-w-3xl mx-auto">
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
              className={`group relative rounded-[2.5rem] overflow-hidden border border-[#53131b]/10 bg-black/5 ${item.size}`}
            >
              <img
                src={item.image}
                alt={item.text}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Overlay with high performance gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#53131b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold text-xl md:text-2xl tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights Section - Redesigned for impact and performance */}
        <div className="bg-[#53131b] rounded-[3rem] p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
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
                className="px-10 py-4 bg-[#faf3e0] text-[#53131b] rounded-full font-bold text-lg hover:shadow-strong transition-all"
              >
                Experience the Studio
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "4K Post Production",
                "Hi-Fi Audio Recording",
                "Cinematic Lighting",
                "Chroma Key Studio",
                "Motion Graphics Lab",
                "VR Development Zone"
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#faf3e0]" />
                  <span className="text-[#faf3e0] font-bold text-sm lg:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};