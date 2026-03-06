import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { fetchBlogPostBySlug, fetchRecentPosts } from "@/services/api";
import { Calendar, Clock, ArrowLeft, ChevronRight, User, Loader2, Link as LinkIcon, Check } from "lucide-react";
import BlogCard from "./components/BlogCard";
import { toast } from "sonner";
import styles from "./Blog.module.css";
import BlogSidebar from "./components/BlogSidebar";
import FAQBrandStyle from "./components/FAQBrandStyle";
import TableOfContents from "./components/TableOfContents";
import { Footer } from "@/components/Footer";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/LOGO-blog.png";
import { generateBreadcrumbSchema, generateBlogPostingSchema, generateFAQSchema, generateOrganizationSchema } from "@/utils/seo-schemas";

const XIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
);

const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.736-4.869-4.182 0-6.639 3.112-6.639 6.337 0 1.25.481 2.591 1.081 3.296.119.14.137.264.1.48-.121.5-.395 1.611-.451 1.837-.073.295-.233.354-.537.214-2.007-.932-3.26-3.85-3.26-6.196 0-5.043 3.664-9.678 10.557-9.678 5.545 0 9.86 3.953 9.86 9.227 0 5.503-3.472 9.941-8.291 9.941-1.618 0-3.14-.842-3.662-1.835 0 0-.799 3.033-.996 3.791-.362 1.397-1.344 3.138-1.996 4.359 1.498.463 3.087.712 4.729.712 6.627 0 12.001-5.367 12.001-11.987S18.636 0 12.017 0z" />
    </svg>
);

const RecentPostsGrid = ({ currentSlug }: { currentSlug: string }) => {
    const { data: allPosts = [], isLoading } = useQuery({
        queryKey: ["recent-posts"],
        queryFn: () => fetchRecentPosts(4),
        staleTime: 0,
    });

    const recentPosts = allPosts.filter((p: any) => p.slug !== currentSlug).slice(0, 3);

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#652b32]" /></div>;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((p: any) => (
                <BlogCard key={p.slug} post={p} />
            ))}
        </div>
    );
};

const BlogPostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Fetch post with React Query for caching
    const { data: post, isLoading: loading, isError, error: fetchError } = useQuery({
        queryKey: ["blog-post", slug],
        queryFn: () => fetchBlogPostBySlug(slug!),
        enabled: !!slug,
        staleTime: 0,   // Fresh instantly
        gcTime: 1000 * 60 * 30,     // Keep in memory for 30 mins
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const error = isError ? (fetchError instanceof Error ? fetchError.message : "Failed to load post") : null;

    // Check device type
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const displayFaqs = post?.faqs || [];



    // Processed content - REMOVE WordPress TOC to avoid duplication
    const processedContent = useMemo(() => {
        if (!post?.content) return "";

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = post.content;

        // 1. Optimize Images: Add lazy loading and decoding async for better performance
        const contentImages = tempDiv.querySelectorAll("img");
        contentImages.forEach(img => {
            img.setAttribute("loading", "lazy");
            img.setAttribute("decoding", "async");
            img.classList.add("transition-all", "duration-500", "hover:scale-[1.02]");
        });

        // 2. Generate clean IDs for all h2 and h3 tags
        const headings = tempDiv.querySelectorAll("h2, h3");
        const headingMap = new Map();

        headings.forEach((heading) => {
            const text = heading.textContent || "";
            const id = text
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            heading.id = id;
            headingMap.set(text.toLowerCase().trim(), id);
        });

        // 3. REMOVE hardcoded TOC and FAQ sections from WordPress content body
        const removeMarkers = ["faq", "frequently asked questions", "table of contents", "in this article"];

        // Remove known WP containers first
        const tocSelectors = [".table-of-contents", ".toc", "[id*='toc']", "div[class*='toc']", ".rank-math-block"];
        tocSelectors.forEach(sel => tempDiv.querySelectorAll(sel).forEach(el => el.remove()));

        // Scan for headings to strip sections
        const allHeadings = Array.from(tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        allHeadings.forEach(heading => {
            const text = heading.textContent?.toLowerCase() || "";
            const shouldRemove = removeMarkers.some(marker => text.includes(marker));

            if (shouldRemove) {
                let current: Element | null = heading;
                while (current) {
                    const next: Element | null = current.nextElementSibling;
                    current.remove();
                    current = next;
                }
            }
        });

        return tempDiv.innerHTML;
    }, [post?.content]);

    // Get intro content (first paragraph) and remaining content
    const { introContent, remainingContent } = useMemo(() => {
        if (!processedContent) return { introContent: "", remainingContent: processedContent };

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = processedContent;

        // Find the first paragraph for intro
        const firstParagraph = tempDiv.querySelector('p');
        const introHtml = firstParagraph ? firstParagraph.outerHTML : "";

        // Remove the first paragraph from remaining content
        if (firstParagraph) {
            firstParagraph.remove();
        }

        return {
            introContent: introHtml,
            remainingContent: tempDiv.innerHTML
        };
    }, [processedContent]);


    // Handle scroll to hash on load or click
    useEffect(() => {
        const handleHashClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target && target.getAttribute('href')?.startsWith('#')) {
                const id = target.getAttribute('href')?.substring(1);
                if (id) {
                    const element = document.getElementById(id);
                    if (element) {
                        e.preventDefault();
                        const offset = 120;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "auto"
                        });
                        window.history.pushState(null, "", `#${id}`);
                    }
                }
            }
        };

        document.addEventListener('click', handleHashClick);
        return () => document.removeEventListener('click', handleHashClick);
    }, []);

    // Scroll to top when slug changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf3e0] pt-32 pb-20 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-[#652b32] animate-spin mx-auto" />
                    <p className="text-[#652b32]/60 font-medium">Opening story...</p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen bg-[#faf3e0] py-32 px-6">
                <div className="container mx-auto text-center">
                    <p className="text-red-500 text-lg mb-6 font-bold">{error || "Post not found"}</p>
                    <button
                        onClick={() => navigate("/blog")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#652b32] text-white rounded-lg font-bold hover:bg-[#4a1f25] transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </button>
                </div>
            </main>
        );
    }

    const structuredData = [
        generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog/" },
            { name: post.title, url: `/blog/${post.slug}/` }
        ]),
        generateBlogPostingSchema({
            title: post.title,
            description: post.excerpt,
            image: post.featured_image,
            author: post.author.name,
            publishDate: post.publish_date,
            url: `/blog/${post.slug}/`
        }),
        generateOrganizationSchema()
    ];

    // Add FAQ schema if FAQs exist
    if (displayFaqs.length > 0) {
        structuredData.push(generateFAQSchema(displayFaqs));
    }

    return (
        <>
            <SEO
                title={`${post.title} | MediaMatic Studio Blog`}
                description={post.excerpt}
                canonical={`/blog/${post.slug}/`}
                image={post.featured_image}
                keywords={post.tags?.join(", ") || "blog, digital marketing, web development"}
                structuredData={structuredData}
            />


            {/* Floating Social Sidebar - Hide on mobile/tablet */}
            {!isMobile && !isTablet && (
                <div className={styles.socialSidebar}>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#652b32] -rotate-90 origin-center mb-8 whitespace-nowrap opacity-40">
                        Share Story
                    </div>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://mediamaticstudio.com/blog/${post.slug}/`} target="_blank" rel="noopener noreferrer" className={styles.socialIconWrapper} title="Share on Facebook">
                        <Facebook size={20} className="text-[#1877f2]" />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mediamaticstudio.com/blog/${post.slug}/`} target="_blank" rel="noopener noreferrer" className={styles.socialIconWrapper} title="Share on LinkedIn">
                        <Linkedin size={20} className="text-[#0077b5]" />
                    </a>
                    <a href={`https://x.com/intent/tweet?url=https://mediamaticstudio.com/blog/${post.slug}/&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className={styles.socialIconWrapper} title="Share on X">
                        <XIcon />
                    </a>
                    <a href={`https://pinterest.com/pin/create/button/?url=https://mediamaticstudio.com/blog/${post.slug}/&media=${encodeURIComponent(post.featured_image)}&description=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className={styles.socialIconWrapper} title="Share on Pinterest">
                        <div className="text-[#E60023]">
                            <PinterestIcon />
                        </div>
                    </a>
                    <a href="https://www.youtube.com/@mediamaticstudio" target="_blank" rel="noopener noreferrer" className={styles.socialIconWrapper} title="Visit our YouTube">
                        <Youtube size={20} className="text-[#FF0000]" />
                    </a>
                    <button
                        onClick={() => {
                            const url = `https://mediamaticstudio.com/blog/${post.slug}/`;
                            navigator.clipboard.writeText(url);
                            toast.success("Link copied to clipboard!", {
                                icon: <Check className="w-4 h-4 text-green-500" />,
                                duration: 2000,
                            });
                        }}
                        className={styles.socialIconWrapper}
                        title="Copy Link"
                    >
                        <LinkIcon size={20} className="text-[#652b32]" />
                    </button>
                </div>
            )}

            <main className="min-h-screen bg-[#faf3e0] pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-20 font-sans">
                {/* Dynamic 1px Reading Progress Bar - Ultra Slim */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-[#652b32] z-[100] origin-left"
                    style={{ scaleX: scrollYProgress }}
                />
                {/* Background Pattern - Hidden on mobile for performance */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #652b32 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    {/* Back Navigation */}
                    <div className="mb-4 md:mb-6 lg:mb-8 flex items-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-1.5 md:gap-2 text-[#652b32]/60 hover:text-[#652b32] transition-colors font-bold uppercase tracking-widest text-[10px] md:text-xs"
                        >
                            <ArrowLeft size={12} className="md:w-3.5 md:h-3.5" /> Back to Blog
                        </Link>
                    </div>

                    {/* Mobile/Tablet Social Share Bar */}
                    {(isMobile || isTablet) && (
                        <div className={styles['mobile-social-bar']}>
                            <div className="bg-white/95 backdrop-blur-lg rounded-full shadow-2xl border border-[#652b32]/10 p-1.5 px-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-[#652b32] uppercase tracking-[0.2em] whitespace-nowrap pl-1">
                                        Share Post
                                    </span>
                                    <button
                                        onClick={() => {
                                            const url = window.location.href;
                                            navigator.clipboard.writeText(url);
                                            toast.success("Link copied!", {
                                                icon: <Check className="w-4 h-4 text-green-500" />,
                                                duration: 2000,
                                            });
                                        }}
                                        className="w-10 h-10 bg-[#652b32] rounded-full flex items-center justify-center hover:bg-[#4a1f25] transition-all active:scale-95 shadow-lg shadow-[#652b32]/20"
                                        title="Copy Link"
                                    >
                                        <LinkIcon size={16} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8">
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="bg-white rounded-[1.5rem] md:rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl shadow-[#652b32]/5 mb-12"
                            >
                                {/* Breadcrumbs */}
                                <nav className="flex items-center flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6 lg:mb-8">
                                    <Link
                                        to="/"
                                        className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-[#652b32] transition-colors uppercase tracking-wider"
                                    >
                                        Home
                                    </Link>
                                    <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-300" />
                                    <Link
                                        to="/blog"
                                        className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-[#652b32] transition-colors uppercase tracking-wider"
                                    >
                                        Blog
                                    </Link>
                                    <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-300" />
                                    <span className="text-[10px] md:text-xs font-bold text-[#652b32] uppercase tracking-wider truncate max-w-[100px] md:max-w-none">
                                        {post.category}
                                    </span>
                                </nav>

                                {/* 1. HEADING - Title */}
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#652b32] leading-[1.2] md:leading-[1.1] mb-4 md:mb-6 lg:mb-10 tracking-tight break-words [hyphens:auto] overflow-hidden">
                                    {post.title}
                                </h1>

                                {/* 2. AUTHOR - Author Info */}
                                <div className="flex items-start gap-2.5 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-10 pb-4 md:pb-6 lg:pb-10 border-b border-gray-100">
                                    <img
                                        src={logo}
                                        alt={post.author.name}
                                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full object-cover ring-2 md:ring-4 ring-[#faf3e0] flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-gray-900 mb-0.5 md:mb-1 truncate">
                                            By {post.author.name}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">
                                            <span className="flex items-center gap-1 whitespace-nowrap text-inherit">
                                                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> {post.publish_date}
                                            </span>
                                            <span className="flex items-center gap-1 whitespace-nowrap text-inherit">
                                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> {post.read_time}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. IMAGE - Featured Image - High Fidelity Display */}
                                <div className="w-full aspect-video rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden mb-4 md:mb-6 lg:mb-8 xl:mb-12 shadow-lg md:shadow-xl lg:shadow-2xl relative bg-[#652b32]/5 flex items-center justify-center group-image">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#652b32]/10 to-transparent pointer-events-none" />
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-contain relative z-10"
                                        loading="eager"
                                        decoding="async"
                                        {...({ fetchpriority: "high" } as any)}
                                    />
                                    {/* Blurred background for empty spaces */}
                                    <img
                                        src={post.featured_image}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-10"
                                    />
                                </div>

                                {/* 4. INTRO CONTENT */}
                                {introContent && (
                                    <div
                                        className={`${styles.blogContent} mb-4 md:mb-6 lg:mb-8`}
                                        dangerouslySetInnerHTML={{ __html: introContent }}
                                    />
                                )}

                                {/* Mobile/Tablet Table of Contents - Inline after intro */}
                                {(isMobile || isTablet) && (
                                    <div className="my-6 md:my-8 lg:hidden">
                                        <div className="bg-[#faf3e0] rounded-xl md:rounded-2xl p-4 md:p-5 border-2 border-[#652b32]/10">
                                            <h3 className="text-base md:text-lg font-black text-[#652b32] mb-3 md:mb-4 flex items-center gap-2">
                                                <span className="w-1 h-4 md:h-5 bg-[#652b32] rounded-full"></span>
                                                In This Article
                                            </h3>
                                            <TableOfContents key={slug} />
                                        </div>
                                    </div>
                                )}

                                {/* 5. REMAINING CONTENT */}
                                {remainingContent && (
                                    <div
                                        className={styles.blogContent}
                                        dangerouslySetInnerHTML={{ __html: remainingContent }}
                                    />
                                )}

                                {/* 6. INTEGRATED FAQ SECTION */}
                                {displayFaqs.length > 0 && (
                                    <div className="mt-8">
                                        <FAQBrandStyle faqs={displayFaqs} />
                                    </div>
                                )}

                            </motion.article>
                        </div>

                        {/* TABLE OF CONTENTS SIDEBAR - UX Preserved */}
                        {!isMobile && !isTablet && (
                            <aside className="lg:col-span-4 relative h-full hidden lg:block">
                                <div className="sticky top-28 w-full">
                                    <TableOfContents key={slug} />
                                </div>
                            </aside>
                        )}
                    </div>

                    {/* NEW GRID: BOTTOM ENGAGEMENT ZONE */}
                    <div className="mt-8 md:mt-12 lg:mt-20 space-y-10 md:space-y-16 lg:space-y-24">
                        {/* 2. Recent Posts & Contact Section */}
                        <div className="grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-12 items-start pb-8 md:pb-12 lg:pb-20">
                            <div className="lg:col-span-12">
                                <div className="p-4 md:p-6 lg:p-8 h-full">
                                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-[#652b32] mb-6 md:mb-10">Keep Reading</h3>
                                    <RecentPostsGrid currentSlug={post.slug} />
                                </div>
                            </div>

                            <div className="lg:col-span-12">
                                <div className="p-4 md:p-6 lg:p-12 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#652b32]/5 rounded-full -translate-y-12 translate-x-12 blur-3xl group-hover:bg-[#652b32]/10 transition-colors" />
                                    <div className="max-w-3xl mx-auto relative z-10">
                                        <BlogSidebar showRecent={false} variant="ghost" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BlogPostDetail;