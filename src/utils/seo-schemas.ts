/**
 * SEO Schema.org Structured Data Generators
 * Generates JSON-LD markup for rich snippets in Google Search
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ServiceData {
  name: string;
  description: string;
  icon?: string;
  price?: string;
}

interface BlogPostData {
  title: string;
  description: string;
  image: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  url: string;
}

interface CollectionPageData {
  name: string;
  description: string;
  url: string;
  itemCount?: number;
}

/**
 * Organization Schema - Include on all pages
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MediaMatic Studio",
    "url": "https://mediamaticstudio.com",
    "description": "Award-winning digital marketing, web development, design, and animation agency.",
    "logo": "https://mediamaticstudio.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/mediamaticstudio",
      "https://www.linkedin.com/company/mediamaticstudio",
      "https://twitter.com/mediamaticstudio",
      "https://www.instagram.com/mediamaticstudio"
    ],
    "contact": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "info@mediamaticstudio.com"
    }
  };
}

/**
 * Website Schema with Search Action - Include on homepage
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MediaMatic Studio",
    "url": "https://mediamaticstudio.com",
    "description": "Digital Marketing, Web Development, Design & Animation Agency",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mediamaticstudio.com/blog/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Breadcrumb Schema - Include on detail/collection pages
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://mediamaticstudio.com${item.url}`
    }))
  };
}

/**
 * Service Schema - Include on service pages
 */
export function generateServiceSchema(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "MediaMatic Studio",
      "url": "https://mediamaticstudio.com"
    },
    "serviceType": service.name,
    ...(service.price && { "offers": { "@type": "Offer", "price": service.price } })
  };
}

/**
 * BlogPosting Schema - Include on blog post pages
 */
export function generateBlogPostingSchema(post: BlogPostData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": [post.image],
    "datePublished": post.publishDate,
    ...(post.modifiedDate && { "dateModified": post.modifiedDate }),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "MediaMatic Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mediamaticstudio.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mediamaticstudio.com${post.url}`
    }
  };
}

/**
 * CollectionPage Schema - For blog lists, categories, tags, pagination
 */
export function generateCollectionPageSchema(data: CollectionPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data.name,
    "description": data.description,
    "url": `https://mediamaticstudio.com${data.url}`,
    ...(data.itemCount && { "numberOfItems": data.itemCount })
  };
}

/**
 * FAQPage Schema - For blog posts with FAQs
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * LocalBusiness Schema - Optional for contact/about pages
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MediaMatic Studio",
    "image": "https://mediamaticstudio.com/logo.png",
    "description": "Award-winning digital marketing, web development, design, and animation agency.",
    "url": "https://mediamaticstudio.com",
    "sameAs": [
      "https://www.facebook.com/mediamaticstudio",
      "https://www.linkedin.com/company/mediamaticstudio",
      "https://twitter.com/mediamaticstudio"
    ]
  };
}
