import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin, CheckCircle, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
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

      // Form elements
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

      // Info cards
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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const btn = sendBtnRef.current;
  if (!btn) return;

  setIsSending(true);

  /* =====================
     BUTTON SEND ANIMATION
  ====================== */
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

  /* =====================
     API CALL → DJANGO
  ====================== */
  try {
    const token = localStorage.getItem("accessToken"); // JWT token

    const response = await fetch(
      "http://127.0.0.1:8000/api/contact/send/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    /* =====================
       SUCCESS
    ====================== */
    toast.success("Message sent successfully!", {
      description: "We'll get back to you soon.",
      icon: <CheckCircle className="w-5 h-5" />,
    });

    setFormData({ name: "", email: "", message: "" });

  } catch (error) {
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="contact-item">
                <label className="block text-[12px] font-bold text-foreground/60 mb-2 uppercase tracking-[0.15em]">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-transparent border-2 border-foreground/15 rounded-xl focus:border-foreground focus:outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium text-sm"
                  placeholder="Your name"
                />
              </div>

              <div className="contact-item">
                <label className="block text-[12px] font-bold text-foreground/60 mb-2 uppercase tracking-[0.15em]">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-transparent border-2 border-foreground/15 rounded-xl focus:border-foreground focus:outline-none transition-all text-foreground placeholder:text-foreground/25 font-medium text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div className="contact-item">
                <label className="block text-[12px] font-bold text-foreground/60 mb-2 uppercase tracking-[0.15em]">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-transparent border-2 border-foreground/15 rounded-xl focus:border-foreground focus:outline-none transition-all resize-none text-foreground placeholder:text-foreground/25 font-medium text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                ref={sendBtnRef}
                type="submit"
                disabled={isSending}
                className="contact-item group w-full py-4 px-6 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-strong transition-all duration-300 disabled:opacity-70 overflow-hidden relative text-sm uppercase tracking-wider"
              >
                <span className="btn-text">{isSending ? "Sending..." : "Send Message"}</span>
                <Send className="send-icon w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="info-cards-container flex flex-col justify-center gap-5">
            <a href="mailto:support@mediamaticstudio.com"
                               className="block">
            <div className="info-card p-5 md:p-6 bg-transparent rounded-2xl border-2 border-foreground/10 flex items-start gap-4 hover:border-foreground/25 transition-colors group">
              <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/5 transition-colors">
                <Mail className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Email Us</h3>
                <a href="mailto:support@mediamaticstudio.com" className="text-foreground/50 hover:text-foreground transition-colors text-sm flex items-center gap-1">
                  support@mediamaticstudio.com <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div></a>
            <a href="tel:+919629593615" className="text-foreground/50 text-sm">
            <div className="info-card p-5 md:p-6 bg-transparent rounded-2xl border-2 border-foreground/10 flex items-start gap-4 hover:border-foreground/25 transition-colors group">
              <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/5 transition-colors">
                <Phone className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wider">Call Us</h3>
                <p className="text-foreground/50 text-sm">+91 96295 93615</p>
                <p className="text-foreground/35 text-xs mt-0.5">US Toll Free: (+1) (888) 219 5755</p>
              </div>
            </div></a>
            
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
            </div></a>
          </div>
        </div>
      </div>
    </section>
  );
};
