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
import logo from "@/assets/mediamatic-logo.png";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/mediamaticstudio/" },
  { icon: Twitter, href: "https://x.com/_media_matic" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/reshma-s-1b7218276/" },
  { icon: Facebook, href: "https://www.facebook.com/mediamatic.studio1" },
  { icon: Youtube, href: "https://www.youtube.com/@mediamaticstudio" },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

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

  return (
    <footer
      ref={footerRef}
      className="pt-20"
      style={{ backgroundColor: "rgb(83, 19, 27)", color: "#fdf3b7" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 pb-16">
          {/* LOGO + SOCIAL */}
          <div className="footer-item space-y-8">
            <img
              src={logo}
              alt="MediaMatic Studio"
              className="w-44"
            />

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition hover:scale-105"
                  style={{ borderColor: "#fdf3b7", color: "#fdf3b7" }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-item">
            <h4 className="font-semibold mb-6">Useful Links</h4>
            <ul className="space-y-3 opacity-80">
              {[
                { label: "Home", id: "home" },
                { label: "About us", id: "about" },
                { label: "Brand Management", id: "brand-management" },
                { label: "Services", id: "services" },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
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
              <li>Content Management</li>
              <li>2D & 3D Animation</li>
              <li>Web Development</li>
              <li>Digital Marketing</li>
              <li>Web Hosting</li>
            </ul>
          </div>

          {/* OFFICE DETAILS */}
          <div className="footer-item text-sm space-y-5 opacity-80">
            <div>
              <h4 className="font-semibold mb-2 opacity-100">
                Corporate Office
              </h4>
              <p>
                COVAI TECH PARK, Site No: 90,
                <br />
                Kovai Thiru Nagar, Kalapatty Village,
                <br />
                Coimbatore – 641 014
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 opacity-100">
                Branch Office
              </h4>
              <p>
                Civil Aerodrome Post, No. 97,
                <br />
                Dr. Jaganathanagar,
                <br />
                Coimbatore – 641 014
              </p>
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
        style={{
          backgroundColor: "rgba(0,0,0,0.25)",
          color: "#fdf3b7",
        }}
      >
        © Copyright MediaMatic. All Rights Reserved
        <br />
        Designed by <span className="font-semibold">MediaMatic Solution</span>
      </div>
    </footer>
  );
};
