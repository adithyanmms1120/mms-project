import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/mediamatic-logo.png";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Studio", href: "#studio" },
  {label: "Brandstatements", href: "#brandstatements" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Content Management", href: "/services/contentmanagement" },
  { label: "2D & 3D Animation", href: "/services/animation" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web Hosting", href: "/services/webhosting" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Header entry animation
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
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
      linksRef.current?.querySelectorAll("a, button") || [],
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, delay: 0.3 }
    );
  }, [isOpen]);

  const handleNavClick = (href: string, isPage?: boolean) => {
    setIsOpen(false);
    setMobileServiceOpen(false);

    if (isPage || href.startsWith("/")) {
      navigate(href);
      return;
    }

    // If on a different page, navigate home first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-lg shadow-soft py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="MediaMatic Studio" className="h-10 md:h-12" />
              <span className="hidden sm:block font-display text-xl font-bold text-foreground">
                MediaMatic
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setServiceOpen(true)}
                    onMouseLeave={() => setServiceOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors uppercase text-sm font-medium tracking-wide">
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          serviceOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`service-dropdown ${serviceOpen ? "active" : ""}`}
                    >
                      <div className="py-2">
                        {serviceLinks.map((service) => (
                          <a
                            key={service.label}
                            href={service.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setServiceOpen(false);
                              handleNavClick(service.href, true);
                            }}
                            className="block px-5 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            {service.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-foreground/70 hover:text-foreground transition-colors uppercase text-sm font-medium tracking-wide animated-underline"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full uppercase text-sm font-semibold hover:shadow-strong hover:scale-105 transition-all duration-300"
            >
              Get Started <ArrowRight size={16} />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-foreground p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-primary flex items-center justify-center"
        >
          <div ref={linksRef} className="flex flex-col items-center gap-6">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="text-center">
                  <button
                    onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                    className="text-4xl md:text-5xl text-primary-foreground font-display flex items-center gap-2"
                  >
                    Services
                    <ChevronDown
                      size={24}
                      className={`transition-transform duration-300 ${
                        mobileServiceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileServiceOpen && (
                    <div className="mt-4 flex flex-col gap-3">
                      {serviceLinks.map((service) => (
                        <a
                          key={service.label}
                          href={service.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(service.href, true);
                          }}
                          className="text-lg text-primary-foreground/70 hover:text-primary-foreground transition-colors"
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-4xl md:text-5xl text-primary-foreground font-display hover:text-accent transition-colors"
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
