import styles from "../Blog.module.css";

const BlogSkeleton = () => {
    return (
        <div className={`${styles.card} flex flex-col h-full animate-pulse`}>
            {/* Image Skeleton */}
            <div className="aspect-[16/10] bg-gray-200 w-full relative">
                <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 rounded-full" />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col flex-1 space-y-4">
                {/* Meta */}
                <div className="flex gap-4">
                    <div className="w-20 h-4 bg-gray-200 rounded" />
                    <div className="w-20 h-4 bg-gray-200 rounded" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <div className="w-full h-8 bg-gray-300 rounded" />
                    <div className="w-2/3 h-8 bg-gray-300 rounded" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded" />
                    <div className="w-full h-4 bg-gray-200 rounded" />
                    <div className="w-4/5 h-4 bg-gray-200 rounded" />
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300" />
                        <div className="w-24 h-4 bg-gray-200 rounded" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default BlogSkeleton;
