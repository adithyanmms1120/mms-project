import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Clapperboard, CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "2D Animation Videos",
  "3D Animation Videos",
  "Explainer Videos",
  "Brand Videos",
  "Motion Graphics",
  "Visual Effects (VFX)",
];

const Animation = () => {
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
        <title>2D & 3D Animation Services | MediaMatic Studio</title>
        <meta name="description" content="Transform your business ideas into compelling visual stories with high-quality 2D & 3D animation, explainer videos, branding videos, and motion graphics." />
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
                    <Clapperboard className="w-7 h-7" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/60">Service</span>
                </div>

                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-bold mb-6">
                  2D & 3D <span className="italic font-normal text-primary-foreground/70">Animation</span>
                </h1>

                <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                  Creative studio that helps you go ahead with compelling visual stories.
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
                      At MediaMatic Studio, we are dedicated to transforming your business ideas into compelling visual stories. Our team of creative and young professionals specializes in high-quality 2D & 3D animation videos, explainer videos, branding videos, and more.
                    </p>
                  </div>

                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">2D Animation</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      2D animation is the classic form of animation, dating back to the early days of hand-drawn cartoons. This traditional technique is cherished for its simplicity and charm, making it a timeless favourite among audiences of all ages.
                    </p>
                  </div>

                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">3D Animation</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      In contrast to 2D animation, 3D animation brings characters and environments to life in three-dimensional space. The result is stunningly realistic animations with depth and dimension, immersing viewers in richly detailed worlds.
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

export default Animation;
