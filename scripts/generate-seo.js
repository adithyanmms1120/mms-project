import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// Define all routes with their SEO metadata
const routes = [
    {
        path: '/',
        title: 'MediaMatic Studio | Digital Marketing & Web Development Agency',
        description: 'Transform your digital presence with MediaMatic Studio. Expert web development, digital marketing, SEO, creative design, animation, and content management services. Your trusted partner for online success.',
        keywords: 'digital marketing agency, web development, SEO services, website design, mobile app development, content marketing, social media marketing, animation studio, graphic design, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/'
    },
    {
        path: '/contact-us/',
        title: 'Contact Us | MediaMatic Studio',
        description: 'Get in touch with MediaMatic Studio. Let\'s create something amazing together. Contact us for digital marketing, web development, and creative services.',
        keywords: 'contact MediaMatic Studio, get in touch, digital marketing contact, web development inquiry',
        canonical: 'https://www.mediamaticstudio.com/contact-us/'
    },
    {
        path: '/get-quote/',
        title: 'Get a Quote | MediaMatic Studio',
        description: 'Request a customized quote for our digital marketing, web development, and creative services. Let us help you grow your business.',
        keywords: 'get quote, digital marketing quote, web development price, contact MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/get-quote/'
    },
    {
        path: '/services/digital-marketing/',
        title: 'Digital Marketing Services | MediaMatic Studio',
        description: 'Data-driven digital marketing solutions including SEO, SMM, SEM, email marketing, and Google Ads that increase conversions, engagement, and visibility.',
        keywords: 'digital marketing, SEO, SMM, SEM, Google Ads, email marketing, social media marketing, content marketing, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/services/digital-marketing/'
    },
    {
        path: '/services/web-development/',
        title: 'Web & App Development Services | MediaMatic Studio',
        description: 'Your one-stop digital partner for cutting-edge web and mobile experiences. Expert mobile app development, website development, e-commerce solutions, and custom web applications.',
        keywords: 'web development, app development, mobile apps, website design, e-commerce, custom web applications, UI/UX design, responsive design, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/services/web-development/'
    },
    {
        path: '/services/designing/',
        title: 'Designing Services | MediaMatic Studio',
        description: 'Design That Tells Your Story. Logos, branding, and marketing visuals crafted to speak directly to your audience. Professional logo design, brand identity, and creative marketing materials.',
        keywords: 'graphic design, logo design, brand identity, marketing visuals, social media graphics, print media design, brand guidelines, creative design, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/services/designing/'
    },
    {
        path: '/services/animation/',
        title: '2D & 3D Animation Services | MediaMatic Studio',
        description: 'Creative studio transforming business ideas into compelling visual stories through 2D & 3D animation. Expert explainer videos, branding videos, and custom animation solutions.',
        keywords: '2D animation, 3D animation, explainer videos, branding videos, animated videos, storyboarding, video production, animation studio, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/services/animation/'
    },
    {
        path: '/services/contentmanagement/',
        title: 'Content Management Services | MediaMatic Studio',
        description: 'Expert content writing services including SEO-friendly content, web copywriting, social media content, and technical documentation that connects your brand with audiences.',
        keywords: 'content writing, content management, SEO content, web copywriting, social media content, technical documentation, blog posts, content marketing, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/services/contentmanagement/'
    },
    {
        path: '/services/webhosting/',
        title: 'Web Hosting Services | MediaMatic Studio',
        description: 'Top-notch web hosting and domain services with 24/7 support, 99.9% uptime guarantee, cPanel access, and business email accounts. Reliable shared and dedicated hosting solutions.',
        keywords: 'web hosting, domain registration, shared hosting, dedicated hosting, cPanel, business email, domain transfer, hosting services, MediaMatic Studio',
        canonical: 'https://www.mediamaticstudio.com/services/webhosting/'
    },
    {
        path: '/about-us/',
        title: 'About Us | MediaMatic Studio',
        description: 'Learn more about MediaMatic Studio, our journey, vision, and the team driving digital excellence in Coimbatore and beyond.',
        keywords: 'About MediaMatic Studio, Branding Agency Coimbatore, Digital Marketing Team, Web Development Company History',
        canonical: 'https://www.mediamaticstudio.com/about-us/'
    },
    {
        path: '/blog/',
        title: 'Blog | MediaMatic Studio',
        description: 'Insights, trends, and tips on digital marketing, web development, design, and technology from the experts at MediaMatic Studio.',
        keywords: 'digital marketing blog, web development tips, design trends, technology news, MediaMatic Studio blog',
        canonical: 'https://www.mediamaticstudio.com/blog/'
    }
];

// Read the base index.html
const indexPath = path.join(distDir, 'index.html');
let baseHtml = fs.readFileSync(indexPath, 'utf-8');

console.log('🚀 Starting SEO HTML generation...\n');

routes.forEach(route => {
    let html = baseHtml;

    // Update title
    html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${route.title}</title>`
    );

    // Update or add meta description
    if (html.includes('name="description"')) {
        html = html.replace(
            /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
            `<meta name="description" content="${route.description}" />`
        );
    } else {
        html = html.replace(
            '</head>',
            `  <meta name="description" content="${route.description}" />\n</head>`
        );
    }

    // Update or add meta keywords
    if (html.includes('name="keywords"')) {
        html = html.replace(
            /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/,
            `<meta name="keywords" content="${route.keywords}" />`
        );
    } else {
        html = html.replace(
            '</head>',
            `  <meta name="keywords" content="${route.keywords}" />\n</head>`
        );
    }

    // Add canonical link
    if (!html.includes('rel="canonical"')) {
        html = html.replace(
            '</head>',
            `  <link rel="canonical" href="${route.canonical}" />\n</head>`
        );
    }

    // Update Open Graph tags
    html = html.replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
        `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
        `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
        `<meta property="og:url" content="${route.canonical}" />`
    );

    // Update Twitter tags
    html = html.replace(
        /<meta\s+property="twitter:title"\s+content=".*?"\s*\/?>/,
        `<meta property="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
        /<meta\s+property="twitter:description"\s+content=".*?"\s*\/?>/,
        `<meta property="twitter:description" content="${route.description}" />`
    );
    html = html.replace(
        /<meta\s+property="twitter:url"\s+content=".*?"\s*\/?>/,
        `<meta property="twitter:url" content="${route.canonical}" />`
    );

    // Determine output path
    let outputPath;
    if (route.path === '/') {
        outputPath = path.join(distDir, 'index.html');
    } else {
        const routeDir = path.join(distDir, route.path);
        fs.mkdirSync(routeDir, { recursive: true });
        outputPath = path.join(routeDir, 'index.html');
    }

    // Write the file
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Generated: ${route.path === '/' ? '/index.html' : route.path + '/index.html'}`);
});

console.log('\n🎉 SEO HTML generation complete!\n');
console.log('📊 Summary:');
console.log(`   - Total routes: ${routes.length}`);
console.log(`   - Output directory: ${distDir}`);
console.log('\n✨ All pages are now SEO-friendly and ready for deployment!');
