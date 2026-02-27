import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string;
    image?: string;
    noindex?: boolean;
    type?: "WebPage" | "Article" | "LocalBusiness";
    publishedTime?: string;
    authorName?: string;
    structuredData?: any[];
    relNext?: string;
    relPrev?: string;
}

export const SEO = ({
    title,
    description,
    canonical,
    keywords = "Brand Management Coimbatore, Digital Marketing India, Web Development, 2D 3D Animation, Corporate Film, MediaMatic Studio",
    image = "/og-image.jpg",
    noindex = false,
    type = "WebPage",
    publishedTime,
    authorName = "MediaMatic Studio",
    structuredData,
    relNext,
    relPrev
}: SEOProps) => {
    const siteUrl = "https://mediamaticstudio.com";
    const fullCanonical = canonical ? (canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`) : siteUrl;
    const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

    // Generate basic schemaData if structuredData is not provided
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": type,
        name: title,
        url: fullCanonical,
        description: description,
        image: fullImage,
        publisher: {
            "@type": "Organization",
            name: "MediaMatic Studio",
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/favicon.ico`
            }
        }
    };

    let schemaData: any = { ...baseSchema };

    if (type === "Article") {
        schemaData = {
            ...schemaData,
            "@type": "Article",
            headline: title,
            datePublished: publishedTime || new Date().toISOString(),
            dateModified: publishedTime || new Date().toISOString(),
            author: {
                "@type": "Person",
                name: authorName,
            }
        };
    } else if (type === "LocalBusiness") {
        schemaData = {
            ...schemaData,
            "@type": "LocalBusiness",
            name: "MediaMatic Studio",
            telephone: "+91 6374946399",
            address: {
                "@type": "PostalAddress",
                streetAddress: "KPR Extension, Phase 2, Singanallur",
                addressLocality: "Coimbatore",
                addressRegion: "Tamil Nadu",
                postalCode: "641005",
                addressCountry: "IN"
            }
        };
    }

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title} | MediaMatic Studio</title>
            <meta name="title" content={`${title} | MediaMatic Studio`} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical */}
            <link rel="canonical" href={fullCanonical} />

            {/* Pagination Links */}
            {relNext && <link rel="next" href={relNext.startsWith("http") ? relNext : `${siteUrl}${relNext}`} />}
            {relPrev && <link rel="prev" href={relPrev.startsWith("http") ? relPrev : `${siteUrl}${relPrev}`} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type === "Article" ? "article" : "website"} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={`${title} | MediaMatic Studio`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            {type === "Article" && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={`${title} | MediaMatic Studio`} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* Structured Data JSON-LD */}
            {structuredData ? (
                structuredData.map((schema, index) => (
                    <script key={index} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))
            ) : (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
};
