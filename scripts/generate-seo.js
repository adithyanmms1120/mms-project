import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const WP_API_URL = "https://blog.mediamaticstudio.com/wp-json/wp/v2/posts?per_page=100&_embed";
const SITE_URL = "https://www.mediamaticstudio.com";

// Define static routes
const staticRoutes = [
    {
        path: '/',
        title: 'MediaMatic Studio | Digital Marketing & Web Development Agency',
        description: 'Transform your digital presence with MediaMatic Studio. Expert web development, digital marketing, SEO, creative design, animation, and content management services.',
        keywords: 'digital marketing agency, web development, SEO services, website design, mobile app development, content marketing',
        canonical: `${SITE_URL}/`,
        changefreq: 'weekly',
        priority: '1.0'
    },
    {
        path: '/contact-us/',
        title: 'Contact Us | MediaMatic Studio',
        description: 'Get in touch with MediaMatic Studio. Let\'s create something amazing together. Contact us for digital marketing, web development, and creative services.',
        keywords: 'contact MediaMatic Studio, get in touch, digital marketing contact, web development inquiry',
        canonical: `${SITE_URL}/contact-us/`,
        changefreq: 'monthly',
        priority: '0.8'
    },
    {
        path: '/get-quote/',
        title: 'Get a Quote | MediaMatic Studio',
        description: 'Request a customized quote for our digital marketing, web development, and creative services. Let us help you grow your business.',
        keywords: 'get quote, digital marketing quote, web development price, contact MediaMatic Studio',
        canonical: `${SITE_URL}/get-quote/`,
        changefreq: 'monthly',
        priority: '0.8'
    },
    {
        path: '/services/digital-marketing-agency/',
        title: 'Digital Marketing Services | MediaMatic Studio',
        description: 'Data-driven digital marketing solutions including SEO, SMM, SEM, email marketing, and Google Ads that increase conversions, engagement, and visibility.',
        keywords: 'digital marketing, SEO, SMM, SEM, Google Ads, email marketing, social media marketing, content marketing',
        canonical: `${SITE_URL}/services/digital-marketing-agency/`,
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        path: '/services/web-development/',
        title: 'Web & App Development Services | MediaMatic Studio',
        description: 'Your one-stop digital partner for cutting-edge web and mobile experiences. Expert mobile app development, website development, e-commerce solutions.',
        keywords: 'web development, app development, mobile apps, website design, e-commerce, custom web applications',
        canonical: `${SITE_URL}/services/web-development/`,
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        path: '/services/designing/',
        title: 'Designing Services | MediaMatic Studio',
        description: 'Design That Tells Your Story. Logos, branding, and marketing visuals crafted to speak directly to your audience. Professional logo design, brand identity.',
        keywords: 'graphic design, logo design, brand identity, marketing visuals, social media graphics, print media design',
        canonical: `${SITE_URL}/services/designing/`,
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        path: '/services/animation/',
        title: '2D & 3D Animation Services | MediaMatic Studio',
        description: 'Creative studio transforming business ideas into compelling visual stories through 2D & 3D animation. Expert explainer videos, branding videos.',
        keywords: '2D animation, 3D animation, explainer videos, branding videos, animated videos, storyboarding, video production',
        canonical: `${SITE_URL}/services/animation/`,
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        path: '/services/contentmanagement/',
        title: 'Content Management Services | MediaMatic Studio',
        description: 'Expert content writing services including SEO-friendly content, web copywriting, social media content, and technical documentation.',
        keywords: 'content writing, content management, SEO content, web copywriting, social media content, technical documentation',
        canonical: `${SITE_URL}/services/contentmanagement/`,
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        path: '/services/webhosting/',
        title: 'Web Hosting Services | MediaMatic Studio',
        description: 'Top-notch web hosting and domain services with 24/7 support, 99.9% uptime guarantee, cPanel access, and business email accounts.',
        keywords: 'web hosting, domain registration, shared hosting, dedicated hosting, cPanel, business email, domain transfer',
        canonical: `${SITE_URL}/services/webhosting/`,
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        path: '/about-us/',
        title: 'About Us | MediaMatic Studio',
        description: 'Learn more about MediaMatic Studio, our journey, vision, and the team driving digital excellence in Coimbatore and beyond.',
        keywords: 'About MediaMatic Studio, Branding Agency Coimbatore, Digital Marketing Team, Web Development Company History',
        canonical: `${SITE_URL}/about-us/`,
        changefreq: 'monthly',
        priority: '0.8'
    },
    {
        path: '/blog/',
        title: 'Blog | MediaMatic Studio',
        description: 'Insights, trends, and tips on digital marketing, web development, design, and technology from the experts at MediaMatic Studio.',
        keywords: 'digital marketing blog, web development tips, design trends, technology news, MediaMatic Studio blog',
        canonical: `${SITE_URL}/blog/`,
        changefreq: 'daily',
        priority: '1.0'
    }
];

// Helper: Strip HTML tags
function stripHtml(html) {
    return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

async function fetchBlogPosts() {
    console.log(`🌐 Fetching blog posts from ${WP_API_URL}...`);
    try {
        const response = await fetch(WP_API_URL);
        if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
        const posts = await response.json();

        return posts.map(post => ({
            path: `/blog/${post.slug}/`,
            title: `${post.title.rendered} | MediaMatic Studio`,
            description: stripHtml(post.excerpt.rendered).substring(0, 160) + '...',
            keywords: 'blog, digital marketing, insights, ' + (post._embedded?.['wp:term']?.[0]?.map(t => t.name).join(', ') || ''),
            canonical: `${SITE_URL}/blog/${post.slug}/`,
            changefreq: 'monthly',
            priority: '0.7',
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        }));
    } catch (error) {
        console.error('❌ Error fetching blog posts:', error);
        return [];
    }
}

function generateSitemap(routes) {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `    <url>
        <loc>${route.canonical}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${route.changefreq || 'weekly'}</changefreq>
        <priority>${route.priority || '0.8'}</priority>
    </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    console.log(`✅ Generated sitemap.xml with ${routes.length} URLs`);
}

async function generate() {
    // 1. Get base HTML
    const indexPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error('❌ Error: dist/index.html not found. Run "vite build" first.');
        process.exit(1);
    }
    const baseHtml = fs.readFileSync(indexPath, 'utf-8');

    // 2. Fetch Blog Posts
    const blogRoutes = await fetchBlogPosts();
    const allRoutes = [...staticRoutes, ...blogRoutes];

    console.log(`🚀 Starting SEO generation for ${allRoutes.length} routes...\n`);

    // 3. Generate HTML for each route
    allRoutes.forEach(route => {
        let html = baseHtml;

        // Replace Meta Tags
        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        const metas = [
            { name: 'description', content: route.description },
            { name: 'keywords', content: route.keywords },
            { property: 'og:title', content: route.title },
            { property: 'og:description', content: route.description },
            { property: 'og:url', content: route.canonical },
            { property: 'twitter:title', content: route.title },
            { property: 'twitter:description', content: route.description },
            { property: 'twitter:url', content: route.canonical },
        ];

        // Inject Meta Tags
        let metaHtml = '';
        metas.forEach(meta => {
            if (meta.name) {
                // If it exists, replace it (simple regex approach, assumes standard formatting)
                if (html.includes(`name="${meta.name}"`)) {
                    html = html.replace(new RegExp(`<meta\\s+name="${meta.name}"\\s+content=".*?"\\s*/?>`), `<meta name="${meta.name}" content="${meta.content}" />`);
                } else {
                    metaHtml += `<meta name="${meta.name}" content="${meta.content}" />\n`;
                }
            } else if (meta.property) {
                if (html.includes(`property="${meta.property}"`)) {
                    html = html.replace(new RegExp(`<meta\\s+property="${meta.property}"\\s+content=".*?"\\s*/?>`), `<meta property="${meta.property}" content="${meta.content}" />`);
                } else {
                    metaHtml += `<meta property="${meta.property}" content="${meta.content}" />\n`;
                }
            }
        });

        // Add canonical
        if (!html.includes('rel="canonical"')) {
            metaHtml += `<link rel="canonical" href="${route.canonical}" />\n`;
        }

        // Add pre-rendered image meta if available (for blogs)
        if (route.image) {
            metaHtml += `<meta property="og:image" content="${route.image}" />\n`;
            metaHtml += `<meta property="twitter:image" content="${route.image}" />\n`;
        }

        // Inject new metas into head
        html = html.replace('</head>', `${metaHtml}</head>`);

        // Write File
        let outputPath;
        if (route.path === '/') {
            outputPath = path.join(distDir, 'index.html');
        } else {
            const routeDir = path.join(distDir, route.path);
            if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
            outputPath = path.join(routeDir, 'index.html');
        }

        fs.writeFileSync(outputPath, html);
    });

    // 4. Generate Sitemap
    generateSitemap(allRoutes);

    console.log('\n✨ SEO Generation Complete! Ready for deployment.');
}

generate();
