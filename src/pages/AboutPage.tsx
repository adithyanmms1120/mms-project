import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";

// Lazy load sections to avoid heavy bundle
const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Services = lazy(() => import("@/components/Services").then(m => ({ default: m.Services })));
const BrandStatement = lazy(() => import("@/components/BrandStatement").then(m => ({ default: m.BrandStatement })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const SectionLoader = () => (
    <div className="w-full h-40 flex items-center justify-center bg-transparent">
        <div className="w-8 h-8 border-2 border-[#652b32]/20 border-t-[#652b32] rounded-full animate-spin"></div>
    </div>
);

const AboutPage = () => {
    return (
        <>
            <SEO
                title="About Us | MediaMatic Studio"
                description="Learn more about MediaMatic Studio, our journey, vision, and the team driving digital excellence In Coimbatore and beyond."
                canonical="/about-us/"
                keywords="About MediaMatic Studio, Branding Agency Coimbatore, Digital Marketing Team, Web Development Company History"
            />
            <Header />
            <main className="relative overflow-x-hidden pt-20 bg-[#652b32] min-h-screen">
                <Suspense fallback={<SectionLoader />}>
                    <About />
                    <Services />
                    <BrandStatement />
                    <Contact />
                </Suspense>
            </main>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </>
    );
};

export default AboutPage;
