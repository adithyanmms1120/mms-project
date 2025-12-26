import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Megaphone, CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Search Engine Optimization (SEO)",
  "Social Media Marketing (SMM)",
  "Search Engine Marketing (SEM)",
  "Email Marketing Campaigns",
  "Google Ads Management",
  "Content Marketing",
];

const DigitalMarketing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-hero-content > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.3 }
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
          scrollTrigger: { trigger: ".features-list", start: "top 85%" },
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
          scrollTrigger: { trigger: ".content-blocks", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Digital Marketing Services | MediaMatic Studio</title>
        <meta name="description" content="Data-driven digital marketing solutions including SEO, SMM, SEM, email marketing, and Google Ads that increase conversions, engagement, and visibility." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main ref={sectionRef}>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/30 blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors"
              >
                <ArrowLeft size={18} /> Back to Home
              </button>

              <div className="service-hero-content max-w-4xl">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <Megaphone className="w-7 h-7" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/60">Service</span>
                </div>

                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-bold mb-6">
                  Digital <span className="italic font-normal text-primary-foreground/70">Marketing</span>
                </h1>

                <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                  Explore your company with MediaMatic Studio and watch your business grow exponentially.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                {/* Left - Description */}
                <div className="content-blocks space-y-8">
                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">What We Do</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      MediaMatic Studio is the right place to settle your mind and be confident that your digital marketing and SEO needs will be properly taken care of. We have expertise in all digital networking channels including Instagram, YouTube, Google, and email marketing.
                    </p>
                  </div>

                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">SEO Excellence</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      We know the right keywords, backlinks, and formats to use for your content to rank high on Google and other search engines. We are experts in SEO (Search Engine Optimization), the only brand that can intelligently leverage SEO to get your content perfect ranking.
                    </p>
                  </div>

                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">Why Choose Us</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      We provide data-driven digital marketing solutions that increase conversions, engagement, and visibility. With expertise in SEO, SMO, SEM, SMM, our team creates tactics specific to your target audience. Measurable growth and long-term success are guaranteed.
                    </p>
                  </div>
                </div>

                {/* Right - Features */}
                <div>
                  <h3 className="font-display text-xl font-bold mb-8">Our Services Include</h3>
                  <div className="features-list space-y-4">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="feature-item flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/#contact")}
                    className="mt-8 flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:shadow-strong transition-all"
                  >
                    Get Started <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DigitalMarketing;
