import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "SEO-Friendly Content",
  "Web Copywriting",
  "Social Media Content",
  "Technical Documentation",
  "Blog Posts & Articles",
  "Brand-Building Content",
];

const ContentManagement = () => {
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
        <title>Content Management Services | MediaMatic Studio</title>
        <meta name="description" content="Expert content writing services including SEO-friendly content, web copywriting, social media content, and technical documentation that connects your brand with audiences." />
      </Helmet>

      <div className="min-h-screen bg-background">

        <main ref={sectionRef}>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/30 blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <div className="service-hero-content max-w-4xl">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/60">Service</span>
                </div>

                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-bold mb-6">
                  Content <span className="italic font-normal text-primary-foreground/70">Management</span>
                </h1>

                <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                  Expert content writers delivering high-quality content writing services.
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
                    <p className="text-foreground/70 leading-relaxed mb-4">
                      At MediaMatic Studio, we specialize in providing the best content writing services tailored to our client's needs. Our team of experienced writers excels in crafting high-quality, SEO-friendly content, web copywriting, and engaging social media content that will captivate target audience and drive results.
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      Whether you're looking for marketing copywriting, technical content, blog posts, or brand-building content, we've got you covered. At MediaMatic Studio, we don’t just create content; we craft stories that connect our client's brand with its target audience.
                    </p>
                  </div>

                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">Creative & Customized Content</h2>
                    <p className="text-foreground/70 leading-relaxed mb-4">
                      From blog posts and social media content to SEO articles and technical documentation, we provide tailored solutions for every business need.
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      At MediaMatic Studio, we emphasize client satisfaction as much as possible. We connect with our clients to understand their vision, brand voice, and the target audience—the most important factors that will allow us to deliver the most relatable content. Whether you have just started and want to establish a strong presence or are an already established brand looking to extend your digital footprint, we provide customized solutions to meet your specific needs.
                    </p>
                  </div>

                  <div className="content-block">
                    <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-foreground/60 border-l-4 border-accent pl-6 italic">
                      Our mission is simple: to deliver compelling, high-quality content that drives results. Whether you're a start-up or an established brand, we help you communicate your message effectively and convert interest into sales.
                    </p>
                  </div>
                </div>

                {/* Right - Features & Why Choose Us */}
                <div className="space-y-12">
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
                  </div>

                  <div className="content-block">
                    <h3 className="font-display text-xl font-bold mb-6">Why Choose Us?</h3>
                    <div className="space-y-6">
                      <div className="bg-card p-5 rounded-xl border border-border">
                        <h4 className="font-semibold text-lg mb-2">Expert Team</h4>
                        <p className="text-foreground/70">
                          A dedicated team of writers, editors, and strategists who take pride in producing top-tier content.
                        </p>
                      </div>
                      <div className="bg-card p-5 rounded-xl border border-border">
                        <h4 className="font-semibold text-lg mb-2">Attention to Detail</h4>
                        <p className="text-foreground/70">
                          Every piece of content is meticulously written, edited, and proofread to ensure perfection.
                        </p>
                      </div>
                      <div className="bg-card p-5 rounded-xl border border-border">
                        <h4 className="font-semibold text-lg mb-2">Client-Centric Approach</h4>
                        <p className="text-foreground/70">
                          We take the time to understand your brand, voice, and audience to deliver content that truly resonates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/");
                      setTimeout(() => {
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 150);
                    }}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
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

export default ContentManagement;