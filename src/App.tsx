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
import Designing from "./pages/services/Designing";
import { Header } from "./components/Header";
import { Contact } from "./components/Contact";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import ClickSpark from "./components/ClickSpark";

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
          <WhatsAppWidget />
        </BrowserRouter>
      </ClickSpark>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
