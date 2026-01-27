import React, { useEffect, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/Hero";

// Lazy load heavy sections
const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Services = lazy(() => import("@/components/Services").then(m => ({ default: m.Services })));
const Studio = lazy(() => import("@/components/Studio").then(m => ({ default: m.Studio })));
const BrandStatement = lazy(() => import("@/components/BrandStatement").then(m => ({ default: m.BrandStatement })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center bg-transparent">
    <div className="w-8 h-8 border-2 border-[#652b32]/20 border-t-[#652b32] rounded-full animate-spin"></div>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior and refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <Studio />
        <BrandStatement />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
