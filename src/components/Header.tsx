import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/mediamatic-logo.png";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- NAV LINKS ---------------- */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Brand Statement", href: "/brand-statement", isPage: true },
  { label: "Contact", href: "#contact" },
];

/* ---------------- SERVICES DROPDOWN ---------------- */
const serviceLinks = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Website Development", href: "/services/web-development" },
  { label: "2D & 3D Animation", href: "/services/animation" },
  { label: "Content Management", href: "/services/content" },
  { label: "Web Hosting", href: "/services/hosting" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [serviceOpenMobile, setServiceOpenMobile] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- HEADER ENTRY ANIMATION ---------------- */
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  /* ---------------- DARK SECTION DETECTION ---------------- */
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const sections = document.querySelectorAll("#about, #contact");

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80px",
        end: "bottom 80px",
        onEnter: () => setIsDarkSection(true),
        onLeave: () => setIsDarkSection(false),
        onEnterBack: () => setIsDarkSection(true),
        onLeaveBack: () => setIsDarkSection(false),
      });
    });
  }, [location.pathname]);

  /* ---------------- MOBILE MENU ANIMATION ---------------- */
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    gsap.fromTo(
      menuRef.current,
      { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
      {
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        duration: 0.6,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      linksRef.current?.querySelectorAll("a") || [],
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, delay: 0.3 }
    );
  }, [isOpen]);

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (href: string, isPage?: boolean) => {
    setIsOpen(false);
    setServiceOpenMobile(false);

    if (isPage || href.startsWith("/")) {
      navigate(href);
      return;
    }

    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------- DYNAMIC COLORS ---------------- */
  const textColor = isDarkSection ? "text-primary-foreground" : "text-foreground";
  const textMuted = isDarkSection
    ? "text-primary-foreground/70"
    : "text-foreground/70";
  const hoverColor = isDarkSection
    ? "hover:text-primary-foreground"
    : "hover:text-foreground";
  const buttonStyle = isDarkSection
    ? "bg-primary-foreground text-primary"
    : "bg-foreground text-background";

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* LOGO */}
            <a
              href="#home"
              onClick={e => {
                e.preventDefault();
                handleNavClick("#home");
              }}
            >
              <img src={logo} alt="MediaMatic Studio" className="h-12" />
            </a>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link =>
                link.label === "Services" ? (
                  <div key={link.label} className="relative group">
                    <button className={`${textMuted} ${hoverColor} flex items-center gap-1 uppercase text-sm`}>
                      Services <ChevronDown size={14} />
                    </button>

                    <div className="absolute left-0 top-full mt-4 w-64 rounded-xl bg-background shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                      {serviceLinks.map(service => (
                        <a
                          key={service.label}
                          href={service.href}
                          onClick={e => {
                            e.preventDefault();
                            handleNavClick(service.href, true);
                          }}
                          className="block px-5 py-3 text-sm hover:bg-muted"
                        >
                          {service.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      handleNavClick(link.href, link.isPage);
                    }}
                    className={`${textMuted} ${hoverColor} uppercase text-sm`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className={`hidden md:flex items-center gap-2 ${buttonStyle} px-6 py-3 rounded-full uppercase text-sm hover:scale-105 transition`}
            >
              Get Started <ArrowRight size={16} />
            </a>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden ${textColor}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-primary flex items-center justify-center"
        >
          <div ref={linksRef} className="flex flex-col items-center gap-8">
            {navLinks.map(link =>
              link.label === "Services" ? (
                <div key={link.label} className="text-center">
                  <button
                    onClick={() => setServiceOpenMobile(!serviceOpenMobile)}
                    className="text-5xl text-primary-foreground flex items-center gap-2"
                  >
                    Services <ChevronDown size={22} />
                  </button>

                  {serviceOpenMobile && (
                    <div className="mt-6 flex flex-col gap-4">
                      {serviceLinks.map(service => (
                        <a
                          key={service.label}
                          href={service.href}
                          onClick={e => {
                            e.preventDefault();
                            handleNavClick(service.href, true);
                          }}
                          className="text-xl text-primary-foreground/80"
                        >
                          {service.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    handleNavClick(link.href, link.isPage);
                  }}
                  className="text-5xl text-primary-foreground"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};
