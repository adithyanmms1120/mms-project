import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Clapperboard, CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO"; import { generateBreadcrumbSchema, generateServiceSchema, generateOrganizationSchema } from "@/utils/seo-schemas";
gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: "2D Animation", desc: "A timeless art form known for its simplicity and charm. Ideal for characters and stories with a classic feel." },
  { title: "3D Animation", desc: "Adds depth and realism using cutting-edge technology. Lifelike characters and breathtaking environments." },
  { title: "Explainer Videos", desc: "Simplify complex ideas through engaging visual narratives that capture attention." },
  { title: "Branding Videos", desc: "Strengthen your brand identity with customized motion graphics and visual storytelling." },
];

const comparisonData = [
  { feature: "Dimension", d2: "Flat, two-dimensional", d3: "Depth, three-dimensional" },
  { feature: "Production Time", d2: "Faster and cost-effective", d3: "Longer and resource-intensive" },
  { feature: "Visual Style", d2: "Stylized and simplified", d3: "Realistic and immersive" },
  { feature: "Best For", d2: "Explainers, ads, social media", d3: "Product demos, cinematic content" },
  { feature: "Budget", d2: "Lower budget friendly", d3: "Higher production cost" },
  { feature: "Flexibility", d2: "Easy revisions and updates", d3: "Complex changes require more effort" },
];

const benefits = [
  "Engaging animations that enhance brand storytelling",
  "Timeless creativity of classic 2D animation",
  "Depth and realism with cutting-edge 3D animation",
  "Seamless integration of live-action and digital visuals",
  "Personalized service from skilled animators",
  "Full-service studio handling every project aspect",
  "Unmatched creativity and innovation",
];

const Animation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-hero-content > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".content-block",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".content-blocks",
            start: "top 95%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="2D & 3D Animation Services | MediaMatic Studio"
        description="Creative studio transforming business ideas into compelling visual stories through 2D & 3D animation. Expert explainer videos, branding videos, and custom animation solutions."
        canonical="/services/animation/"
        keywords="2D animation, 3D animation, explainer videos, branding videos, animated videos, storyboarding, video production, animation studio, MediaMatic Studio"
        structuredData={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services/" },
            { name: "Animation", url: "/services/animation/" }
          ]),
          generateServiceSchema({
            name: "Animation Services",
            description: "Professional 2D and 3D animation services including explainer videos, branding animations, and video production."
          }),
          generateOrganizationSchema()
        ]}
      />

      <div className="min-h-screen bg-background overflow-hidden">
        <main ref={sectionRef}>
          {/* HERO */}
          <section className="pt-24 pb-16 md:pt-40 md:pb-24 bg-[#652b32] text-[#faf3e0] relative">
            <div className="container mx-auto px-6">
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 mb-8 opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={18} /> Back
              </Link>

              <div className="service-hero-content max-w-4xl relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Clapperboard className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <span className="uppercase tracking-widest text-[10px] md:text-sm font-bold">
                    Creative Service
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  2D & 3D{" "}
                  <span className="italic font-normal text-[#FACC15]">
                    Animation
                  </span>
                </h1>

                <p className="text-base md:text-xl opacity-80 leading-relaxed max-w-2xl">
                  Animated Videos for Business: Transform Your Brand Identity with Creative Animation. At MediaMatic Studio, we transform complex ideas into compelling visual stories.
                </p>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          </section>

          {/* CONTENT & COMPARISON */}
          <section className="py-16 md:py-24 px-4 bg-background">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <div className="content-blocks space-y-8">
                  <div className="content-block">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#652b32]">What We Do</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      Our team of creative professionals specializes in high-quality 2D & 3D animation videos, explainer videos, branding videos, and more. We offer customized solutions tailored to meet your specific business goals—from concept development and storyboarding to final production.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-secondary/30 border border-border/50">
                        <CheckCircle className="text-[#652b32] w-5 h-5 mb-3" />
                        <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                        <p className="text-[11px] text-foreground/60 leading-normal">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-[#652b32]/5 rounded-[2rem] -rotate-2 -z-10" />
                  <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-border/50">
                    <h3 className="text-xl font-bold mb-6 text-[#652b32]">Why Animation Works</h3>
                    <div className="space-y-4">
                      {benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#FACC15]/20 flex-shrink-0 flex items-center justify-center mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#652b32]" />
                          </div>
                          <p className="text-sm text-foreground/70 leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPARISON TABLE */}
              <div className="mt-24">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#652b32] mb-4">2D vs 3D Animation</h2>
                  <p className="text-foreground/60 max-w-2xl mx-auto">
                    Compare the strengths of each medium to find the perfect fit for your brand's next project.
                  </p>
                </div>

                <div className="overflow-x-auto pb-6">
                  <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#652b32]/10 min-w-[600px]">
                    <thead>
                      <tr className="bg-[#652b32] text-[#faf3e0]">
                        <th className="py-6 px-8 text-left font-bold uppercase tracking-wider text-xs">Feature</th>
                        <th className="py-6 px-8 text-left font-bold uppercase tracking-wider text-xs">2D Animation</th>
                        <th className="py-6 px-8 text-left font-bold uppercase tracking-wider text-xs">3D Animation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {comparisonData.map((row, i) => (
                        <tr key={i} className="hover:bg-[#652b32]/[0.02] transition-colors group">
                          <td className="py-5 px-8 font-bold text-[#652b32] text-sm">{row.feature}</td>
                          <td className="py-5 px-8 text-foreground/70 text-sm group-hover:text-foreground transition-colors">{row.d2}</td>
                          <td className="py-5 px-8 text-foreground/70 text-sm group-hover:text-foreground transition-colors">{row.d3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CALL TO ACTION */}
              <div className="mt-20 text-center">
                <button
                  onClick={() => {
                    navigate("/contact-us/");
                  }}
                  className="inline-flex items-center gap-3 bg-[#652b32] text-[#faf3e0] px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                  Start Your Animation Project <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Animation;
