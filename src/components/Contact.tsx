import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin, CheckCircle, ArrowUpRight, ChevronDown, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

// Country data type
interface Country {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

// Country data (expanded for better coverage)
const countries: Country[] = [
  { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial_code: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial_code: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial_code: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", dial_code: "+81", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", dial_code: "+65", flag: "🇸🇬" },
  { code: "AE", name: "United Arab Emirates", dial_code: "+971", flag: "🇦🇪" },
  // Add more countries as needed
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dial_code.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside or on escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setSearchTerm("");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCountryDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // GSAP animations (unchanged, but ensure it's efficient)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-char",
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".info-card",
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".info-cards-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Validation functions (improved phone validation for flexibility)
  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation - optional, but if provided, check length
    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) { // More flexible range
        newErrors.phone = "Phone number must be between 7 and 15 digits";
        isValid = false;
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow only numbers, spaces, hyphens, and parentheses
    value = value.replace(/[^\d\s\-\$\$]/g, '');

    // Limit to reasonable digits
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length > 15) {
      value = formatPhoneNumber(digitsOnly.substring(0, 15));
    } else {
      value = formatPhoneNumber(digitsOnly);
    }

    setFormData({ ...formData, phone: value });

    // Clear phone error when user types
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    const digits = phoneNumber.replace(/\D/g, '');

    if (digits.length === 0) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.substring(0, 3)} ${digits.substring(3)}`;
    if (digits.length <= 10) return `${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
    return `${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6, 10)} ${digits.substring(10)}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchTerm("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting", {
        icon: <AlertCircle className="w-5 h-5" />,
      });
      return;
    }

    const btn = sendBtnRef.current;
    if (!btn) return;

    setIsSending(true);

    // Combine country code with phone number (remove formatting)
    const digitsOnly = formData.phone.replace(/\D/g, '');
    const fullPhoneNumber = selectedCountry.dial_code + digitsOnly;

    const submissionData = {
      ...formData,
      phone: fullPhoneNumber,
      country_code: selectedCountry.code
    };

    // Button animation (unchanged)
    const icon = btn.querySelector(".send-icon");
    const btnText = btn.querySelector(".btn-text");

    if (icon && btnText) {
      const tl = gsap.timeline();
      tl.to(btn, { scale: 0.96, duration: 0.1 });
      tl.to(
        icon,
        {
          x: 250,
          y: -100,
          rotation: 35,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0
      );
      tl.to(btnText, { opacity: 0, duration: 0.15 }, 0.05);
      tl.to(btn, {
        scale: 1,
        duration: 0.25,
        ease: "elastic.out(1, 0.6)",
      }, 0.25);
      tl.set(icon, { x: 0, y: 0, rotation: 0, opacity: 1 }, 1);
      tl.to(btnText, { opacity: 1, duration: 0.25 }, 1);
    }

    // API call
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/send/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        icon: <CheckCircle className="w-5 h-5" />,
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({ name: "", email: "", phone: "", message: "" });

    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsSending(false);
    }
  };

  const splitHeading = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="contact-char inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-background py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `
          radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)
        `,
        backgroundSize: "50px 50px",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20" style={{ perspective: "1000px" }}>
          <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
            {splitHeading("Contact Us")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Form */}
          <div>
            <p className="contact-item text-base md:text-lg text-foreground/50 mb-8">
              Have a project in mind? Let's create something amazing together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name Field */}
              <div className="contact-item">
                <label className="block text-sm md:text-xs font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className={`w-full px-5 py-4 bg-transparent border-2 rounded-xl focus:outline-none transition-all text-foreground placeholder:text-foreground/50 font-medium text-base md:text-sm ${errors.name ? "border-red-500" : "border-foreground/30 focus:border-foreground"
                    }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="contact-item">
                <label className="block text-sm md:text-xs font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className={`w-full px-5 py-4 bg-transparent border-2 rounded-xl focus:outline-none transition-all text-foreground placeholder:text-foreground/50 font-medium text-base md:text-sm ${errors.email ? "border-red-500" : "border-foreground/30 focus:border-foreground"
                    }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input with Country Dropdown */}
              <div className="contact-item">
                <label className="block text-sm md:text-xs font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Phone Number {formData.phone && "(Optional)"}
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-2 px-4 py-4 bg-transparent border-2 border-foreground/30 rounded-xl hover:border-foreground/50 transition-colors text-foreground font-medium min-w-[120px] justify-between"
                        aria-expanded={showCountryDropdown}
                        aria-haspopup="listbox"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{selectedCountry.flag}</span>
                          <span className="text-sm">{selectedCountry.dial_code}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu - Improved positioning and responsiveness */}
                      {showCountryDropdown && (
                        <div
                          className="absolute top-full left-0 mt-2 min-w-[280px] md:min-w-[320px] max-w-[90vw] bg-[#fdf3b7] border-2 border-[#53131b]/20 rounded-xl shadow-[0_10px_40px_-10px_rgba(83,19,27,0.3)] z-[60] overflow-hidden text-left"
                          role="listbox"
                          aria-label="Select country"
                        >
                          {/* Search Input */}
                          <div className="p-3 border-b border-[#53131b]/10 bg-[#fdf3b7] sticky top-0 z-10">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#53131b]/50" />
                              <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search country..."
                                className="w-full pl-10 pr-4 py-3 bg-[#53131b]/5 border border-[#53131b]/10 rounded-lg text-[#53131b] placeholder:text-[#53131b]/50 text-sm focus:outline-none focus:border-[#53131b]/30 transition-all font-medium"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>

                          {/* Country List */}
                          <div className="overflow-y-auto max-h-[300px] bg-[#fdf3b7] scrollbar-thin scrollbar-thumb-[#53131b]/20 scrollbar-track-transparent">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => selectCountry(country)}
                                  className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-[#53131b]/10 transition-colors text-left border-b border-[#53131b]/5 last:border-0 ${selectedCountry.code === country.code ? 'bg-[#53131b]/10 font-medium' : ''
                                    }`}
                                  role="option"
                                  aria-selected={selectedCountry.code === country.code}
                                >
                                  <span className="text-lg font-bold w-8 text-center flex-shrink-0 text-[#53131b]">{country.flag}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[#53131b] text-sm truncate font-semibold">{country.name}</div>
                                    <div className="text-[#53131b]/60 text-xs font-mono mt-0.5">{country.dial_code}</div>
                                  </div>
                                  {selectedCountry.code === country.code && (
                                    <CheckCircle className="w-4 h-4 text-[#53131b]" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="p-6 text-center text-[#53131b]/50 text-sm">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-5 py-4 bg-transparent border-2 rounded-xl focus:outline-none transition-all text-foreground placeholder:text-foreground/50 font-medium text-base md:text-sm ${errors.phone ? "border-red-500" : "border-foreground/30 focus:border-foreground"
                          }`}
                        placeholder="123 456 7890"
                        maxLength={20} // Adjusted for flexibility
                      />
                      <div className="mt-1 text-xs text-foreground/40">
                        {formData.phone ? `${formData.phone.replace(/\D/g, '').length}/15 digits` : "Enter phone number (optional)"}
                      </div>
                    </div>
                  </div>

                  {/* Phone error message */}
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}

                  {/* Display full number preview */}
                  {formData.phone && !errors.phone && (
                    <div className="mt-2 text-xs text-foreground/60">
                      Full number: {selectedCountry.dial_code} {formData.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="contact-item">
                <label className="block text-sm md:text-xs font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={5}
                  className={`w-full px-5 py-4 bg-transparent border-2 rounded-xl focus:outline-none transition-all resize-none text-foreground placeholder:text-foreground/50 font-medium text-base md:text-sm ${errors.message ? "border-red-500" : "border-foreground/30 focus:border-foreground"
                    }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
                <div className="mt-1 text-xs text-foreground/40">
                  {formData.message ? `${formData.message.length} characters` : "Minimum 10 characters required"}
                </div>
              </div>

              {/* Submit Button */}
              <button
                ref={sendBtnRef}
                type="submit"
                disabled={isSending}
                className="contact-item group w-full py-4 px-6 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-strong transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative text-sm uppercase tracking-wider"
              >
                <span className="btn-text">{isSending ? "Sending..." : "Send Message"}</span>
                <Send className="send-icon w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="info-cards-container flex flex-col justify-center gap-5">
            <a href="mailto:support@mediamaticstudio.com" className="block">
              <div className="info-card p-5 md:p-6 bg-transparent rounded-2xl border-2 border-foreground/10 flex items-start gap-4 hover:border-foreground/25 transition-colors group">
                <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/5 transition-colors">
                  <Mail className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Email Us</h3>
                  <span className="text-foreground/50 group-hover:text-foreground transition-colors text-sm flex items-center gap-1">
                    support@mediamaticstudio.com <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>

            <a href={`tel:${selectedCountry.dial_code}919629593615`} className="text-foreground/50 text-sm">
              <div className="info-card p-5 md:p-6 bg-transparent rounded-2xl border-2 border-foreground/10 flex items-start gap-4 hover:border-foreground/25 transition-colors group">
                <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/5 transition-colors">
                  <Phone className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Call Us</h3>
                  <p className="text-foreground/50 text-sm">{selectedCountry.dial_code} 96295 93615</p>
                  <p className="text-foreground/35 text-xs mt-0.5">US Toll Free: (+1) (888) 219 5755</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.google.com/maps?q=COVAI+TECH+PARK,+Kalapatty,+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="info-card p-5 md:p-6 bg-transparent rounded-2xl border-2 border-foreground/10 flex items-start gap-4 hover:border-foreground/25 transition-colors group">
                <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/5 transition-colors">
                  <MapPin className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Visit Us</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    COVAI TECH PARK, Site No: 90,<br />
                    Kovai Thiru Nagar, Kalapatty Village,<br />
                    Coimbatore – 641 014
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};