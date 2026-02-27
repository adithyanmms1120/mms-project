import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Palette, CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema, generateOrganizationSchema } from "@/utils/seo-schemas";

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Logo Design",
    "Brand Identity",
    "Marketing Visuals",
    "Social Media Graphics",
    "Print Media Design",
    "Brand Guidelines",
];

const Designing = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".service-hero-content > *",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                ".content-block",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".content-section",
                        start: "top 95%",
                    },
                }
            );

            gsap.fromTo(
                ".feature-item",
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".features-list",
                        start: "top 95%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO
                title="Designing Services | MediaMatic Studio"
                description="Design That Tells Your Story. Logos, branding, and marketing visuals crafted to speak directly to your audience. Professional logo design, brand identity, and creative marketing materials."
                canonical="/services/designing/"
                keywords="graphic design, logo design, brand identity, marketing visuals, social media graphics, print media design, brand guidelines, creative design, MediaMatic Studio"
                structuredData={[
                    generateBreadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services/" },
                        { name: "Designing", url: "/services/designing/" }
                    ]),
                    generateServiceSchema({
                        name: "Graphic Design Services",
                        description: "Professional graphic design including logos, brand identity, marketing visuals, and print design."
                    }),
                    generateOrganizationSchema()
                ]}
            />

            <div className="min-h-screen bg-background">
                <main ref={sectionRef}>
                    {/* Hero */}
                    <section className="pt-32 pb-20 bg-primary text-primary-foreground">
                        <div className="container mx-auto px-6">
                            <Link
                                to="/services/"
                                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8"
                            >
                                <ArrowLeft size={18} /> Back
                            </Link>

                            <div className="service-hero-content max-w-4xl">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                                        <Palette className="w-7 h-7" />
                                    </div>
                                    <span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/60">
                                        Service
                                    </span>
                                </div>

                                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold mb-6">
                                    Designing{" "}
                                    <span className="italic font-normal text-primary-foreground/70">
                                        Services
                                    </span>
                                </h1>

                                <p className="text-xl text-primary-foreground/80 max-w-2xl">
                                    Design That Tells Your Story. Logos, branding, and marketing visuals crafted to speak directly to your audience.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <section className="py-20">
                        <div className="container mx-auto px-6 max-w-6xl content-section space-y-14">
                            <div className="content-block">
                                <p className="text-lg text-foreground/70 leading-relaxed">
                                    We create visuals that don't just look good, but also communicate your brand's core values. Our design philosophy is centered around storytelling and audience engagement.
                                </p>
                            </div>

                            <div className="content-block">
                                <h2 className="font-display text-2xl font-bold mb-3">
                                    Logo Design & Branding
                                </h2>
                                <p className="text-foreground/70 leading-relaxed">
                                    Your logo is the face of your business. We design logos that are memorable, versatile, and perfectly aligned with your brand's identity. From color palettes to typography, we build cohesive branding systems.
                                </p>
                            </div>

                            <div className="content-block">
                                <h2 className="font-display text-2xl font-bold mb-3">
                                    Marketing Visuals
                                </h2>
                                <p className="text-foreground/70 leading-relaxed">
                                    Engage your audience with stunning marketing materials. From social media graphics to print advertisements, we craft visuals that drive results and enhance your brand's presence.
                                </p>
                            </div>

                            <div className="content-block">
                                <h2 className="font-display text-2xl font-bold mb-3">
                                    Creative Excellence
                                </h2>
                                <p className="text-foreground/70">
                                    Our team of expert designers uses cutting-edge tools and a deep understanding of design principles to deliver world-class quality in every project.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-xl font-bold mb-6">
                                    Our Designing Services Include
                                </h3>
                                <div className="features-list grid sm:grid-cols-2 gap-4">
                                    {features.map((item, i) => (
                                        <div
                                            key={i}
                                            className="feature-item flex items-center gap-3 p-4 bg-card border rounded-xl"
                                        >
                                            <CheckCircle className="w-5 h-5 text-accent" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center content-block">
                                <button
                                    onClick={() => {
                                        navigate("/");
                                        setTimeout(() => {
                                            document
                                                .getElementById("contact")
                                                ?.scrollIntoView({ behavior: "smooth" });
                                        }, 150);
                                    }}
                                    className="mt-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold"
                                >
                                    Get Started <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Designing;
