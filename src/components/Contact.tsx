import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

type SendStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
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

  const runPlaneAnimation = (button: HTMLButtonElement) => {
    // Create the plane SVG elements dynamically
    const plane = document.createElement('div');
    plane.className = 'send-plane';
    plane.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(plane);

    // Animate the plane
    gsap.timeline()
      .set(plane, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        rotation: 0,
        opacity: 1,
      })
      .to(plane, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
      .to(plane, {
        rotation: -45,
        duration: 0.2,
      })
      .to(plane, {
        x: 200,
        y: -200,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          plane.remove();
        },
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonRef.current || sendStatus === 'sending') return;

    const button = buttonRef.current;
    setSendStatus('sending');

    // Button press animation
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
    });

    // Run plane animation
    runPlaneAnimation(button);

    // Hide text temporarily
    const buttonText = button.querySelector('.button-text');
    if (buttonText) {
      gsap.to(buttonText, {
        opacity: 0,
        y: -10,
        duration: 0.2,
      });
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success animation
    setSendStatus('success');
    
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });

    if (buttonText) {
      gsap.to(buttonText, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.1,
      });
    }

    // Success pulse effect
    gsap.fromTo(button,
      { boxShadow: '0 0 0 0 hsl(var(--primary-foreground) / 0.5)' },
      {
        boxShadow: '0 0 0 20px hsl(var(--primary-foreground) / 0)',
        duration: 0.6,
        ease: 'power2.out',
      }
    );

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset after delay
    setTimeout(() => {
      setSendStatus('idle');
      formRef.current?.reset();
    }, 3000);
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

  const getButtonContent = () => {
    switch (sendStatus) {
      case 'sending':
        return (
          <span className="button-text flex items-center gap-2">
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
            Sending...
          </span>
        );
      case 'success':
        return (
          <span className="button-text flex items-center gap-2">
            <Check className="w-5 h-5" />
            Sent!
          </span>
        );
      default:
        return (
          <span className="button-text flex items-center gap-3">
            Send Message
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </span>
        );
    }
  };

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
          <h2 className="contact-heading font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] max-w-2xl font-bold">
            Let's <span className="italic font-normal text-primary-foreground/70">Connect</span>
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
              disabled={sendStatus === 'sending'}
              className={`group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-body font-semibold text-lg uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed min-w-[220px] ${
                sendStatus === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary-foreground text-primary hover:scale-105'
              }`}
            >
              {getButtonContent()}
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info space-y-8 lg:pl-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="contact-info-card flex items-start gap-6 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-xl mb-1 font-semibold">{info.title}</h4>
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
