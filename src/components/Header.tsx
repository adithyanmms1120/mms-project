import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import logo from "@/assets/mediamatic-logo.png";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },

  // ✅ NEW PAGE LINK
  { label: "Brand Statement", href: "/brand-statement", isPage: true },

  { label: "Contact", href: "#contact" },
];

// ✅ Services dropdown links
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

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

<<<<<<< HEAD
    // Detect dark sections
    const darkSections = document.querySelectorAll("#about, #contact");
=======
    const darkSections = document.querySelectorAll(
      "#about, #contact, #brand-statement"
    );
>>>>>>> dea768ee7fdf0cb9d657304a78db436695583eb2

    darkSections.forEach((section) => {
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
        {
          clipPath: "circle(150% at calc(100% - 40px) 40px)",
          duration: 0.6,
          ease: "power3.out",
        }
      );

      const links = linksRef.current?.querySelectorAll("a");
      if (links) {
        gsap.fromTo(
          links,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    }
  }, [isOpen]);

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (href: string, isPage?: boolean) => {
    setIsOpen(false);
<<<<<<< HEAD

    // ✅ PAGE NAVIGATION (Brand Statement)
    if (isPage) {
      window.location.href = href;
      return;
    }

    // ✅ SECTION SCROLL
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic colors
=======
    setServiceOpenMobile(false);
    if (href.startsWith("/")) {
    navigate(href);
    return;
  }

  // Scroll navigation
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth" });
    // document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

>>>>>>> dea768ee7fdf0cb9d657304a78db436695583eb2
  const textColor = isDarkSection
    ? "text-primary-foreground"
    : "text-foreground";
  const textColorHover = isDarkSection
    ? "hover:text-primary-foreground/70"
    : "hover:text-foreground/70";
  const textColorMuted = isDarkSection
    ? "text-primary-foreground/70"
    : "text-foreground/70";
  const bgButton = isDarkSection
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
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="MediaMatic Studio" className="h-12 w-auto" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
<<<<<<< HEAD
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.isPage);
                  }}
                  className={`${textColorMuted} ${textColorHover} font-medium text-sm uppercase tracking-wider transition-colors duration-300`}
                >
                  {link.label}
                </a>
              ))}
=======
              {navLinks.map((link) =>
                link.label === "Services" ? (
                  <div key={link.label} className="relative group">
                    <button
                      className={`${textColorMuted} ${textColorHover} flex items-center gap-1 font-medium text-sm uppercase tracking-wider`}
                    >
                      Services <ChevronDown size={14} />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute left-0 top-full mt-4 w-60 rounded-xl bg-background shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {serviceLinks.map((service) => (
                        <a
                          key={service.label}
                          href={service.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(service.href);
                          }}
                          className="block px-5 py-3 text-sm text-foreground hover:bg-muted transition-colors"
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`${textColorMuted} ${textColorHover} font-medium text-sm uppercase tracking-wider link-underline`}
                  >
                    {link.label}
                  </a>
                )
              )}
>>>>>>> dea768ee7fdf0cb9d657304a78db436695583eb2
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className={`hidden md:flex items-center gap-2 ${bgButton} px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider hover:scale-105 transition-all`}
            >
              Get Started <ArrowRight size={16} />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
<<<<<<< HEAD
              className={`md:hidden ${textColor} p-2`}
=======
              className={`md:hidden ${textColor}`}
>>>>>>> dea768ee7fdf0cb9d657304a78db436695583eb2
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
          <div ref={linksRef} className="flex flex-col items-center gap-8">
<<<<<<< HEAD
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.isPage);
                }}
                className="font-display text-5xl text-primary-foreground hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
=======
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div key={link.label} className="text-center">
                  <button
                    onClick={() =>
                      setServiceOpenMobile(!serviceOpenMobile)
                    }
                    className="font-display text-5xl text-primary-foreground flex items-center gap-2"
                  >
                    Services <ChevronDown size={22} />
                  </button>

                  {serviceOpenMobile && (
                    <div className="mt-6 flex flex-col gap-4">
                      {serviceLinks.map((service) => (
                        <a
                          key={service.label}
                          href={service.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(service.href);
                          }}
                          className="text-xl text-primary-foreground/80 hover:text-primary-foreground"
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
                  className="font-display text-5xl text-primary-foreground hover:opacity-70"
                >
                  {link.label}
                </a>
              )
            )}
>>>>>>> dea768ee7fdf0cb9d657304a78db436695583eb2
          </div>
        </div>
      )}
    </>
  );
};
