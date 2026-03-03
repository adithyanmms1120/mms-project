import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Megaphone,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  MousePointer2,
  Star,
  Target,
  BarChart3,
  TrendingUp,
  Share2,
  Mail,
  Loader2,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchRecentPosts } from "@/services/api";
import BlogCard from "../Blog/components/BlogCard";
import StatsCard from "@/components/StatsCard";
import { MarketingAuditDialog } from "@/components/MarketingAuditDialog";
import { generateBreadcrumbSchema, generateServiceSchema, generateOrganizationSchema } from "@/utils/seo-schemas";

// Service Icons
import seoIcon from "@/assets/digital/seo.png";
import smoIcon from "@/assets/digital/social-media.png";
import semIcon from "@/assets/digital/sem.png";
import smmIcon from "@/assets/digital/digital-campaign.png";
import emailIcon from "@/assets/digital/email-marketing.png";
import googleAdsIcon from "@/assets/digital/logotype.png";

// Why Choose Us Icons
import provenIcon from "@/assets/digital/track-back.png";
import leadershipIcon from "@/assets/digital/leadership.png";
import expertsIcon from "@/assets/digital/training.png";
import clientIcon from "@/assets/digital/handshake.png";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: seoIcon,
    title: "SEO – Search Engine Optimization",
    desc: "Our search engine optimization works to enhance your ranking by search engines. We specialize in optimization of keywords, technical optimization, high quality content and backlink. We are a premier digital marketing agency for small business, and we assist small business brands to rise higher in ranking and to draw organic traffic which translates into loyal customers.",
  },
  {
    icon: <Share2 className="w-9 h-9 text-[#faf3e0] group-hover:text-[#652b32] transition-colors" />,
    title: "SMO – Social Media Optimization",
    desc: "Our services take your brand to the next level on social networks in the form of optimized profiles, engaging content, and strategies. We are a reputable social media marketing company, so your brand voice will be consistent and credibility, reach, and loyal communities will be formed.",
  },
  {
    icon: semIcon,
    title: "SEM – Search Engine Marketing",
    desc: "Our SEM programs are instant visibility on the basis of targeted paid ads. We develop high performing campaigns which optimize on ROI with accurate targeting of the audience. Our digital marketing agency service is ongoing optimization of the performance of the ads to ensure they are better.",
  },
  {
    icon: smmIcon,
    title: "Social Media Marketing",
    desc: "We create social media campaigns that are data-driven and create awareness and leads. Since we do content production and paid promotion, our strategies enable businesses to compete with the leading marketing agencies without losing brand consistency or audience engagement.",
  },
  {
    icon: emailIcon,
    title: "Email Marketing",
    desc: "Our email marketing plans foster leads and customer loyalty. Our customized campaigns will attract repeat business and relationships. It is also one of the cheapest digital marketing services to grow a small business.",
  },
  {
    icon: googleAdsIcon,
    title: "Google Ads Marketing",
    desc: "We develop very specific Google Ads campaigns to generate quality traffic and sales. The team we work under is dedicated to the research of key words, optimization of ads, and monitoring of performance in order to guarantee the highest returns on any advertising investment.",
  },
];

const whyChooseUs = [
  {
    icon: provenIcon,
    title: "Proven Strategies",
    desc: "Our digital marketing firm employs performance-based and tested strategies to deliver quantifiable success. Through the analysis of trends, competitors, and audience behavior, we develop campaigns that help to generate continuous traffic, lead, and conversion to businesses in any industry.",
  },
  {
    icon: leadershipIcon,
    title: "Market Leadership",
    desc: "We assist brands to form authority and good market position. Our creative digital marketing offerings and brand-building strategies promise your business to remain on top of the competition and be perceived as an industry leader.",
  },
  {
    icon: expertsIcon,
    title: "Marketing Experts",
    desc: "Our team comprises highly qualified individuals who have specialization in SEO, paid advertising, social media, and content marketing. We also keep abreast with industry trends to introduce contemporary digital marketing agency services that progress real outcomes.",
  },
  {
    icon: clientIcon,
    title: "Client-First Approach",
    desc: "We value transparency, communication and quantitative growth. Being a marketing firm that caters to small business and the entrepreneur, we will carefully strategize depending on the objectives of the client so that there are long-term arrangements and eventual success.",
  },
];

const faqs = [
  {
    q: "Why Should Businesses Invest in Digital Marketing?",
    a: "Online marketing enhances visibility, captures targeted customers, and boosts sales online. It provides quantifiable outcomes, improved ROI, and scalable plans in contrast to ordinary marketing tactics.",
  },
  {
    q: "What is Digital Marketing and How Can It Benefit My Business?",
    a: "Digital marketing consists of SEO, social media marketing, paid advertisements, email marketing and content plans. Such approaches assist companies to create leads, enhance brand awareness, and elevate customer interaction.",
  },
  {
    q: "What are the best digital marketing services to use by small businesses?",
    a: "SEO, social media marketing, Google Ads, and email marketing are among the best digital marketing services to use by small businesses. They offer low cost, focused growth initiatives.",
  },
  {
    q: "Why Should I Choose Mediamatic Studio as My Digital Marketing Agency?",
    a: "Mediamatic Studio will provide tailored plans, open reporting, and result-based campaigns. We are highly skilled in the services of the digital marketing agency with a guarantee of growth and increased ROI.",
  },
  {
    q: "How Is Mediamatic Studio Different from Other Digital Marketing Agencies?",
    a: "We blend creativity, information, and strategy and approach the client first. We concentrate on long-term relationships, quantifiable outcomes, and long-term brand development.",
  },
  {
    q: "Can Mediamatic Studio Manage My Complete Digital Marketing Strategy?",
    a: "Yes. We specialize in SEO, paid ads, social media, content and email marketing, which makes us a one-roof digital marketing firm.",
  },
];

const stats = [
  { value: "2+", label: "Branch office " },
  { value: "118+", label: "Web & App Projects" },
  { value: "75+", label: "Corporate Video Shoots" },
  { value: "124+", label: "Digital Marketing" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const DigitalMarketing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Fetch recent posts
  const { data: recentPosts, isLoading } = useQuery({
    queryKey: ["recent-posts-marketing"],
    queryFn: () => fetchRecentPosts(3),
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".service-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-grid", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".why-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".why-grid", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".cta-block",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-block", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".faq-block",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-block", start: "top 95%" },
        }
      );

      gsap.fromTo(
        ".recent-posts-block",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".recent-posts-block", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Top Digital Marketing Agency for Brands - Contact Now"
        description="Partner with a top digital marketing agency that turns clicks into customers and grows traffic, leads, and sales—book a free call now!"
      />

      <div ref={sectionRef} className="min-h-screen">
        {/* Hero */}
        <section className="bg-[#652b32] relative overflow-hidden text-[#faf3e0]">
          {/* Back Button */}
          <div className="absolute top-24 left-6 z-20">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-[#faf3e0]/60 hover:text-[#faf3e0] transition-colors font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </Link>

          </div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#9a5a2a] blur-[120px]" />
            <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#9a5a2a] blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-10 md:pt-40 md:pb-12">
            <div className="hero-anim max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-[#faf3e0]/10 border border-[#faf3e0]/20 rounded-full px-4 py-2 mb-6">
                <Megaphone className="w-4 h-4 text-[#faf3e0]" />
                <span className="text-[#faf3e0] text-sm font-medium">Digital Marketing Agency</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-[#faf3e0] leading-tight mb-5">
                Top Digital Marketing Agency That{" "}
                <span className="text-[#FACC15]">Generates Traffic</span> and Leads
              </h1>

              <p className="text-[#faf3e0]/80 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
                A data-driven digital marketing agency assists companies to expand quicker, target the appropriate market, and build qualified leads. We are a strategy-driven, creatively-driven, data-driven campaign company focused on achieving measurable success on shows of all sizes at Mediamatic Studio.
              </p>

              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#faf3e0] text-[#652b32] px-8 py-4 rounded-full font-semibold shadow-xl hover:bg-white transition-all"
              >
                Get Your Free Digital Marketing Audit <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-10 md:py-14 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              {/* <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Expertise</span> */}
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                What Do We Offer to Our Clients?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The services of our digital marketing company are aimed at making our company more visible, engaging, and selling. You can utilize our services to either undertake small business or enterprise level campaigns such as digital marketing services that deliver measurable outcomes.
              </p>
            </div>

            <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="service-card group bg-[#652b32] rounded-xl p-7 shadow-xl hover:shadow-2xl border border-white/10 hover:border-[#652b32]/20 transition-all duration-300 hover:bg-[#faf3e0] hover:-translate-y-3 hover:scale-[1.02]"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#652b32]/10 transition-colors">
                    {typeof s.icon === 'string' ? (
                      <img src={s.icon} alt={s.title} className="w-9 h-9 object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all" />
                    ) : (
                      s.icon
                    )}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white group-hover:text-[#652b32] mb-3 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-[#652b32]/80 transition-colors">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="pt-10 pb-4 md:pt-14 md:pb-6 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              {/* <span className="text-accent font-medium text-sm uppercase tracking-wider">Why Us</span> */}
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Why Choose Our Mediamatic Studio Digital Marketing Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mediamatic Studio is one of the top marketing agencies to work with as a small business since it provides clear, information-oriented, and growth-driven marketing plans based on the needs of your brand.
              </p>
            </div>

            <div className="why-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, i) => (
                <div
                  key={i}
                  className="why-card group bg-[#652b32] rounded-xl p-7 shadow-xl border border-white/10 hover:border-[#652b32]/20 transition-all duration-300 text-center hover:bg-[#faf3e0] hover:-translate-y-3 hover:scale-[1.02]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#652b32]/10 transition-colors">
                    <img src={item.icon} alt={item.title} className="w-9 h-9 object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white group-hover:text-[#652b32] mb-3 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-[#652b32]/80 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Current Stats Section */}
            <div className="mt-12 mb-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-[#652b32]">
                Our Current Stats
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                  >
                    <StatsCard {...s} index={i} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 md:py-14 bg-[#faf3e0]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="cta-block bg-[#652b32] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden text-[#faf3e0]">
              {/* Doodles */}
              <div className="absolute top-10 left-10 opacity-20 hidden md:block animate-float">
                <Sparkles className="w-12 h-12" />
              </div>
              <div className="absolute bottom-10 right-10 opacity-20 hidden md:block animate-float" style={{ animationDelay: '1s' }}>
                <Zap className="w-12 h-12" />
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10">
                <div className="w-64 h-64 border-[20px] border-white/20 rounded-full" />
              </div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 opacity-10">
                <div className="w-64 h-64 border-[20px] border-white/20 rounded-full" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Willing to do Business with the{" "}
                  <span className="text-[#FACC15]">Best Digital Marketing Agency?</span>
                </h2>
                <p className="text-[#faf3e0]/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                  Collaborate with Mediamatic Studio - the most dedicated digital marketing firm that focuses on growth, visibility, and revenue generation. We should develop strong tactics that will transform clicks into customers and grow your business to a higher level.
                </p>
                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#faf3e0] text-[#652b32] px-10 py-4 rounded-full font-semibold shadow-xl hover:bg-white transition-all text-lg"
                >
                  Get Started Today <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 md:py-16 bg-muted/50 relative overflow-hidden">
          {/* FAQ Doodles */}
          <div className="absolute top-20 left-[5%] opacity-15 animate-float hidden lg:block">
            <Megaphone className="w-16 h-16 text-[#652b32]" />
          </div>
          <div className="absolute bottom-20 right-[5%] opacity-15 animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
            <Target className="w-16 h-16 text-[#652b32]" />
          </div>
          <div className="absolute top-1/4 right-[8%] opacity-15 animate-float hidden lg:block" style={{ animationDelay: '0.8s' }}>
            <BarChart3 className="w-12 h-12 text-[#652b32]" />
          </div>
          <div className="absolute bottom-2/3 left-[12%] opacity-10 animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
            <TrendingUp className="w-8 h-8 text-[#652b32]" />
          </div>
          <div className="absolute top-1/3 right-[15%] opacity-10 animate-float hidden lg:block" style={{ animationDelay: '4s' }}>
            <Share2 className="w-20 h-20 text-[#652b32]" />
          </div>
          <div className="absolute bottom-1/3 left-[8%] opacity-15 animate-float hidden lg:block" style={{ animationDelay: '2.2s' }}>
            <Mail className="w-12 h-12 text-[#652b32]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 opacity-[0.03] scale-150 pointer-events-none">
            <MousePointer2 className="w-96 h-96 text-[#652b32]" />
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-1/2 right-[-50px] w-48 h-48 border-4 border-dashed border-[#652b32]/10 rounded-full hidden md:block animate-spin-slow" />
          <div className="absolute bottom-1/4 left-[-40px] w-32 h-32 bg-[#652b32]/10 rounded-xl rotate-12 blur-sm hidden md:block" />
          <div className="absolute top-10 right-1/4 w-12 h-12 border-2 border-[#652b32]/10 rounded-full hidden md:block" />
          <div className="absolute bottom-10 left-1/3 w-20 h-20 border border-[#652b32]/5 rounded-full hidden md:block animate-float" />

          {/* Squiggly line SVG */}
          <svg className="absolute top-1/2 left-[15%] w-32 h-32 opacity-[0.05] hidden lg:block" viewBox="0 0 100 100">
            <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="#652b32" strokeWidth="2" />
          </svg>
          <svg className="absolute bottom-1/4 right-[20%] w-40 h-10 opacity-[0.05] hidden lg:block" viewBox="0 0 200 40">
            <path d="M0,20 Q50,40 100,20 T200,20" fill="none" stroke="#652b32" strokeWidth="3" strokeDasharray="5,5" />
          </svg>

          {/* Hand-drawn Arrow */}
          <svg className="absolute top-[10%] right-[15%] w-24 h-24 opacity-[0.07] -rotate-12 hidden lg:block" viewBox="0 0 100 100">
            <path d="M20,20 Q50,20 80,50 M80,50 L60,40 M80,50 L70,70" fill="none" stroke="#652b32" strokeWidth="3" strokeLinecap="round" />
          </svg>

          {/* Scribble Loop */}
          <svg className="absolute bottom-[5%] left-[20%] w-20 h-20 opacity-[0.05] hidden lg:block" viewBox="0 0 100 100">
            <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="#652b32" strokeWidth="4" strokeLinecap="round" />
            <path d="M20,60 Q40,20 60,60 T100,60" fill="none" stroke="#652b32" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Extra stars */}
          <div className="absolute top-1/3 left-[25%] opacity-5 animate-pulse hidden lg:block">
            <Star className="w-4 h-4 text-[#652b32]" fill="currentColor" />
          </div>
          <div className="absolute top-2/3 right-[30%] opacity-5 animate-pulse hidden lg:block" style={{ animationDelay: '2s' }}>
            <Star className="w-6 h-6 text-[#652b32]" fill="currentColor" />
          </div>

          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="faq-block">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card rounded-xl border border-border px-6 shadow-card"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold text-card-foreground hover:text-accent transition-colors py-5 text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* SEO SMO SEM Section */}
        {/* <section className="py-20 bg-[#652b32] text-[#faf3e0] overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 opacity-80">
              <span className="text-4xl md:text-7xl font-black tracking-tighter hover:opacity-100 transition-opacity cursor-default">SEO</span>
              <span className="text-4xl md:text-7xl font-black tracking-tighter hover:opacity-100 transition-opacity cursor-default">SMO</span>
              <span className="text-4xl md:text-7xl font-black tracking-tighter hover:opacity-100 transition-opacity cursor-default">SEM</span>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 blur-3xl translate-y-1/2 -translate-x-1/2 rounded-full" />
          </div>
        </section> */}

        {/* Recent Blog Posts */}
        <section className="py-10 md:py-14 bg-[#faf3e0]">
          <div className="container mx-auto px-6">
            <div className="recent-posts-block">
              <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-[#652b32] mb-4 uppercase tracking-tight">
                    Recent Blog
                  </h2>
                  <p className="text-[#652b32]/60 text-lg font-medium">
                    The latest insights from our digital marketing team
                  </p>
                </div>
                <Link to="/blog/" className="flex items-center gap-2 text-[#652b32] font-black uppercase tracking-widest text-[10px] bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-[#652b32]/5">
                  View All Posts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-10 h-10 text-[#652b32] animate-spin opacity-20" />
                  <p className="text-[#652b32]/40 font-bold uppercase tracking-widest text-[10px]">Fetching latest posts...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts?.slice(0, 3).map((post: any) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
      <Footer />
      <MarketingAuditDialog
        isOpen={isAuditModalOpen}
        onOpenChange={setIsAuditModalOpen}
      />
    </>
  );
};

export default DigitalMarketing;
