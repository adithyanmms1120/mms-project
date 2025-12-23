import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/mediamatic-logo.png";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Header reveal animation
    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Detect dark sections (about, contact are dark/primary colored)
    const darkSections = document.querySelectorAll("#about, #contact, #brand-statement");
    
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at calc(100% - 40px) 40px)" },
        { clipPath: "circle(150% at calc(100% - 40px) 40px)", duration: 0.6, ease: "power3.out" }
      );

      const links = linksRef.current?.querySelectorAll("a");
      if (links) {
        gsap.fromTo(
          links,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out", delay: 0.3 }
        );
      }
    }
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic colors based on section
  const textColor = isDarkSection ? "text-primary-foreground" : "text-foreground";
  const textColorHover = isDarkSection ? "hover:text-primary-foreground/70" : "hover:text-foreground/70";
  const textColorMuted = isDarkSection ? "text-primary-foreground/70" : "text-foreground/70";
  const bgButton = isDarkSection ? "bg-primary-foreground text-primary" : "bg-foreground text-background";

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
              className="flex items-center gap-3"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
            >
              <img src={logo} alt="MediaMatic Studio" className="h-12 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`${textColorMuted} ${textColorHover} font-medium text-sm uppercase tracking-wider transition-colors duration-300 link-underline`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className={`hidden md:flex items-center gap-2 ${bgButton} px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300`}
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden ${textColor} p-2 transition-colors duration-300`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center"
        >
          <div ref={linksRef} className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-display text-5xl text-primary-foreground hover:opacity-70 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
