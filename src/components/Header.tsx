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
  { label: "Services", href: "/services/", id: "services", hasDropdown: true, isSubPage: true },
  { label: "STUDIO HUB", href: "#", id: "studio", hasDropdown: true },
  { label: "Brand Management", href: "#brandstatements", id: "brandstatements" },
  { label: "Blog", href: "/blog/", isSubPage: true },
  { label: "Contact Us", href: "/contact-us/", isSubPage: true, id: "contact" },
];

const serviceLinks = [
  { label: "2D & 3D Animation Videos", href: "/services/animation/" },
  { label: "Content Management", href: "/services/contentmanagement/" },
  { label: "Website & App Development", href: "/services/web-development/" },
  { label: "Designing", href: "/services/designing/" },
  { label: "Digital Marketing", href: "/services/digital-marketing-agency/" },
  { label: "VPS Web Hosting Service", href: "/services/webhosting/" },
];

/* ================= COMPONENT ================= */

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileStudioOpen, setMobileStudioOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isScrollSpyPage = location.pathname === "/" || location.pathname === "/about-us/";

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
      if (isScrollSpyPage) {
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
      if (isScrollSpyPage && currentScrollY > lastScrollY.current && currentScrollY > 100) {
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
  }, [location.pathname, activeSection, isScrollSpyPage]);

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
    setMobileStudioOpen(false);
    setServiceOpen(false);
    setStudioOpen(false);

    // External links
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    // If we're already on that page and it's a sub-page link, do nothing
    if (isSubPage && location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "auto" });
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
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "auto"
          });
        } else {
          // Fallback if element not found immediately (e.g. lazy loaded)
          setTimeout(() => {
            const elRetry = document.querySelector(href);
            if (elRetry) {
              const offset = 80;
              const elementPosition = elRetry.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "auto"
              });
            }
          }, 500);
        }
      }, 100);
      return;
    }

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
                      setServiceOpen(link.id === "services");
                      setStudioOpen(link.id === "studio");
                    }}
                    onMouseLeave={() => {
                      timeoutRef.current = setTimeout(() => {
                        setServiceOpen(false);
                        setStudioOpen(false);
                      }, 200);
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href, (link as any).isSubPage);
                      }}
                      className={`flex items-center gap-1 text-[12px] xl:text-[13px] uppercase tracking-wider hover:text-primary transition whitespace-nowrap relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all ${(activeSection === link.id || (link.id === "services" && location.pathname.startsWith("/services/")) || (link.id === "studio" && location.pathname.startsWith("/studio/"))) ? "after:w-full text-primary font-bold" : "after:w-0"}`}
                    >
                      {link.label} <ChevronDown size={14} />
                    </a>

                    {link.id === "services" && serviceOpen && (
                      <div className="absolute top-full mt-3 bg-background shadow-xl rounded-xl w-72 overflow-hidden z-10 border border-foreground/5">
                        {serviceLinks.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setServiceOpen(false);
                              handleNavClick(s.href, true);
                            }}
                            className="block px-5 py-3 text-sm transition-all duration-300 hover:bg-[#652b32] hover:text-[#faf3e0] text-foreground/70 font-medium"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {link.id === "studio" && studioOpen && (
                      <div className="absolute top-full mt-3 bg-background shadow-xl rounded-xl w-72 overflow-hidden z-10 border border-foreground/5">
                        <a
                          href="/studio/podcast-recording-studio-Coimbatore/"
                          onClick={(e) => {
                            e.preventDefault();
                            setStudioOpen(false);
                            handleNavClick("/studio/podcast-recording-studio-Coimbatore/", true);
                          }}
                          className="block px-5 py-3 text-sm transition-all duration-300 hover:bg-[#652b32] hover:text-[#faf3e0] text-foreground/70 font-medium"
                        >
                          Coimbatore Branch
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href, (link as any).isSubPage);
                    }}
                    className={`relative text-[12px] xl:text-[13px] uppercase tracking-wider whitespace-nowrap after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full ${(link.id && activeSection === link.id) || (!isScrollSpyPage && link.isSubPage && (location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href)))) ? "after:w-full text-primary font-bold" : "after:w-0"}`}
                  >
                    {link.label}
                  </a>
                )
              )}

              {/* GET QUOTE Button */}
              <a
                href="/get-quote/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-6 xl:px-9 py-3.5 rounded-xl font-black text-[#faf3e0] bg-[#652b32] hover:bg-[#652b32]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 inline-block text-center text-[10px] xl:text-[12px] uppercase tracking-[0.15em] whitespace-nowrap cursor-pointer"
              >
                GET QUOTE
              </a>

              {/* PAY NOW Button */}
              <a
                href="https://www.paypal.com/ncp/payment/Q54LAB9Y3BBLS"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 xl:ml-4 px-6 xl:px-9 py-3.5 rounded-xl font-black text-[#652b32] bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-105 active:scale-95 inline-block text-center text-[10px] xl:text-[12px] uppercase tracking-[0.15em]"
              >
                PAY NOW
              </a>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div >
      </header >

      {/* Mobile Menu */}
      {
        isOpen && (
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
                          handleNavClick(link.href, (link as any).isSubPage);
                        }}
                        className={`text-2xl transition-all duration-300 ${(activeSection === link.id || (link.id === "services" && location.pathname.startsWith("/services/")) || (link.id === "studio" && location.pathname.startsWith("/studio/"))) ? "text-yellow-400 font-bold" : "opacity-80 hover:opacity-100"}`}
                      >
                        {link.label}
                      </a>
                      <button
                        onClick={() => {
                          if (link.id === "services") setMobileServiceOpen(!mobileServiceOpen);
                          else if (link.id === "studio") setMobileStudioOpen(!mobileStudioOpen);
                        }}
                        className="p-1 rounded-full bg-white/10"
                      >
                        <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${(link.id === "services" ? mobileServiceOpen : mobileStudioOpen) ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {link.id === "services" && mobileServiceOpen && (
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

                    {link.id === "studio" && mobileStudioOpen && (
                      <div className="mt-4 space-y-2 w-full">
                        <a
                          href="/studio/podcast-recording-studio-Coimbatore/"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("/studio/podcast-recording-studio-Coimbatore/", true);
                          }}
                          className="block py-3 px-6 rounded-xl text-lg opacity-80 hover:opacity-100 hover:bg-[#652b32] hover:text-[#faf3e0] transition-all duration-300"
                        >
                          Coimbatore Branch
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href, (link as any).isSubPage);
                    }}
                    className={`text-2xl transition-all duration-300 ${(link.id && activeSection === link.id) || (!isScrollSpyPage && link.isSubPage && (location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href)))) ? "text-yellow-400 font-bold" : "opacity-80 hover:opacity-100"}`}
                  >
                    {link.label}
                  </a>
                )
              )}

              <a
                href="/get-quote/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-10 py-5 rounded-2xl bg-[#652b32] text-[#faf3e0] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-[#652b32]/90 transition-all active:scale-95 cursor-pointer"
              >
                GET QUOTE
              </a>

              <a
                href="https://www.paypal.com/ncp/payment/Q54LAB9Y3BBLS"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 px-10 py-5 rounded-2xl bg-yellow-400 text-[#652b32] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-yellow-300 transition-all active:scale-95"
              >
                PAY NOW
              </a>
            </div>
          </div>
        )
      }
    </>
  );
};
