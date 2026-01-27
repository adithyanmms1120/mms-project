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
import logo from "@/assets/mediamatic-logo.png";

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
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "STUDIO HUB", href: "#studio" },
  { label: "Brand Management", href: "#brandstatements" },

];

const serviceLinks = [
  { label: "2D & 3D Animation Videos", href: "/services/animation" },
  { label: "Content Management", href: "/services/contentmanagement" },
  { label: "Website & App Development", href: "/services/web-development" },
  { label: "Designing", href: "/services/designing" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web Hosting Service", href: "/services/webhosting" },
];

/* ================= COMPONENT ================= */

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* GSAP Animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
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
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="pt-20 bg-background text-foreground"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-16 pb-16 justify-items-center text-center">

          {/* LOGO + SOCIAL */}
          <div className="footer-item space-y-8 flex flex-col items-center">
            <img src={logo} alt="MediaMatic Studio" className="w-44" />

            <div className="flex gap-4 justify-center">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-foreground text-foreground flex items-center justify-center transition hover:scale-105"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* USEFUL LINKS */}
          <div className="footer-item">
            <h4 className="font-semibold mb-6">Useful Links</h4>
            <ul className="space-y-3 opacity-80">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:opacity-100 transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* OUR SERVICES */}
          <div className="footer-item">
            <h4 className="font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3 opacity-80">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(service.href, true);
                    }}
                    className="hover:opacity-100 transition"
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
        className="py-4 text-center text-sm bg-background text-foreground"
      >
        © Copyright MediaMatic. All Rights Reserved
        <br />
        Developed & Designed by{" "}
        <span className="font-semibold">MediaMatic Studio</span>
      </div>
    </footer>
  );
};
