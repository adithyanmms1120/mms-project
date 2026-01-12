import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clapperboard,
  Monitor,
  Megaphone,
  Globe,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Monitor,
    title: "Web & App Development",
    tagline: "Your go-to digital partner.",
    description:
      "Mobile apps your customers can't stop using. Websites that don't just look good but bring in customers. Clean, responsive design.",
    features: ["Mobile Apps", "Websites", "E-Commerce", "Custom Solutions"],
    href: "/services/web-development",
  },
  {
    icon: Globe,
    title: "Web Hosting",
    tagline: "Your trusted hosting partner.",
    description:
      "Top-notch web hosting and domain services. 24/7 support, 99.9% uptime guarantee, cPanel access, and business email accounts.",
    features: ["Shared Hosting", "Dedicated", "Domain", "Email"],
    href: "/services/webhosting",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Expand your reach with MediaMatic Studio.",
    description:
      "SEO, SMO, SEM, SMM expertise. Data-driven digital marketing solutions that increase conversions, engagement, and visibility.",
    features: ["SEO", "Social Media", "Email Marketing", "Google Ads"],
    href: "/services/digital-marketing",
  },
  {
    icon: FileText,
    title: "Content Management",
    tagline: "Expert content writers delivering high-quality content.",
    description:
      "SEO-friendly content, web copywriting, engaging social media content, technical writing, and brand-building content that connects with your audience.",
    features: ["Blog Posts", "SEO Articles", "Technical Docs", "Social Media"],
    href: "/services/contentmanagement",
  },
  {
    icon: Clapperboard,
    title: "2D & 3D Animation",
    tagline: "A creative studio that helps you move forward.",
    description:
      "Transform your business ideas into compelling visual stories with high-quality 2D & 3D animation, explainer videos, and branding videos.",
    features: ["Explainer Videos", "Brand Videos", "Motion Graphics", "VFX"],
    href: "/services/animation",
  },

];

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".services-heading",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-heading",
            start: "top 70%", // Trigger earlier
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%", // Trigger earlier
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen bg-background py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, hsl(var(--foreground)) 59px, hsl(var(--foreground)) 60px)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="block text-xs uppercase tracking-[0.3em] text-foreground/40 font-semibold mb-4">
            What We Do
          </span>
          <h2 className="services-heading font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-bold text-foreground">
            Our <span className="italic font-normal text-foreground/60">Services</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/50 max-w-xl mx-auto mt-6">
            A complete creative powerhouse for all your branding and digital needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-card rounded-2xl border-2 border-border hover:border-foreground/20 shadow-soft transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 md:p-8">
                {/* Index */}
                <span className="absolute top-4 right-4 text-5xl font-display font-bold text-foreground/[0.03]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <service.icon
                    className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-foreground/50 italic mb-4">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-foreground/5 rounded-full text-foreground/60 font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(service.href)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
