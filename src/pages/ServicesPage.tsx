import React, { useEffect } from "react";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <div className="min-h-screen">
            <SEO
                title="Our Services | MediaMatic Studio"
                description="Explore our range of digital services including 2D & 3D animation, content management, web development, designing, and digital marketing."
                canonical="/services/"
            />
            <main>
                <div className="pt-20"> {/* Offset for fixed header */}
                    <Services />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;
