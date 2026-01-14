import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import WebDevelopment from "./pages/services/WebsiteDevelopment";
import Animation from "./pages/services/Animation";
import Content from "./pages/services/ContentManagement";
import Hosting from "./pages/services/WebHosting";
import { Header } from "./components/Header";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* 🔥 THIS LINE FIXES EVERYTHING */}
      <BrowserRouter basename="/remapdemo">
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/animation" element={<Animation />} />
          <Route path="/services/contentmanagement" element={<Content />} />
          <Route path="/services/webhosting" element={<Hosting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
