import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/lOGO.webp";

gsap.registerPlugin(ScrollTrigger);

/* ================= NAV DATA ================= */

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "STUDIO HUB", href: "#studio" },
  { label: "Brand Management", href: "#brandstatements" },
  { label: "Contact Us", href: "#contact" },
  // { label: "Corporate Shoot ", href: "#" },
  // { label: "Blog", href: "#" },
];

const serviceLinks = [
  { label: "2D & 3D Animation Videos", href: "/services/animation" },
  { label: "Content Management", href: "/services/contentmanagement" },
  { label: "Website & App Development", href: "/services/web-development" },
  { label: "Designing", href: "/services/designing" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "VPS Web Hosting Service", href: "/services/webhosting" },
];

/* ================= COMPONENT ================= */

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* Header entry animation */
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  /* Scroll logic for visibility and background */
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isHomePage = location.pathname === "/" || location.pathname === "/"; // Adjust for basename if needed

      // Determine direction for hiding
      if (isHomePage && currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past header (ONLY ON HOME PAGE)
        setIsVisible(false);
      } else {
        // Scrolling up, at top, or on SUB-PAGES
        setIsVisible(true);
      }

      // Background logic: Always solid on sub-pages, scroll-dependent on Home
      setIsScrolled(currentScrollY > 60 || !isHomePage);
      lastScrollY.current = currentScrollY;
    };

    // Run once on mount and route change
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  /* Mobile menu animation */
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    gsap.fromTo(
      menuRef.current,
      { clipPath: "circle(0% at 90% 10%)" },
      { clipPath: "circle(150% at 90% 10%)", duration: 0.6, ease: "power3.out" }
    );

    gsap.fromTo(
      linksRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08 }
    );
  }, [isOpen]);

  /* Navigation */
  const handleNavClick = (href: string, isSubPage?: boolean) => {
    setIsOpen(false);
    setMobileServiceOpen(false);

    // External links
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    // Internal sub-pages (Services, etc.)
    if (isSubPage || href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (href === "#") return;

    // Anchor links
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "auto" });
      }, 100);
      return;
    }

    // Offset for fixed header
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "auto"
      });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "bg-background shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo ONLY */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center"
            >
              <img
                src={logo}
                className="h-11 md:h-12 transition-transform duration-300 hover:scale-105 drop-shadow-lg brightness-110 contrast-125"
                alt="MediaMatic Logo"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      setServiceOpen(true);
                    }}
                    onMouseLeave={() => {
                      timeoutRef.current = setTimeout(() => setServiceOpen(false), 200);
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="flex items-center gap-1 text-sm uppercase tracking-wide hover:text-primary transition"
                    >
                      Services <ChevronDown size={14} />
                    </a>

                    {serviceOpen && (
                      <div className="absolute top-full mt-3 bg-background shadow-xl rounded-xl w-72 overflow-hidden z-10">
                        {serviceLinks.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(s.href, true);
                            }}
                            className="block px-5 py-3 text-sm hover:bg-muted transition"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.label === "Contact Us" ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-7 py-3 rounded-full font-bold text-[#faf3e0] bg-[#652b32] hover:bg-[#652b32]/90 transition-all duration-300 shadow-md inline-block text-center text-[11px] uppercase tracking-[0.2em]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="relative text-sm uppercase tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </a>
                )
              )}

              {/* Pay Now */}
              <a
                href="https://www.paypal.com/ncp/payment/Q54LAB9Y3BBLS"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-6 py-2 rounded-full font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 transition shadow-md inline-block text-center"
              >
                Pay Now
              </a>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={menuRef} className="fixed inset-0 z-40 bg-primary text-white">
          <div
            ref={linksRef}
            className="h-full flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="text-center w-full px-6">
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="text-2xl"
                    >
                      Services
                    </a>
                    <button
                      onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                      className="p-1 rounded-full bg-white/10"
                    >
                      <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileServiceOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {mobileServiceOpen && (
                    <div className="mt-4 space-y-3">
                      {serviceLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(s.href, true);
                          }}
                          className="block opacity-80 hover:opacity-100 transition"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.label === "Contact Us" ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-10 py-4 rounded-full font-bold text-[#faf3e0] bg-[#652b32] active:scale-95 transition-all shadow-xl inline-block text-center text-2xl uppercase tracking-widest"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-2xl"
                >
                  {link.label}
                </a>
              )
            )}

            <a
              href="https://www.paypal.com/ncp/payment/Q54LAB9Y3BBLS"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold inline-block"
            >
              Pay Now
            </a>
          </div>
        </div>
      )}
    </>
  );
};
