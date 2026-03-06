import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/lOGO.webp";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/mediamaticstudio/" },
  { icon: XIcon, href: "https://x.com/_media_matic" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/media-matic-studio/?viewAsMember=true" },
  { icon: Facebook, href: "https://www.facebook.com/mediamatic.studio1" },
  { icon: Youtube, href: "https://www.youtube.com/@mediamaticstudio" },
];

const usefulLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "/services/", hasDropdown: true },
  { label: "Blog", href: "/blog/" },
];

const serviceLinks = [
  { label: "2D & 3D Animation Videos", href: "/services/animation/" },
  { label: "Content Management", href: "/services/contentmanagement/" },
  { label: "Website & App Development", href: "/services/website-development-agency/" },
  { label: "Designing", href: "/services/designing/" },
  { label: "Search Engine Optimization (SEO)", href: "/search-engine-optimization-company/" },
  { label: "Social Media Optimization (SMO)", href: "/social-media-optimization-company/" },
  { label: "Social Media Marketing (SMM)", href: "/social-media-marketing-company/" },
  { label: "Search Engine Marketing (SEM)", href: "/search-engine-marketing-company/" },
  { label: "Web Hosting Service", href: "/services/webhosting/" },
];

/* ================= COMPONENT ================= */

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* GSAP Animation */
  useEffect(() => {
    let ctx: gsap.Context;
    // Small delay to ensure all dynamic content above it has rendered
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".footer-item",
          {
            y: 50,
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: {
              amount: 0.4,
              from: "start"
            },
            duration: 1,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom-=50",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }, footerRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  /* SAME NAV LOGIC AS HEADER */
  const handleNavClick = (href: string, isSubPage?: boolean) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (isSubPage || href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (href === "#") return;

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "auto" });
      }, 100);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "auto" });
  };

  return (
    <footer
      ref={footerRef}
      className="pt-8 pb-4 bg-[#652b32] text-[#faf3e0]"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-8 pb-6 items-start">

          {/* LOGO + BRANDING + SOCIAL */}
          <div className="footer-item flex flex-col items-center space-y-4" style={{ willChange: "transform, opacity" }}>
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full border-2 border-[#faf3e0]/10 p-1.5 shadow-lg">
                <div className="w-28 h-28 bg-[#faf3e0] rounded-full shadow-2xl flex items-center justify-center border-[6px] border-[#652b32]/5 hover:scale-105 transition-all duration-300">
                  <img
                    src={logo}
                    alt="MediaMatic Studio"
                    loading="lazy"
                    decoding="async"
                    className="w-16 drop-shadow-md"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase leading-tight text-[#faf3e0]">Mediamatic Studio Pvt. Ltd.,</h3>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-1">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-[#faf3e0]/30 text-[#faf3e0] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#faf3e0] hover:text-[#652b32] shadow-sm"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* USEFUL LINKS */}
          <div className="footer-item text-center flex flex-col items-center pt-2" style={{ willChange: "transform, opacity" }}>
            <h4 className="font-black text-sm uppercase tracking-widest mb-4 relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-[#faf3e0]/30">Useful Links</h4>
            <ul className="space-y-3 opacity-90 text-[13px] font-medium">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* OUR SERVICES */}
          <div className="footer-item text-center flex flex-col items-center pt-2" style={{ willChange: "transform, opacity" }}>
            <h4 className="font-black text-sm uppercase tracking-widest mb-4 relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-[#faf3e0]/30">Our Services</h4>
            <ul className="space-y-3 opacity-90 text-[13px] font-medium">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(service.href, true);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="py-4 text-center text-[10px] tracking-wider uppercase font-semibold bg-[#652b32] text-[#faf3e0]/60 border-t border-[#faf3e0]/10"
      >
        © {new Date().getFullYear()} MediaMatic Studio. All Rights Reserved
        <span className="mx-2">|</span>
        Developed & Designed by{" "}
        <span className="text-[#faf3e0]">MediaMatic Studio</span>
      </div>
    </footer>
  );
};
