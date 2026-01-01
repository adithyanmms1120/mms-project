import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import img1 from "../assets/studio/IMG-20251224-WA0007.jpg";
import img2 from "../assets/studio/IMG_0054.jpg";
import img3 from "../assets/studio/IMG_0067.jpg";
import img4 from "../assets/studio/IMG_0066.jpg";

// Create array with images and text
const galleryItems = [
  { image: img1, text: "Studio Space 1", size: "col-span-1 md:col-span-2 row-span-2" },
  { image: img2, text: "Studio Space 2", size: "col-span-1 md:col-span-1 row-span-1" },
  { image: img3, text: "Studio Space 3", size: "col-span-1 md:col-span-1 row-span-1" },
  { image: img4, text: "Studio Space 4", size: "col-span-1 md:col-span-2 row-span-1" },
];

export const Studio: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optional: Add parallel scroll effect for background elements
  }, []);

  return (
    <section
      id="studio"
      className="relative min-h-screen bg-[#fdf3b7] text-[#53131b] py-20 lg:py-28 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-display font-bold text-[#53131b]"
          >
            MediaMatic Studio
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#53131b] mx-auto rounded-full w-24"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-[#53131b]/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A playground for creativity. Explore our state-of-the-art facility where ideas come to life.
          </motion.p>
        </div>

        {/* Bento Grid Gallery - Optimized replacing heavy 3D gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] mb-20">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 will-change-transform ${item.size}`}
            >
              <img
                src={item.image}
                alt={item.text}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[#fdf3b7] font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Split Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#53131b] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#fdf3b7]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative z-10"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#fdf3b7]">
              Our Creative Space
            </h3>
            <p className="text-[#fdf3b7]/80 text-lg leading-relaxed">
              Our studio is designed to foster creativity and collaboration. With
              state-of-the-art equipment and a vibrant atmosphere, we bring ideas
              to life through innovative solutions.
            </p>
            <a href="#contact" className="inline-block">
              <button className="bg-[#fdf3b7] text-[#53131b] hover:bg-white transition-colors rounded-full px-8 py-3 font-semibold">
                Book a Tour
              </button>
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 relative z-10">
            {[
              "4K Video Production",
              "Audio Recording Booth",
              "Professional Lighting",
              "Editing Suites",
              "Green Screen",
              
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-[#fdf3b7]/10 p-4 rounded-xl backdrop-blur-sm border border-[#fdf3b7]/10"
              >
                <div className="w-2 h-2 rounded-full bg-[#fdf3b7]" />
                <span className="text-[#fdf3b7] font-medium text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Subtle Background Grain/Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    </section>
  );
};