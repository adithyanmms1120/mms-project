import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import styles from "../Blog.module.css";

interface BlogCardProps {
    post: {
        slug: string;
        title: string;
        excerpt: string;
        featured_image: string;
        category: string;
        publish_date: string;
        read_time: string;
        author: {
            name: string;
            avatar: string;
        };
    };
}

import logo from "@/assets/LOGO-blog.png";

import { useQueryClient } from "@tanstack/react-query";
import { fetchBlogPostBySlug } from "@/services/api";

const BlogCard = ({ post }: BlogCardProps) => {
    const queryClient = useQueryClient();

    const prefetchPost = () => {
        queryClient.prefetchQuery({
            queryKey: ["blog-post", post.slug],
            queryFn: () => fetchBlogPostBySlug(post.slug),
            staleTime: 1000 * 60 * 5,
        });
    };

    return (
        <Link
            to={`/blog/${post.slug}/`}
            className={`${styles.card} group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full`}
            onMouseEnter={prefetchPost}
        >
            {/* Featured Image */}
            <div className="aspect-[16/9] overflow-hidden relative bg-[#652b32]/5 flex items-center justify-center">
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#652b32] text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-md border border-[#652b32]/5">
                        {post.category}
                    </span>
                </div>
                <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#652b32]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-[10px] sm:text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>{post.publish_date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>{post.read_time}</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-black text-[#652b32] mb-2 group-hover:text-[#652b32] transition-colors line-clamp-2 leading-[1.3] tracking-tight">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-500 text-[13px] mb-4 line-clamp-3 leading-relaxed flex-1 font-medium">
                    {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <span className="text-[10px] font-semibold text-gray-700">{post.author.name}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#652b32]/10 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#652b32]" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
