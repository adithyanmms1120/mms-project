import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Monitor, CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema, generateOrganizationSchema } from "@/utils/seo-schemas";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Mobile App Development",
  "Website Development",
  "E-Commerce Solutions",
  "Custom Web Applications",
  "UI/UX Design",
  "Responsive Design",
];

const WebDevelopment = () => {
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
        title="Web & App Development Services | MediaMatic Studio"
        description="Your one-stop digital partner for cutting-edge web and mobile experiences. Expert mobile app development, website development, e-commerce solutions, and custom web applications."
        canonical="/services/web-development/"
        keywords="web development, app development, mobile apps, website design, e-commerce, custom web applications, UI/UX design, responsive design, MediaMatic Studio"
        structuredData={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services/" },
            { name: "Web Development", url: "/services/web-development/" }
          ]),
          generateServiceSchema({
            name: "Web Development Services",
            description: "Expert web and mobile app development including custom applications, e-commerce solutions, and responsive design."
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
                    <Monitor className="w-7 h-7" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/60">
                    Service
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold mb-6">
                  Web & App{" "}
                  <span className="italic font-normal text-primary-foreground/70">
                    Development
                  </span>
                </h1>

                <p className="text-xl text-primary-foreground/80 max-w-2xl">
                  Your one-stop digital solution for cutting-edge web and mobile experiences.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-20">
            <div className="container mx-auto px-6 max-w-6xl content-section space-y-14">
              <div className="content-block">
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Your go-to digital partner right here in India. We are not just another
                  tech company — we are your digital dream team helping businesses
                  worldwide build powerful digital products.
                </p>
              </div>

              <div className="content-block">
                <p className="text-foreground/70 leading-relaxed">
                  Whether you are launching a killer app or a high-performing website,
                  we have your back. From startups to global enterprises, we understand
                  what it takes to succeed online.
                </p>
              </div>

              <div className="content-block">
                <h2 className="font-display text-2xl font-bold mb-3">
                  Mobile Apps That Rock
                </h2>
                <p className="text-foreground/70">
                  From food delivery platforms to fitness trackers, we design mobile
                  apps that users love and businesses depend on.
                </p>
              </div>

              <div className="content-block">
                <h2 className="font-display text-2xl font-bold mb-3">
                  Websites That Convert
                </h2>
                <p className="text-foreground/70">
                  Clean design, mobile-friendly layouts, and conversion-focused
                  development — your digital storefront done right.
                </p>
              </div>

              <div className="content-block">
                <h2 className="font-display text-2xl font-bold mb-3">
                  Design That Tells Your Story
                </h2>
                <p className="text-foreground/70">
                  Logos, branding, and marketing visuals crafted to speak directly
                  to your audience.
                </p>
              </div>

              <div className="content-block">
                <h2 className="font-display text-2xl font-bold mb-4">
                  What Sets Us Apart
                </h2>
                <p className="text-foreground/70">
                  Budget-friendly pricing, world-class quality, and a deep
                  understanding of the global digital ecosystem.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold mb-6">
                  Our Services Include
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

export default WebDevelopment;
