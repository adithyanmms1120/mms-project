import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string;
    image?: string;
    noindex?: boolean;
}

export const SEO = ({
    title,
    description,
    canonical,
    keywords = "Brand Management Coimbatore, Digital Marketing India, Web Development, 2D 3D Animation, Corporate Film, MediaMatic Studio",
    image = "/og-image.jpg",
    noindex = false
}: SEOProps) => {
    const siteUrl = "https://mediamaticstudio.com";
    const fullCanonical = canonical ? (canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`) : siteUrl;
    const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

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

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={`${title} | MediaMatic Studio`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={`${title} | MediaMatic Studio`} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />
        </Helmet>
    );
};
