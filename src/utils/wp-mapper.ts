import { BlogPost } from "../data/dummyBlogs";

export function mapWPPostToBlogPost(wpPost: any): BlogPost {
    // Helper to strip HTML tags for the excerpt if needed
    const stripHtml = (html: string) => {
        const doc = new Array(html.length); // simple fallback
        return html.replace(/<[^>]*>?/gm, '');
    };

    return {
        id: wpPost.id,
        title: wpPost.title.rendered,
        slug: wpPost.slug,
        category: wpPost._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized",
        author: {
            name: wpPost._embedded?.author?.[0]?.name || "Admin",
            role: "Author",
            avatar: wpPost._embedded?.author?.[0]?.avatar_urls?.['96'] || "https://i.pravatar.cc/150",
        },
        publish_date: new Date(wpPost.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        read_time: `${Math.ceil(wpPost.content.rendered.split(' ').length / 200)} min read`,
        featured_image: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000",
        excerpt: wpPost.excerpt.rendered ? stripHtml(wpPost.excerpt.rendered) : "",
        content: wpPost.content.rendered
    };
}
