import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "@/services/api";
import { Calendar, Clock } from "lucide-react";
import styles from "../Blog.module.css";
import BlogContactForm from "./BlogContactForm";

interface BlogSidebarProps {
    currentSlug?: string;
}

const BlogSidebar = ({ currentSlug }: BlogSidebarProps) => {
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecentPosts = async () => {
            try {
                const { posts } = await fetchBlogPosts(1);
                const filtered = currentSlug
                    ? posts.filter((p: any) => p.slug !== currentSlug).slice(0, 3)
                    : posts.slice(0, 3);
                setRecentPosts(filtered);
            } catch (error) {
                console.error("Failed to load recent posts:", error);
            } finally {
                setLoading(false);
            }
        };
        loadRecentPosts();
    }, [currentSlug]);

    return (
        <aside className="space-y-8">
            {/* Recent Posts */}
            <div className={styles.sidebarCard}>
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
                            >
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={post.featured_image}
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

            {/* Contact Form */}
            <BlogContactForm />
        </aside>
    );
};

export default BlogSidebar;
