import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".contact-heading",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        ".contact-form",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        ".contact-info-card",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonRef.current || isSubmitting) return;

    setIsSubmitting(true);

    // Button animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    formRef.current?.reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      content: "Covai Tech Park, Kalapatti, Coimbatore",
    },
    {
      icon: Mail,
      title: "Email",
      content: "support@mediamaticstudio.com",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 9am - 8:30pm",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-primary-foreground/10" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-primary-foreground/10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/50 font-body block mb-4">
            Get In Touch
          </span>
          <h2 className="contact-heading font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] max-w-2xl">
            Let's <span className="italic text-primary-foreground/70">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-primary-foreground/60 block mb-2 font-body">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b-2 border-primary-foreground/20 py-4 text-xl focus:border-primary-foreground outline-none transition-colors font-display placeholder:text-primary-foreground/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-primary-foreground/60 block mb-2 font-body">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b-2 border-primary-foreground/20 py-4 text-xl focus:border-primary-foreground outline-none transition-colors font-display placeholder:text-primary-foreground/30"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-primary-foreground/60 block mb-2 font-body">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                className="w-full bg-transparent border-b-2 border-primary-foreground/20 py-4 text-xl focus:border-primary-foreground outline-none transition-colors font-display placeholder:text-primary-foreground/30"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="text-sm text-primary-foreground/60 block mb-2 font-body">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-b-2 border-primary-foreground/20 py-4 text-xl focus:border-primary-foreground outline-none transition-colors resize-none font-display placeholder:text-primary-foreground/30"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-5 rounded-full font-body font-medium text-lg uppercase tracking-wider hover:scale-105 transition-transform duration-300 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info space-y-8 lg:pl-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="contact-info-card flex items-start gap-6 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-xl mb-1">{info.title}</h4>
                  <p className="text-primary-foreground/60 font-body">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
