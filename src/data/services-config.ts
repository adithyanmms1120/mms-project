/**
 * Services Configuration
 * Defines all main services and their sub-services
 */

export interface SubService {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon?: string;
  benefits?: string[];
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon?: string;
  subServices: SubService[];
}

export const servicesConfig: Record<string, Service> = {
  "digital-marketing": {
    slug: "digital-marketing",
    name: "Digital Marketing Services",
    description: "Data-driven digital marketing solutions including SEO, SMM, SEM, email marketing, and Google Ads.",
    longDescription: "Comprehensive digital marketing strategies to increase conversions, engagement, and visibility across all digital channels.",
    subServices: [
      {
        slug: "seo",
        name: "Search Engine Optimization (SEO)",
        shortName: "SEO",
        description: "Drive organic traffic with advanced SEO strategies and techniques.",
        longDescription: "Improve your website's visibility in search results through keyword research, on-page optimization, technical SEO, link building, and content strategy. We help you rank for high-intent keywords that bring qualified traffic.",
        benefits: ["Increased organic traffic", "Higher search rankings", "Long-term visibility", "Cost-effective growth"]
      },
      {
        slug: "smm",
        name: "Social Media Marketing (SMM)",
        shortName: "SMM",
        description: "Engage your audience across Facebook, Instagram, LinkedIn, and Twitter.",
        longDescription: "Build brand awareness and community engagement through strategic social media campaigns. We create compelling content, manage your social presence, and drive engagement to build loyal followers.",
        benefits: ["Brand awareness", "Community engagement", "Lead generation", "Customer loyalty"]
      },
      {
        slug: "sem",
        name: "Search Engine Marketing (SEM)",
        shortName: "SEM",
        description: "Get immediate visibility with targeted paid search campaigns.",
        longDescription: "Reach your audience instantly with strategic paid search advertising. We manage Google Ads campaigns optimized for maximum ROI and conversion rates.",
        benefits: ["Immediate visibility", "Targeted traffic", "Measurable ROI", "Quick scaling"]
      },
      {
        slug: "email-marketing",
        name: "Email Marketing Campaigns",
        shortName: "Email Marketing",
        description: "Build relationships and drive conversions with strategic email campaigns.",
        longDescription: "Design and execute effective email marketing campaigns that nurture leads and convert customers. From automation to personalization, we maximize your email ROI.",
        benefits: ["Lead nurturing", "High ROI", "Direct communication", "Customer retention"]
      },
      {
        slug: "google-ads",
        name: "Google Ads Management",
        shortName: "Google Ads",
        description: "Expert Google Ads management for Search, Display, Shopping, and YouTube.",
        longDescription: "Our certified Google Ads specialists manage all dimensions of your paid search campaigns, ensuring optimal performance and maximized return on ad spend.",
        benefits: ["Qualified leads", "Optimized budgets", "Better targeting", "Continuous improvement"]
      },
      {
        slug: "content-marketing",
        name: "Content Marketing",
        shortName: "Content Marketing",
        description: "Create valuable content that attracts and converts your ideal customers.",
        longDescription: "Develop a content strategy that establishes your brand as a thought leader. We create blog posts, whitepapers, case studies, and more that drive traffic and engagement.",
        benefits: ["Thought leadership", "Organic traffic", "Lead generation", "Brand authority"]
      }
    ]
  },
  "web-development": {
    slug: "web-development",
    name: "Web Development Services",
    description: "Custom web development solutions including websites, e-commerce, mobile apps, and web applications.",
    longDescription: "Build powerful web applications and websites that drive business results with our modern development technologies and best practices.",
    subServices: [
      {
        slug: "mobile-app",
        name: "Mobile App Development",
        shortName: "Mobile Apps",
        description: "Native and cross-platform mobile apps that users love.",
        longDescription: "Develop high-performance mobile applications for iOS and Android platforms. From concept to deployment, we build apps that engage users and drive business value.",
        benefits: ["User-friendly interfaces", "Cross-platform support", "High performance", "App store ready"]
      },
      {
        slug: "website",
        name: "Website Development",
        shortName: "Websites",
        description: "Modern, responsive websites that convert visitors into customers.",
        longDescription: "Build professional websites that look great on all devices and are optimized for conversions. We use the latest technologies and best practices in web development.",
        benefits: ["Mobile responsive", "Fast loading", "SEO optimized", "Easy maintenance"]
      },
      {
        slug: "ecommerce",
        name: "E-Commerce Solutions",
        shortName: "E-Commerce",
        description: "Complete e-commerce platforms to sell online effectively.",
        longDescription: "Launch and grow your online store with our comprehensive e-commerce solutions. From product catalogs to payment integration, we handle everything.",
        benefits: ["Online sales", "Payment integration", "Inventory management", "Scalable platform"]
      },
      {
        slug: "custom-web",
        name: "Custom Web Applications",
        shortName: "Web Apps",
        description: "Tailored web applications built to your specific business needs.",
        longDescription: "Custom-built web applications designed for your unique business requirements. We create scalable, secure, and efficient solutions using modern development practices.",
        benefits: ["Custom features", "Scalable architecture", "Real-time functionality", "Enterprise-grade security"]
      },
      {
        slug: "ui-ux",
        name: "UI/UX Design",
        shortName: "UI/UX",
        description: "Beautiful and intuitive user interfaces that enhance user experience.",
        longDescription: "Design stunning user interfaces that are not only beautiful but also highly functional. We focus on user experience to ensure your application is a pleasure to use.",
        benefits: ["Beautiful design", "Intuitive interfaces", "User testing", "Accessibility"]
      },
      {
        slug: "responsive",
        name: "Responsive Design",
        shortName: "Responsive",
        description: "Websites that work perfectly on all devices and screen sizes.",
        longDescription: "Ensure your website looks and functions perfectly across all devices - desktop, tablet, and mobile. We follow mobile-first design principles for optimal user experience.",
        benefits: ["Works on all devices", "Better SEO", "Improved conversions", "Future-proof design"]
      }
    ]
  },
  "designing": {
    slug: "designing",
    name: "Design Services",
    description: "Professional graphic design and branding services to elevate your brand.",
    longDescription: "Create a strong visual identity that resonates with your audience through expert design and branding services.",
    subServices: [
      {
        slug: "logo",
        name: "Logo Design",
        shortName: "Logo Design",
        description: "Memorable logos that represent your brand identity.",
        longDescription: "Create a unique and memorable logo that captures the essence of your brand. Our designers craft logos that make a lasting impression and differentiate you from competitors.",
        benefits: ["Unique identity", "Professional quality", "Memorable design", "Versatile formats"]
      },
      {
        slug: "brand-identity",
        name: "Brand Identity",
        shortName: "Brand Identity",
        description: "Complete brand identity systems that unify your visual presence.",
        longDescription: "Develop a cohesive brand identity including logo, color palette, typography, and brand guidelines. We ensure consistency across all your marketing materials.",
        benefits: ["Cohesive branding", "Professional image", "Brand consistency", "Competitive advantage"]
      },
      {
        slug: "marketing-visuals",
        name: "Marketing Visuals",
        shortName: "Marketing",
        description: "Eye-catching visuals for marketing campaigns and promotional materials.",
        longDescription: "Create compelling visual content for your marketing campaigns. From banners to infographics, we design visuals that capture attention and drive engagement.",
        benefits: ["Attention-grabbing", "Campaign-specific", "Brand-aligned", "High conversion potential"]
      },
      {
        slug: "social-media",
        name: "Social Media Graphics",
        shortName: "Social Media",
        description: "Engaging graphics optimized for social media platforms.",
        longDescription: "Design eye-catching social media graphics tailored to each platform's specifications. We create posts, stories, and cover images that boost engagement.",
        benefits: ["Platform optimized", "Consistent branding", "High engagement", "Time-saving"]
      },
      {
        slug: "print",
        name: "Print Media Design",
        shortName: "Print Design",
        description: "Professional design for business cards, brochures, and printed materials.",
        longDescription: "Design professional print materials that leave a lasting impression. From business cards to brochures, we create print designs that complement your digital presence.",
        benefits: ["Professional quality", "Print-ready files", "On-brand design", "Physical presence"]
      },
      {
        slug: "guidelines",
        name: "Brand Guidelines",
        shortName: "Guidelines",
        description: "Comprehensive brand guidelines for consistent brand expression.",
        longDescription: "Develop detailed brand guidelines that ensure consistency across all touchpoints. Includes logo usage, color palette, typography, imagery, and tone of voice.",
        benefits: ["Brand consistency", "Clear guidelines", "Team alignment", "Scalable branding"]
      }
    ]
  },
  "animation": {
    slug: "animation",
    name: "Animation Services",
    description: "High-quality 2D & 3D animation, explainer videos, and branding animations.",
    longDescription: "Bring your ideas to life with professional animation and video production services.",
    subServices: [
      {
        slug: "2d-3d",
        name: "2D & 3D Animation Videos",
        shortName: "2D/3D Animation",
        description: "Professional animation videos that captivate and engage your audience.",
        longDescription: "High-quality 2D and 3D animation designed to tell your story and engage viewers. From character animation to motion graphics, we bring your vision to life.",
        benefits: ["Professional quality", "Engaging storytelling", "Custom animation", "Multi-platform compatible"]
      },
      {
        slug: "explainer",
        name: "Explainer & Branding Videos",
        shortName: "Explainer Videos",
        description: "Animated explainer videos that clearly communicate your message.",
        longDescription: "Create animated explainer videos that simplify complex concepts and communicate your value proposition. Perfect for websites, social media, and presentations.",
        benefits: ["Clear communication", "High engagement", "Viral potential", "Lead generation"]
      },
      {
        slug: "concept",
        name: "Concept Development & Storyboarding",
        shortName: "Concept Dev",
        description: "Creative concept development and professional storyboarding for your video projects.",
        longDescription: "We work with you to develop creative concepts and create detailed storyboards that guide the entire animation process, ensuring your vision comes to life.",
        benefits: ["Creative concepts", "Clear visualization", "Aligned expectations", "Smooth production"]
      },
      {
        slug: "scripting",
        name: "Script Writing & Production",
        shortName: "Script & Production",
        description: "Professional script writing and full production services for animated content.",
        longDescription: "From concept to final video, we handle script writing, voiceovers, music selection, and post-production to deliver polished animated content.",
        benefits: ["Professional scripts", "Quality production", "Cohesive messaging", "Ready-to-use videos"]
      },
      {
        slug: "custom",
        name: "Customized Video Solutions",
        shortName: "Custom Solutions",
        description: "Tailored video and animation solutions for your unique business needs.",
        longDescription: "We develop custom animation and video solutions specifically designed for your business. Whether you need product animations or brand storytelling, we deliver results.",
        benefits: ["Custom-tailored", "Unique content", "Business-focused", "Maximum ROI"]
      },
      {
        slug: "end-to-end",
        name: "End-to-End Animation Services",
        shortName: "Full Service",
        description: "Complete animation services from concept to final delivery.",
        longDescription: "Full-service animation production handling every aspect of your video project. We manage concept development, design, animation, and delivery for a seamless experience.",
        benefits: ["Complete solution", "Single point of contact", "Consistent quality", "Hassle-free process"]
      }
    ]
  },
  "contentmanagement": {
    slug: "contentmanagement",
    name: "Content Management Services",
    description: "Professional content creation including SEO writing, copywriting, and blog management.",
    longDescription: "Create valuable, engaging content that drives traffic, builds authority, and converts customers.",
    subServices: [
      {
        slug: "seo-content",
        name: "SEO-Friendly Content",
        shortName: "SEO Content",
        description: "Optimized content designed to rank in search engines and drive organic traffic.",
        longDescription: "We create SEO-optimized content that ranks well in search results. Every piece is researched, keyword-optimized, and designed to provide value to your audience.",
        benefits: ["Higher rankings", "Organic traffic", "Long-term value", "Audience trust"]
      },
      {
        slug: "copywriting",
        name: "Web Copywriting",
        shortName: "Copywriting",
        description: "Persuasive web copy that converts visitors into customers.",
        longDescription: "Craft compelling copy for your website, landing pages, and marketing materials. We focus on converting readers into leads and customers through persuasive messaging.",
        benefits: ["Higher conversions", "Persuasive messaging", "Clear value proposition", "Sales-focused"]
      },
      {
        slug: "social-content",
        name: "Social Media Content",
        shortName: "Social Media",
        description: "Engaging social media content that builds community and drives engagement.",
        longDescription: "Create consistent, engaging content for your social media channels. From captions to full posts, we craft content that resonates with your audience and drives engagement.",
        benefits: ["Higher engagement", "Community building", "Consistent posting", "Brand voice"]
      },
      {
        slug: "documentation",
        name: "Technical Documentation",
        shortName: "Technical Docs",
        description: "Clear technical documentation and knowledge base articles.",
        longDescription: "Create clear, comprehensive technical documentation that helps users understand your products or services. From guides to tutorials, we make complex information accessible.",
        benefits: ["User clarity", "Support reduction", "Professional image", "Knowledge sharing"]
      },
      {
        slug: "blog",
        name: "Blog Posts & Articles",
        shortName: "Blog Posts",
        description: "Professional blog posts and articles that inform and engage your audience.",
        longDescription: "Regular blog posts that establish thought leadership, drive traffic, and keep your audience informed. We write on topics that matter to your industry and audience.",
        benefits: ["Thought leadership", "Organic traffic", "Authority building", "Customer education"]
      },
      {
        slug: "brand-content",
        name: "Brand-Building Content",
        shortName: "Brand Content",
        description: "Strategic content that builds your brand and establishes your market position.",
        longDescription: "Create strategic content that tells your brand story and positions you as an industry leader. From case studies to whitepapers, we showcase your expertise.",
        benefits: ["Brand positioning", "Authority", "Market leadership", "Customer trust"]
      }
    ]
  },
  "webhosting": {
    slug: "webhosting",
    name: "Web Hosting Services",
    description: "Reliable web hosting solutions including shared hosting, dedicated servers, and domain services.",
    longDescription: "Fast, secure, and reliable hosting solutions to keep your website online and performing.",
    subServices: [
      {
        slug: "shared",
        name: "Shared Web Hosting",
        shortName: "Shared Hosting",
        description: "Affordable hosting solution perfect for small to medium websites.",
        longDescription: "Cost-effective shared hosting with great performance. Your website shares server resources with other websites while maintaining security and reliability.",
        benefits: ["Affordable pricing", "Easy setup", "Good uptime", "Support included"]
      },
      {
        slug: "dedicated",
        name: "Dedicated Web Hosting",
        shortName: "Dedicated Hosting",
        description: "Powerful hosting with dedicated server resources for high-traffic websites.",
        longDescription: "Get maximum performance and control with dedicated hosting. Your website has its own server with guaranteed resources, perfect for high-traffic sites.",
        benefits: ["Maximum performance", "Full control", "Scalability", "Enhanced security"]
      },
      {
        slug: "domain-registration",
        name: "Domain Registration",
        shortName: "Domain Registration",
        description: "Register and manage your domain with premium services.",
        longDescription: "Find and register the perfect domain name for your business. We handle domain registration and provide management tools for easy administration.",
        benefits: ["Affordable domains", "Easy management", "Privacy protection", "WHOIS editing"]
      },
      {
        slug: "domain-transfer",
        name: "Domain Transfer",
        shortName: "Domain Transfer",
        description: "Seamless domain transfer with zero downtime.",
        longDescription: "Transfer your domain to us easily and safely. We handle the entire process ensuring zero downtime and full domain functionality from day one.",
        benefits: ["Easy process", "No downtime", "Expert support", "Full transparency"]
      },
      {
        slug: "cpanel",
        name: "cPanel Access",
        shortName: "cPanel",
        description: "Full cPanel control for easy website and email management.",
        longDescription: "Manage your website, files, and emails through an intuitive cPanel interface. Easy one-click installations and comprehensive management tools included.",
        benefits: ["User-friendly", "Full control", "File management", "One-click installs"]
      },
      {
        slug: "email",
        name: "Business Email Accounts",
        shortName: "Email Accounts",
        description: "Professional business email accounts with your domain name.",
        longDescription: "Professional email accounts using your domain name. Perfect for business communication with unlimited forwarding, aliases, and spam filtering.",
        benefits: ["Professional image", "Domain-based email", "Spam filtering", "Multiple accounts"]
      }
    ]
  }
};

/**
 * Helper function to get a service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return servicesConfig[slug];
}

/**
 * Helper function to get a sub-service by service slug and sub-service slug
 */
export function getSubServiceBySlug(
  serviceSlug: string,
  subSlug: string
): SubService | undefined {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return undefined;
  return service.subServices.find(sub => sub.slug === subSlug);
}

/**
 * Get all services
 */
export function getAllServices(): Service[] {
  return Object.values(servicesConfig);
}

/**
 * Get all service slugs
 */
export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesConfig);
}
