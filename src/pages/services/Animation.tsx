import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Clapperboard, CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "High-quality 2D & 3D animation videos",
  "Explainer & branding videos",
  "Concept development & storyboarding",
  "Script writing & production",
  "Customized video solutions",
  "End-to-end animation services",
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
    window.scrollTo({ top: 0, behavior: "smooth" });

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
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".feature-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-list",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>2D & 3D Animation Services | MediaMatic Studio</title>
        <meta
          name="description"
          content="Creative studio transforming business ideas into compelling visual stories through 2D & 3D animation."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main ref={sectionRef}>
          {/* HERO */}
          <section className="pt-32 pb-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-8 opacity-70 hover:opacity-100"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <div className="service-hero-content max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <Clapperboard className="w-7 h-7" />
                  </div>
                  <span className="uppercase tracking-widest text-sm opacity-70">
                    Service
                  </span>
                </div>

                <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold mb-6">
                  2D & 3D{" "}
                  <span className="italic font-normal opacity-70">
                    Animation
                  </span>
                </h1>

                <p className="text-xl opacity-80 leading-relaxed">
                  Creative Studio that helps you go ahead. At MediaMatic Studio,
                  we transform business ideas into compelling visual stories
                  through world-class animation.
                </p>
              </div>
            </div>
          </section>

          {/* CONTENT */}
          <section className="py-20">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="content-blocks space-y-12">
                <div className="content-block">
                  <h2 className="text-3xl font-bold mb-4">What We Do</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Our team of creative professionals specializes in high-quality
                    2D & 3D animation videos, explainer videos, branding videos,
                    and more. We offer customized solutions tailored to meet
                    your specific business goals—from concept development and
                    storyboarding to final production.
                  </p>
                </div>

                <div className="content-block">
                  <h2 className="text-3xl font-bold mb-4">
                    2D & 3D Animation Videos
                  </h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Animation has evolved into a powerful medium for visual
                    storytelling. At MediaMatic Studio, we explore the limitless
                    potential of animation to help brands communicate ideas
                    effectively and creatively across industries.
                  </p>
                </div>

                <div className="content-block">
                  <h2 className="text-2xl font-bold mb-3">2D Animation</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    2D animation is a timeless art form known for its simplicity
                    and charm. From engaging advertisements to expressive short
                    films, our skilled animators breathe life into every frame,
                    creating memorable characters and stories.
                  </p>
                </div>

                <div className="content-block">
                  <h2 className="text-2xl font-bold mb-3">3D Animation</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    3D animation adds depth and realism through cutting-edge
                    technology. Our team crafts lifelike characters and
                    breathtaking environments that immerse audiences and leave
                    a lasting impact.
                  </p>
                </div>
              </div>

              {/* BENEFITS */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold mb-8">
                  Benefits of 2D & 3D Animation
                </h3>

                <div className="features-list grid md:grid-cols-2 gap-4">
                  {benefits.map((item, i) => (
                    <div
                      key={i}
                      className="feature-item flex items-center gap-4 p-4 border rounded-xl bg-card"
                    >
                      <CheckCircle className="text-accent w-5 h-5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                  className="mt-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold"
                >
                  Get Started <ArrowRight size={18} />
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
