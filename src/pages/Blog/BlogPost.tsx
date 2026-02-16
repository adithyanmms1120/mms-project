import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { fetchBlogPostBySlug } from "@/services/api";
import { Calendar, Clock, ArrowLeft, ChevronRight, User, Loader2 } from "lucide-react";
import styles from "./Blog.module.css";
import BlogSidebar from "./components/BlogSidebar";
import FAQAccordion from "./components/FAQAccordion";

const BlogPostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dummy FAQs - normally these might come from the post data if available, or be static per category
    const faqs = [
        {
            question: "How can MediaMatic Studio help my business?",
            answer: "We provide comprehensive digital solutions including web development, digital marketing, and branding services tailored to grow your business."
        },
        {
            question: "What is the typical timeline for a project?",
            answer: "Timelines vary by project scope. A standard website might take 4-8 weeks, while ongoing marketing campaigns are continuous."
        },
        {
            question: "Do you offer custom solutions?",
            answer: "Yes! All our strategies and designs are custom-made to fit your specific business goals and target audience."
        }
    ];

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            try {
                if (!slug) return;
                const data = await fetchBlogPostBySlug(slug);
                if (data) {
                    setPost(data);
                } else {
                    setError("Post not found");
                }
            } catch (err: any) {
                setError(err.message || "Failed to load post");
            } finally {
                setLoading(false);
            }
        };
        loadPost();
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

    return (
        <>
            <SEO
                title={`${post.title} | MediaMatic Studio Blog`}
                description={post.excerpt}
                canonical={`/blog/${post.slug}/`}
                image={post.featured_image}
            />

            <main className="min-h-screen bg-[#faf3e0] pt-28 pb-20">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #652b32 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Back Navigation */}
                    <div className="mb-8">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-[#652b32]/60 hover:text-[#652b32] transition-colors font-bold uppercase tracking-widest text-xs"
                        >
                            <ArrowLeft size={14} /> Back to Blog
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* Main Content Area */}
                        <article className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#652b32]/5">
                            {/* Breadcrumbs */}
                            <nav className="flex items-center flex-wrap gap-2 text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
                                <Link to="/" className="hover:text-[#652b32]">Home</Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link to="/blog" className="hover:text-[#652b32]">Blog</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-[#652b32]">{post.category}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#652b32] leading-tight mb-8">
                                {post.title}
                            </h1>

                            {/* Author & Meta */}
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#faf3e0]"
                                />
                                <div>
                                    <div className="text-sm font-bold text-gray-900 mb-1">
                                        By {post.author.name}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> {post.publish_date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" /> {post.read_time}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 shadow-lg">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div
                                className={styles.blogContent}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* FAQ Section */}
                            <FAQAccordion faqs={faqs} />
                        </article>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 sticky top-28">
                            <BlogSidebar currentSlug={post.slug} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogPostDetail;
