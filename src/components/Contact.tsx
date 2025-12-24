import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

type SendStatus = "idle" | "sending" | "success";

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-info-card",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonRef.current || sendStatus === "sending") return;

    setSendStatus("sending");

    await new Promise((r) => setTimeout(r, 1200));

    setSendStatus("success");

    toast({
      title: "Message sent!",
      description: "We’ll get back to you within 24 hours.",
    });

    setTimeout(() => {
      setSendStatus("idle");
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
      content: "Mon–Fri: 9am – 8:30pm",
    },
  ];

return (
  <section
    id="contact"
    ref={sectionRef}
    className="py-32 relative overflow-hidden"
    style={{ backgroundColor: "#fdf3b7", color: "rgb(83,19,27)" }}
  >
    {/* Decorative rings */}
    <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-[rgba(83,19,27,0.15)]" />
    <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-[rgba(83,19,27,0.15)]" />

    <div className="container mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="mb-16">
        <span className="text-xs uppercase tracking-[0.3em] opacity-60 block mb-4">
          Get In Touch
        </span>
        <h2 className="contact-heading text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-bold">
          Let’s{" "}
          <span className="italic font-normal opacity-70">Connect</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-form space-y-8"
        >
          {["Name", "Email", "Subject"].map((label, i) => (
            <div key={i}>
              <label className="text-sm opacity-60 block mb-2">
                {label}
              </label>
              <input
                required
                className="w-full bg-transparent border-b-2 border-[rgba(83,19,27,0.3)] py-4 text-xl focus:border-[rgb(83,19,27)] outline-none"
              />
            </div>
          ))}

          <div>
            <label className="text-sm opacity-60 block mb-2">
              Message
            </label>
            <textarea
              rows={4}
              required
              className="w-full bg-transparent border-b-2 border-[rgba(83,19,27,0.3)] py-4 text-xl focus:border-[rgb(83,19,27)] outline-none resize-none"
            />
          </div>

          <button
            ref={buttonRef}
            type="submit"
            disabled={sendStatus === "sending"}
            className={`inline-flex items-center justify-center px-10 py-5 rounded-full font-semibold uppercase tracking-wider transition-all min-w-[220px]
              ${
                sendStatus === "success"
                  ? "bg-green-500 text-white"
                  : "bg-[rgb(83,19,27)] text-[#fdf3b7] hover:scale-105"
              }`}
          >
            {sendStatus === "success" ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" /> Sent
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {/* Info */}
        <div className="contact-info space-y-8 lg:pl-16">
          {contactInfo.map((info, i) => (
            <div
              key={i}
              className="contact-info-card flex items-start gap-6 p-6 rounded-2xl border border-[rgba(83,19,27,0.2)] hover:bg-[rgba(83,19,27,0.05)] transition"
            >
              <div className="w-14 h-14 rounded-xl bg-[rgba(83,19,27,0.1)] flex items-center justify-center">
                <info.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  {info.title}
                </h4>
                <p className="opacity-70">{info.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP SECTION */}
      <div
        className="map-section rounded-3xl overflow-hidden border border-[rgba(83,19,27,0.2)] shadow-lg"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.883535925273!2d77.04237169999999!3d11.047357800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859e917e14165%3A0x862614d85d3a08f9!2sMediamatic%20Studio%20-%20Complete%20Digital%20Solution!5e0!3m2!1sen!2sin!4v1756126340458!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

};
