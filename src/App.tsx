import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import ClickSpark from "./components/ClickSpark";

// Lazy loading pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DigitalMarketing = lazy(() => import("./pages/services/DigitalMarketing"));
const WebDevelopment = lazy(() => import("./pages/services/WebsiteDevelopment"));
const Animation = lazy(() => import("./pages/services/Animation"));
const Content = lazy(() => import("./pages/services/ContentManagement"));
const Hosting = lazy(() => import("./pages/services/WebHosting"));
const Designing = lazy(() => import("./pages/services/Designing"));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#faf3e0] z-50">
    <div className="w-12 h-12 border-4 border-[#652b32] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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

        <BrowserRouter basename="/">
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/designing" element={<Designing />} />
              <Route path="/services/animation" element={<Animation />} />
              <Route path="/services/contentmanagement" element={<Content />} />
              <Route path="/services/webhosting" element={<Hosting />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppWidget />
        </BrowserRouter>
      </ClickSpark>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
