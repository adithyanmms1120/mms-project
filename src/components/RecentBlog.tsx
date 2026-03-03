import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchRecentPosts } from "@/services/api";
import BlogCard from "@/pages/Blog/components/BlogCard";
import { Loader2, ArrowRight } from "lucide-react";

export const RecentBlog = () => {
    const { data: recentPosts, isLoading } = useQuery({
        queryKey: ["recent-posts-home"],
        queryFn: () => fetchRecentPosts(3),
        staleTime: 1000 * 60 * 30, // 30 mins
    });

    return (
        <section className="py-16 bg-[#faf3e0]">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#652b32] mb-4 uppercase tracking-tight">
                            Recent <span className="text-yellow-500">Blog</span>
                        </h2>
                        <p className="text-[#652b32]/60 text-lg font-medium">
                            The latest insights from our creative team
                        </p>
                    </div>
                    <Link
                        to="/blog/"
                        className="inline-flex items-center gap-2 bg-white text-[#652b32] px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all border border-[#652b32]/10"
                    >
                        View All Posts <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 text-[#652b32] animate-spin opacity-20" />
                        <p className="text-[#652b32]/40 font-bold uppercase tracking-widest text-xs">Fetching latest posts...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentPosts?.slice(0, 3).map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
