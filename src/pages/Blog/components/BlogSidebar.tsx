import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchRecentPosts, fetchBlogPostBySlug } from "@/services/api";
import { Calendar } from "lucide-react";
import styles from "../Blog.module.css";
import BlogContactForm from "./BlogContactForm";
import logo from "@/assets/LOGO-blog.png";

interface BlogSidebarProps {
    currentSlug?: string;
    showRecent?: boolean;
    showContact?: boolean;
    variant?: 'card' | 'ghost';
}

const BlogSidebar = ({
    currentSlug,
    showRecent = true,
    showContact = true,
    variant = 'card'
}: BlogSidebarProps) => {
    const queryClient = useQueryClient();
    const { data: allPosts = [], isLoading: loading } = useQuery({
        queryKey: ["recent-posts"],
        queryFn: () => fetchRecentPosts(4),
        staleTime: 0,  // Fresh instantly
        gcTime: 1000 * 60 * 30,     // Keep in memory for 30 mins
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const prefetchPost = (slug: string) => {
        queryClient.prefetchQuery({
            queryKey: ["blog-post", slug],
            queryFn: () => fetchBlogPostBySlug(slug),
            staleTime: 1000 * 60 * 5,
        });
    };

    const recentPosts = currentSlug
        ? allPosts.filter((p: any) => p.slug !== currentSlug).slice(0, 3)
        : allPosts.slice(0, 3);

    return (
        <aside className="space-y-8">
            {/* Recent Posts */}
            {showRecent && (
                <div className={variant === 'card' ? styles.sidebarCard : ""}>
                    <h3 className="text-xl font-bold mb-6 text-[#652b32]">Recent Posts</h3>
                    {loading ? (
                        <div className="text-center py-4 text-gray-500">Loading...</div>
                    ) : (
                        <div className="space-y-4">
                            {recentPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}/`}
                                    className="flex gap-4 group hover:bg-[#faf3e0] p-2 rounded-lg transition-all"
                                    onMouseEnter={() => prefetchPost(post.slug)}
                                >
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#652b32]/5">
                                        <img
                                            src={post.featured_image?.includes("unsplash") ? logo : (post.featured_image || logo)}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#652b32] transition-colors">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            <span>{post.publish_date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Contact Form */}
            {showContact && <BlogContactForm variant={variant} />}
        </aside>
    );
};

export default BlogSidebar;
