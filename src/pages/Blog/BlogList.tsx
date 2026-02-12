import { useNavigate, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { dummyPosts } from "@/data/dummyBlogs";
import { Calendar, User, ArrowRight, Clock, ArrowLeft } from "lucide-react";

const BlogList = () => {
    const navigate = useNavigate();

    return (
        <>
            <SEO
                title="Blog | MediaMatic Studio"
                description="Read the latest insights, tips, and updates from MediaMatic Studio. Explore articles on digital marketing, web development, design, and more."
                canonical="/blog"
                keywords="blog, digital marketing blog, web development articles, design tips, MediaMatic Studio blog"
            />

            <main className="min-h-screen bg-background py-20 md:py-28">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-12 flex items-center gap-2 text-foreground/50 hover:text-foreground transition-all group font-bold uppercase tracking-widest text-[10px]"
                    >
                        <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        Back to Website
                    </button>

                    {/* Header */}
                    <div className="text-center mb-14 md:mb-20">
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-semibold mb-4">
                            Our Blog
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-3xl font-black text-foreground leading-tight mb-8">
                            Latest Insights
                        </h1>
                        <div className="w-24 h-[1.5px] bg-foreground/30 mx-auto rounded-full" />
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {dummyPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="group bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                            >
                                {/* Featured Image */}
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{post.publish_date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{post.read_time}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    {/* Footer Info */}
                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-50"
                                            />
                                            <span className="text-xs font-semibold text-gray-700">{post.author.name}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:translate-x-1 transition-all">
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogList;
