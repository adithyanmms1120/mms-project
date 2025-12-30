import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CircularGallery from './CircularGallery'; // Import the CircularGallery component

// Only import images that actually exist
import img1 from "../assets/studio/IMG-20251224-WA0007.jpg";
import img2 from "../assets/studio/IMG_0054.jpg";
import img3 from "../assets/studio/IMG_0067.jpg";
import img4 from "../assets/studio/IMG_0066.jpg";

// Create array with images and text for CircularGallery
const galleryItems = [
  { image: img1, text: "Studio Space 1" },
  { image: img2, text: "Studio Space 2" },
  { image: img3, text: "Studio Space 3" },
  { image: img4, text: "Studio Space 4" },
];

export const Studio: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    // Animate gallery on mount
    gsap.fromTo(
      galleryRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle keyboard navigation for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <section className="min-h-screen bg-[#fdf3b7] text-[#53131b] py-12 lg:py-20"
    id ="studio">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-[#53131b]">
            MediaMatic Studio
          </h1>
          <p className="text-lg lg:text-xl text-[#53131b]/80 max-w-2xl mx-auto">
            Explore our state-of-the-art studio facility where creativity meets innovation
          </p>
        </motion.div>

        {/* Circular Gallery Container */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative rounded-3xl overflow-hidden shadow-2xl mb-8 lg:mb-12 ${
              isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : ""
            }`}
            style={{ height: isFullscreen ? '100vh' : '600px' }}
          >
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#53131b" // Match the site's dark text color
              borderRadius={0.05}
              scrollEase={0.02}
              font="bold 24px sans-serif"
            />
            
            {/* Fullscreen Button */}
            <Button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-[#fdf3b7]/10 backdrop-blur-sm hover:bg-[#fdf3b7]/20 border border-[#fdf3b7]/20 transition-all z-10"
              size="icon"
            >
              <Maximize2 className="h-5 w-5 text-[#fdf3b7]" />
            </Button>
          </motion.div>

          {/* Fullscreen Overlay (if needed for additional controls) */}
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-[#53131b] z-50 flex flex-col p-4 lg:p-8 pointer-events-none"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl lg:text-4xl font-bold text-[#fdf3b7]">
                  Studio Gallery
                </h2>
                <Button
                  onClick={toggleFullscreen}
                  className="bg-[#fdf3b7] text-[#53131b] hover:bg-[#e6d9a5] transition-all pointer-events-auto"
                >
                  Exit Fullscreen
                </Button>
              </div>
            </motion.div>
          )}

          {/* Studio Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-16 bg-gradient-to-br from-[#53131b] to-[#6a1c2b] p-6 lg:p-8 rounded-3xl border border-[#fdf3b7]/20 shadow-xl"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#fdf3b7]">
              Our Creative Space
            </h3>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <p className="text-[#fdf3b7]/90 mb-4">
                  Our studio is designed to foster creativity and collaboration. With 
                  state-of-the-art equipment and a vibrant atmosphere, we bring ideas 
                  to life through innovative solutions.
                </p>
                <p className="text-[#fdf3b7]/90">
                  From video production to photography, our space is equipped to handle 
                  projects of any scale while maintaining the highest quality standards.
                </p>
              </div>
              <div>
                <ul className="space-y-3">
                  {[
                    "4K Video Production Setup",
                    "Professional Photography Studio",
                    "Audio Recording Booth",
                    "Editing Suites",
                    "Client Meeting Area",
                    "Equipment Storage"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-[#fdf3b7]/90"
                    >
                      <div className="w-2 h-2 bg-[#fdf3b7] rounded-full"></div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#53131b]/20 to-[#6a1c2b]/10"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fdf3b7]/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fdf3b7]/10 to-transparent"></div>
      </div>
    </section>
  );
};