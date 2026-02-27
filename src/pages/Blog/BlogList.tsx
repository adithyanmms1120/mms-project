import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { fetchBlogPosts } from "@/services/api";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import BlogCard from "./components/BlogCard";
import { Footer } from "@/components/Footer";
import { getPaginationMeta } from "@/utils/pagination-seo";
import { generateOrganizationSchema, generateCollectionPageSchema, generateBreadcrumbSchema } from "@/utils/seo-schemas";

const BlogList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Parse page from URL or default to 1
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);

    // Fetch posts
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["blog-posts", page],
        queryFn: () => fetchBlogPosts(page),
        staleTime: 0,  // Fresh instantly
        gcTime: 1000 * 60 * 30,     // Keep in memory for 30 mins
        refetchInterval: false,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    // Ensure page starts at top
    useState(() => {
        window.scrollTo(0, 0);
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        navigate(`?page=${newPage}`);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    // Calculate pagination meta
    const totalPages = data?.totalPages || 1;
    const paginationMeta = getPaginationMeta(page, totalPages, '/blog/');

    return (
        <>
            <SEO
                title={page === 1 ? `Blog | MediaMatic Studio` : `Blog - Page ${page} | MediaMatic Studio`}
                description="Read the latest insights, tips, and updates from MediaMatic Studio. Explore articles on digital marketing, web development, design, and more."
                canonical={paginationMeta.canonical}
                relNext={paginationMeta.relNext}
                relPrev={paginationMeta.relPrev}
                keywords="blog, digital marketing blog, web development articles, design tips, MediaMatic Studio blog"
                structuredData={[
                    generateBreadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Blog", url: "/blog/" }
                    ]),
                    generateCollectionPageSchema({
                        name: "MediaMatic Studio Blog",
                        description: "Latest insights on digital marketing, web development, design, and technology.",
                        url: "/blog/",
                        itemCount: data?.posts?.length || 0
                    }),
                    generateOrganizationSchema()
                ]}
            />

            <main className="min-h-screen bg-[#faf3e0] py-20 md:py-28">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #652b32 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                <div className="container mx-auto px-6 relative z-10 pb-20">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="mb-12 flex items-center gap-2 text-[#652b32]/50 hover:text-[#652b32] transition-all group font-bold uppercase tracking-widest text-[10px]"
                    >
                        <div className="w-8 h-8 rounded-full border border-[#652b32]/10 flex items-center justify-center group-hover:bg-[#652b32] group-hover:text-white transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        Back to Website
                    </button>

                    {/* Header */}
                    <div className="text-center mb-14 md:mb-20">
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-[#652b32]/40 font-semibold mb-4">
                            Our Blog
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#652b32] leading-tight mb-4 flex items-center justify-center gap-4">
                            Latest Insights
                        </h1>
                        {data && (
                            <div className="space-y-4 mb-8">
                                <p className="text-[9px] text-[#652b32]/30 uppercase tracking-widest font-bold">
                                    Our latest stories and insights
                                </p>
                            </div>
                        )}
                        <div className="w-24 h-[1.5px] bg-[#652b32]/30 mx-auto rounded-full" />
                    </div>

                    {/* Content Area */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Loader2 className="w-12 h-12 text-[#652b32] animate-spin" />
                            <p className="text-[#652b32]/60 font-medium animate-pulse">Fetching stories...</p>
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20">
                            <p className="text-red-500 font-bold mb-4">{error instanceof Error ? error.message : "Failed to load posts"}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-[#652b32] text-white rounded-lg font-bold hover:bg-[#4a1f25] transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Posts Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 relative">
                                {data?.posts.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                                {isFetching && !isLoading && (
                                    <div className="absolute inset-0 bg-[#faf3e0]/50 flex items-start justify-center pt-20 z-10 backdrop-blur-[1px]">
                                        <Loader2 className="w-8 h-8 text-[#652b32] animate-spin" />
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {data && data.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                        className="w-12 h-12 rounded-full border-2 border-[#652b32]/10 flex items-center justify-center text-[#652b32] hover:bg-[#652b32] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#652b32] transition-all"
                                        aria-label="Previous Page"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>

                                    <span className="text-sm font-bold text-[#652b32] tracking-widest">
                                        PAGE {page} OF {data.totalPages}
                                    </span>

                                    <button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page >= data.totalPages}
                                        className="w-12 h-12 rounded-full border-2 border-[#652b32]/10 flex items-center justify-center text-[#652b32] hover:bg-[#652b32] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#652b32] transition-all"
                                        aria-label="Next Page"
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BlogList;
