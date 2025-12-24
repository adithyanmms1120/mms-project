import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DigitalMarketing } from "./services/DigitalMarketing";
import { WebDevelopment } from "./services/WebsiteDevelopment&Designing";
import  Animation from "./services/2D&3DAnimationVideos";
import  Content from "./services/ContentManagement";
import Hosting  from "./services/WebHostingService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/animation" element={<Animation />} />
          <Route path="/services/content" element={<Content />} />
          <Route path="/services/hosting" element={<Hosting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
