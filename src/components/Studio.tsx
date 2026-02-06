import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";

// Gallery images
import img1 from "../assets/studio/uukzi2llluqkegeoty7s.webp";
import img2 from "../assets/studio/bzd1dbdjx8eannngwkxn.webp";
import img3 from "../assets/studio/audio.webp";
import img4 from "../assets/studio/xlvuhl3xqvrxaxswpkaz.webp";
import img5 from "../assets/studio/rhwjndky14xhftqujzc3.webp";

// Feature images
import lightingImg from "../assets/studio/feature-lighting.webp";
import greenscreenImg from "../assets/studio/feature-greenscreen.webp";
import postproductionImg from "../assets/studio/feature-postproduction.webp";
import collaborationImg from "../assets/studio/feature-collaboration.webp";
import audioImg from "../assets/studio/feature-audio.webp";

/* -----------------------------------
   Optimized Image Component
----------------------------------- */
type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}: OptimizedImageProps) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    fetchPriority={priority ? "high" : "auto"}
    draggable={false}
    className={className}
  />
);

/* -----------------------------------
   Data
----------------------------------- */
const galleryItems = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
];

const features = [
  { text: "4K Post Production", image: postproductionImg },
  { text: "Hi-Fi Audio Recording", image: audioImg },
  { text: "Cinematic Lighting", image: lightingImg },
  { text: "Green Screen Facilities", image: greenscreenImg },
  { text: "Creative Collaboration Zones", image: collaborationImg },
];

/* -----------------------------------
   Component
----------------------------------- */
export const Studio: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const x = useMotionValue(0);

  const gallery = useMemo(() => galleryItems, []);
  const featureList = useMemo(() => features, []);

  // Total width of one set of 5 items: (width + gap) * count
  // Using approx values matching our responsive layout
  const SINGLE_SET_WIDTH = gallery.length * (550 + 32);

  const wrappedX = useTransform(x, (latest) => {
    // Snap/Wrap the value to create infinity
    const wrapped = ((latest % SINGLE_SET_WIDTH) - SINGLE_SET_WIDTH) % SINGLE_SET_WIDTH;
    return wrapped;
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
  };

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isDragging) {
        // Slow auto-scroll to the left
        x.set(x.get() - 0.5);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [x, isDragging]);

  return (
    <section
      id="studio"
      ref={containerRef}
      className="relative min-h-screen bg-[#faf3e0] py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Blur */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#652b32]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#652b32]/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-4"
          >
            <span className="text-[#652b32]/40 tracking-[0.2em] md:tracking-[0.3em] font-bold uppercase text-[10px] md:text-sm">
              Our Creative Hub
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#652b32] mt-3 md:mt-6 leading-[1.1]">
              MEDIAMATIC STUDIO
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-[#652b32]/70 mt-4 md:mt-8 max-w-2xl mx-auto leading-relaxed">
              A state-of-the-art facility designed to transform ideas into digital
              reality through innovation and technical excellence.
            </p>
          </motion.div>
        </div>

        {/* Studio Gallery - Truly Infinite Manual Swipe Slider */}
        <div className="relative mb-20 md:mb-32">
          <div className="overflow-hidden bg-[#652b32]/[0.02] py-4 md:py-8">
            <motion.div
              style={{ x: wrappedX }}
              className="flex gap-4 md:gap-8 px-4 cursor-grab active:cursor-grabbing"
              drag="x"
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              onDrag={(e, info) => {
                x.set(x.get() + info.delta.x);
              }}
              dragTransition={{ power: 0.2, timeConstant: 200 }}
            >
              {/* Triple the items to ensure enough coverage during the wrap transition */}
              {[...gallery, ...gallery, ...gallery, ...gallery].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  onDoubleClick={() => setSelectedImage(item.image)}
                  className="relative flex-none w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[350px] md:h-[500px] lg:h-[650px] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-lg md:shadow-2xl select-none"
                >
                  <OptimizedImage
                    src={item.image}
                    alt="Studio Gallery"
                    width={1000}
                    height={800}
                    priority={index < 3}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.5rem] md:rounded-[3rem] pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-3 px-5 py-2.5 bg-[#652b32] text-[#faf3e0] rounded-full shadow-lg"
            >
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="w-1.5 h-1.5 bg-[#faf3e0] rounded-full"
                  />
                ))}
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Infinite Swipe • Double click to zoom
              </span>
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#652b32] rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#faf3e0] leading-tight text-balance">
                Cutting-Edge Infrastructure
              </h3>
              <p className="text-[#faf3e0]/80 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
                Professional lighting, audio, and post-production tools designed
                for premium output and creative excellence.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "auto" });
                    else navigate("/");
                  }}
                  className="group relative px-8 md:px-10 py-3 md:py-4 bg-[#faf3e0] text-[#652b32] rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[#faf3e0]/10 hover:-translate-y-1 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Connect with us
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {featureList.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHoveredImage(feature.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onMouseMove={handleMouseMove}
                  className="bg-white/5 md:bg-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl cursor-pointer flex items-center gap-4 border border-white/10 transition-colors hover:bg-white/[0.15]"
                >
                  <span className="w-2 md:w-2.5 h-2 md:h-2.5 bg-[#faf3e0] rounded-full shadow-[0_0_10px_rgba(250,243,224,0.5)]" />
                  <span className="text-[#faf3e0] font-bold text-sm md:text-base">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Preview */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{
              position: "fixed",
              top: mousePos.current.y + 20,
              left: mousePos.current.x + 20,
              pointerEvents: "none",
              zIndex: 100,
            }}
            className="hidden lg:block w-64 h-40 rounded-xl overflow-hidden shadow-2xl"
          >
            <OptimizedImage
              src={hoveredImage}
              alt="Feature preview"
              width={320}
              height={240}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
            >
              <img
                src={selectedImage}
                alt="Studio Zoomed"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-none"
              />
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors p-2"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
