import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  getServiceBySlug,
  getSubServiceBySlug,
  getAllServices,
} from "@/data/services-config";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateOrganizationSchema,
} from "@/utils/seo-schemas";

gsap.registerPlugin(ScrollTrigger);

const ServiceSubPage = () => {
  const { serviceSlug, subSlug } = useParams<{
    serviceSlug: string;
    subSlug: string;
  }>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  const subService = serviceSlug && subSlug ? getSubServiceBySlug(serviceSlug, subSlug) : undefined;
  const allServices = getAllServices();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-hero-content > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".benefit-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".benefits-list", start: "top 95%" },
        }
      );

      gsap.fromTo(
        ".related-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".related-services", start: "top 95%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [serviceSlug, subSlug]);

  if (!service || !subService) {
    return (
      <>
        <SEO
          title="Service Not Found | MediaMatic Studio"
          description="The service page you're looking for could not be found."
        />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate("/#services")}
            className="text-primary hover:underline flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>

        </div>
      </>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services/" },
    { name: service.name, url: `/services/${serviceSlug}/` },
    { name: subService.name, url: `/services/${serviceSlug}/${subSlug}/` },
  ];

  const relatedSubServices = service.subServices.filter(
    (sub) => sub.slug !== subSlug
  );

  return (
    <>
      <SEO
        title={`${subService.name} | ${service.name} | MediaMatic Studio`}
        description={subService.description}
        canonical={`/services/${serviceSlug}/${subSlug}/`}
        keywords={`${service.name}, ${subService.name}, ${subService.shortName}, MediaMatic Studio`}
        image="https://mediamaticstudio.com/og-image.png"
        structuredData={[
          generateBreadcrumbSchema(breadcrumbs),
          generateServiceSchema({
            name: subService.name,
            description: subService.longDescription,
          }),
          generateOrganizationSchema(),
        ]}
      />

      <div className="min-h-screen bg-background" ref={sectionRef}>
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/30 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <button
                onClick={() => navigate(`/services/${serviceSlug}/`)}
                className="mb-8 flex items-center gap-2 text-sm hover:opacity-80 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {service.name}
              </button>

              <div className="service-hero-content">
                <div>
                  <p className="text-accent mb-2 font-medium">{service.name}</p>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {subService.name}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
                    {subService.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="py-20 bg-background border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {subService.longDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          {subService.benefits && subService.benefits.length > 0 && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
                <div className="benefits-list grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {subService.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-accent mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{benefit}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related Services Section */}
          {relatedSubServices.length > 0 && (
            <section className="py-20 bg-background border-b border-border">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">
                  Other {service.name} Services
                </h2>
                <div className="related-services grid md:grid-cols-3 gap-8">
                  {relatedSubServices.slice(0, 3).map((related) => (
                    <div
                      key={related.slug}
                      className="related-item p-6 bg-muted/50 rounded-lg hover:bg-muted transition cursor-pointer"
                      onClick={() => navigate(`/services/${serviceSlug}/${related.slug}/`)}
                    >
                      <h3 className="font-bold text-lg mb-2">{related.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {related.description}
                      </p>
                      <span className="text-accent font-semibold flex items-center gap-2">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Let's discuss how {subService.shortName} can help grow your business.
              </p>
              <button
                onClick={() => navigate("/get-quote/")}
                className="bg-accent hover:bg-accent/90 text-primary px-8 py-3 rounded-lg font-semibold transition"
              >
                Get a Free Quote
              </button>
            </div>
          </section>

          {/* Other Services */}
          {allServices.length > 0 && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">
                  Our Other Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allServices.map((svc) => (
                    <div
                      key={svc.slug}
                      className="p-6 bg-background rounded-lg border border-border hover:border-accent transition cursor-pointer"
                      onClick={() => navigate(`/services/${svc.slug}/`)}
                    >
                      <h3 className="font-bold text-lg mb-2">{svc.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {svc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServiceSubPage;
