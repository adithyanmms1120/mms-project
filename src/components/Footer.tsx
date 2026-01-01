import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/mediamatic-logo.png";
import { Label } from "recharts";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/mediamaticstudio/" },
  { icon: Twitter, href: "https://x.com/_media_matic" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/reshma-s-1b7218276/" },
  { icon: Facebook, href: "https://www.facebook.com/mediamatic.studio1" },
  { icon: Youtube, href: "https://www.youtube.com/@mediamaticstudio" },
];

const usefulLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Brand Management", href: "#brandstatements" },
  { label: "Services", href: "#services" },
  { label: "Sudio-Hub", href: "#studio" },
];

const serviceLinks = [
  { label: "Content Management", href: "/services/contentmanagement" },
  { label: "2D & 3D Animation", href: "/services/animation" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web Hosting", href: "/services/webhosting" },
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
      className="pt-20"
      style={{ backgroundColor: "#fdf3b7", color: "rgb(83, 19, 27)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 pb-16">

          {/* LOGO + SOCIAL */}
          <div className="footer-item space-y-8">
            <img src={logo} alt="MediaMatic Studio" className="w-44" />

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition hover:scale-105"
                  style={{
                    borderColor: "rgb(83, 19, 27)",
                    color: "rgb(83, 19, 27)",
                  }}
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

          {/* OFFICE DETAILS */}
          <div className="footer-item text-sm space-y-5 opacity-80">
            <div>
              <h4 className="font-semibold mb-2 opacity-100">
                Corporate Office
              </h4>
              <a
                href="https://www.google.com/maps?q=COVAI+TECH+PARK+Kalapatty+Coimbatore"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline block"
              >
                COVAI TECH PARK, Site No: 90,
                <br />
                Kovai Thiru Nagar, Kalapatty Village,
                <br />
                Coimbatore – 641 014
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-2 opacity-100">
                Branch Office
              </h4>
              <a
                href="https://www.google.com/maps?q=Dr.+Jaganathanagar+Civil+Aerodrome+Coimbatore"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline block"
              >
                Civil Aerodrome Post, No. 97,
                <br />
                Dr. Jaganathanagar,
                <br />
                Coimbatore – 641 014
              </a>
            </div>

            <div className="space-y-1">
              <p>Office Direct: 0422-4772362</p>
              <p>Office Mobile: +91 96295 93615</p>
              <p>US Toll Free: (+1) (888) 219 5755</p>
              <p>Email: support@mediamaticstudio.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="py-4 text-center text-sm"
        style={{ backgroundColor: "#fdf3b7", color: "rgb(83, 19, 27)" }}
      >
        © Copyright MediaMatic. All Rights Reserved
        <br />
        Developed & Designed by{" "}
        <span className="font-semibold">MediaMatic Studio</span>
      </div>
    </footer>
  );
};
