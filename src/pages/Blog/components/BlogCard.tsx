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

const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <Link
            to={`/blog/${post.slug}/`}
            className={`${styles.card} group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full`}
        >
            {/* Featured Image */}
            <div className="aspect-[16/10] overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#652b32] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                        {post.category}
                    </span>
                </div>
                <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
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
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#652b32] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <span className="text-xs font-semibold text-gray-700">{post.author.name}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#652b32]/10 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#652b32]" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
