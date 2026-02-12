import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "@/assets/lOGO.webp";

gsap.registerPlugin(ScrollTrigger);

/* ================= NAV DATA ================= */

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About Us", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services", hasDropdown: true },
  { label: "STUDIO HUB", href: "#studio", id: "studio" },
  { label: "Brand Management", href: "#brandstatements", id: "brandstatements" },
  { label: "Contact Us", href: "/get-quote", isSubPage: true },
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
  const [activeSection, setActiveSection] = useState("home");
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
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", force3D: true }
    );
  }, []);

  /* Scroll logic for visibility and background */
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isHomePage = location.pathname === "/";

      // Detect active section for ScrollSpy
      if (isHomePage) {
        const sections = navLinks
          .filter(link => link.id)
          .map(link => document.getElementById(link.id!));

        let currentSection = activeSection;
        sections.forEach(section => {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
              currentSection = section.id;
            }
          }
        });
        setActiveSection(currentSection);
      }

      // Determine direction for hiding
      if (isHomePage && currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 60 || !isHomePage);
      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, activeSection]);

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
    setServiceOpen(false);

    // External links
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    // If we're already on that page and it's a sub-page link, do nothing
    if (isSubPage && location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      navigate("/" + href);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "auto" // Changed to instant jump
      });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 will-change-transform
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
              className="flex items-center flex-shrink-0"
            >
              <img
                src={logo}
                className="h-10 xl:h-12 transition-transform duration-300 hover:scale-105 drop-shadow-md brightness-110 contrast-125"
                alt="MediaMatic Logo"
                loading="eager"
                decoding="async"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-6 xxl:gap-8">
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
                      className={`flex items-center gap-1 text-[12px] xl:text-[13px] uppercase tracking-wider hover:text-primary transition whitespace-nowrap relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all ${activeSection === "services" ? "after:w-full text-primary" : "after:w-0"}`}
                    >
                      Services <ChevronDown size={14} />
                    </a>

                    {serviceOpen && (
                      <div className="absolute top-full mt-3 bg-background shadow-xl rounded-xl w-72 overflow-hidden z-10 border border-foreground/5">
                        {serviceLinks.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setServiceOpen(false); // Close dropdown
                              handleNavClick(s.href, true);
                            }}
                            className="block px-5 py-3 text-sm transition-all duration-300 hover:bg-[#652b32] hover:text-[#faf3e0] text-foreground/70 font-medium"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.label === "Contact Us" ? (
                  <Link
                    key={link.label}
                    to="/get-quote"
                    className="px-5 xl:px-7 py-2 rounded-full font-bold text-[#faf3e0] bg-[#652b32] hover:bg-[#652b32]/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md inline-block text-center text-[10px] xl:text-[12px] uppercase tracking-[0.15em] whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href, (link as any).isSubPage);
                    }}
                    className={`relative text-[12px] xl:text-[13px] uppercase tracking-wider whitespace-nowrap after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full ${activeSection === link.id ? "after:w-full text-primary font-bold" : "after:w-0"}`}
                  >
                    {link.label}
                  </a>
                )
              )}

              {/* GET QUOTE Button */}
              <a
                href="/get-quote"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 xl:ml-4 px-6 xl:px-9 py-3.5 rounded-xl font-black text-[#652b32] bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-105 active:scale-95 inline-block text-center text-[10px] xl:text-[12px] uppercase tracking-[0.15em]"
              >
                GET QUOTE
              </a>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2">
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
                    <div className="mt-4 space-y-2 w-full">
                      {serviceLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(s.href, true);
                          }}
                          className="block py-3 px-6 rounded-xl text-lg opacity-80 hover:opacity-100 hover:bg-[#652b32] hover:text-[#faf3e0] transition-all duration-300"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.label === "Contact Us" ? (
                <Link
                  key={link.label}
                  to="/get-quote"
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-4 rounded-full font-bold text-[#faf3e0] bg-[#652b32] active:scale-95 transition-all shadow-xl inline-block text-center text-2xl uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, (link as any).isSubPage);
                  }}
                  className="text-2xl"
                >
                  {link.label}
                </a>
              )
            )}

            <a
              href="/get-quote"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 px-10 py-5 rounded-2xl bg-yellow-400 text-[#652b32] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-yellow-300 transition-all active:scale-95"
            >
              GET QUOTE
            </a>
          </div>
        </div>
      )}
    </>
  );
};
