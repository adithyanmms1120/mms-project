import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "./components/Header";
import GetQuote from "./pages/GetQuote";
// import { WhatsAppWidget } from "./components/WhatsAppWidget"; // Removed to lazy load
import ClickSpark from "./components/ClickSpark";
import { CookieConsent } from "./components/CookieConsent";

// Helper for robust lazy loading in production (handles chunk loading failures)
const robustLazy = (componentImport: () => Promise<any>) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error("Chunk loading failed:", error);
      // Check if we've already tried to reload in the last 10 seconds to avoid loops
      const lastReload = sessionStorage.getItem("chunk-error-reload");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload) > 10000) {
        sessionStorage.setItem("chunk-error-reload", now.toString());
        window.location.reload();
      }
      throw error;
    }
  });

// Lazy loading pages with robust error handling
const Index = robustLazy(() => import("./pages/Index"));
const NotFound = robustLazy(() => import("./pages/NotFound"));
const DigitalMarketing = robustLazy(() => import("./pages/services/DigitalMarketing"));
const SEOServices = robustLazy(() => import("./pages/services/SEOServices"));
const SMOServices = robustLazy(() => import("./pages/services/SMOServices"));
const SMMServices = robustLazy(() => import("./pages/services/SMMServices"));
const SEMServices = robustLazy(() => import("./pages/services/SEMServices"));
const WebDevelopment = robustLazy(() => import("./pages/services/WebsiteDevelopment"));
const Animation = robustLazy(() => import("./pages/services/Animation"));
const Content = robustLazy(() => import("./pages/services/ContentManagement"));
const Hosting = robustLazy(() => import("./pages/services/WebHosting"));
const Designing = robustLazy(() => import("./pages/services/Designing"));
const ServiceSubPage = robustLazy(() => import("./pages/services/ServiceSubPage"));
const Contact = robustLazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const WhatsAppWidget = robustLazy(() => import("./components/WhatsAppWidget").then(m => ({ default: m.WhatsAppWidget })));
const BlogList = robustLazy(() => import("./pages/Blog/BlogList"));
const BlogPost = robustLazy(() => import("./pages/Blog/BlogPost"));
const AboutPage = robustLazy(() => import("./pages/AboutPage"));
const ServicesPage = robustLazy(() => import("./pages/ServicesPage"));

const PodcastStudioPage = robustLazy(() => import("./pages/coimbatorePodcast"));


const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#faf3e0] z-50">
    <div className="w-12 h-12 border-4 border-[#652b32] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import ScrollToHash from "./components/ScrollToHash";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <ClickSpark
          sparkColor='#9a5a2a'
          sparkSize={11}
          sparkRadius={20}
          sparkCount={9}
          duration={300}
        >
          <Toaster />
          <Sonner />

          <BrowserRouter
            basename="/"
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <ScrollToHash />
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services/" element={<ServicesPage />} />
                <Route path="/contact/" element={<Contact />} />

                <Route path="/services/digital-marketing-agency/" element={<DigitalMarketing />} />
                <Route path="/search-engine-optimization-company/" element={<SEOServices />} />
                <Route path="/social-media-optimization-company/" element={<SMOServices />} />
                <Route path="/social-media-marketing-company/" element={<SMMServices />} />
                <Route path="/search-engine-marketing-company/" element={<SEMServices />} />
                <Route path="/services/website-development-agency/" element={<WebDevelopment />} />
                <Route path="/services/designing/" element={<Designing />} />
                <Route path="/services/animation/" element={<Animation />} />
                <Route path="/services/contentmanagement/" element={<Content />} />
                <Route path="/services/webhosting/" element={<Hosting />} />
                <Route path="/services/:serviceSlug/:subSlug/" element={<ServiceSubPage />} />
                <Route path="/podcast-recording-studio-in-Coimbatore/" element={<PodcastStudioPage />} />
                <Route path="/blog/" element={<BlogList />} />
                <Route path="/blog/:slug/" element={<BlogPost />} />
                <Route path="/contact-us/" element={<GetQuote />} />
                <Route path="/about-us/" element={<Navigate to="/#about" replace />} />
                <Route path="/get-quote" element={<GetQuote />} />
                <Route path="/get-quote/" element={<GetQuote />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Suspense fallback={null}>
              <WhatsAppWidget />
            </Suspense>
            <CookieConsent />
          </BrowserRouter>
        </ClickSpark>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
