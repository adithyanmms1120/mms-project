import { mapWPPostToBlogPost } from "../utils/wp-mapper";

const API_URL = import.meta.env.VITE_API_URL || "https://mediamaticstudio.com/api";
// WordPress REST API endpoint - now pointing to your installation!
const WP_URL = import.meta.env.VITE_WP_URL || "https://blog.mediamaticstudio.com/wp-json/wp/v2";

export async function fetchBlogPosts(page: number = 1): Promise<{ posts: any[], totalPages: number }> {
    // Request only the fields needed for the card grid view
    const fields = [
        "id", "slug", "title", "excerpt", "date", "content",
        "featured_media", "categories", "tags", "_links", "author", "yoast_head_json", "acf"
    ].join(",");

    const response = await fetch(
        `${WP_URL}/posts?page=${page}&per_page=9&_embed=wp:featuredmedia,wp:term,author&_fields=${fields},_embedded&t=${Date.now()}`,
        { cache: "no-store" }
    );
    if (!response.ok) {
        throw new Error(`Error fetching blog posts: ${response.statusText}`);
    }
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
    const posts = await response.json();
    return {
        posts: posts.map(mapWPPostToBlogPost),
        totalPages
    };
}

export async function fetchRecentPosts(count: number = 4): Promise<any[]> {
    const fields = [
        "id", "slug", "title", "excerpt", "date", "featured_media",
        "categories", "tags", "_links", "author", "yoast_head_json", "acf"
    ].join(",");
    const response = await fetch(
        `${WP_URL}/posts?per_page=${count}&_embed=wp:featuredmedia,wp:term,author&_fields=${fields},_embedded&t=${Date.now()}`,
        { cache: "no-store" }
    );
    if (!response.ok) return [];
    const posts = await response.json();
    return posts.map(mapWPPostToBlogPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<any> {
    const response = await fetch(
        `${WP_URL}/posts?slug=${slug}&_embed&t=${Date.now()}`,
        { cache: "no-store" }
    );
    if (!response.ok) {
        throw new Error(`Error fetching blog post: ${response.statusText}`);
    }
    const posts = await response.json();
    return posts.length > 0 ? mapWPPostToBlogPost(posts[0]) : null;
}

export async function sendContactMail(data: any): Promise<any> {
    const response = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function sendQuoteRequest(data: any): Promise<any> {
    const response = await fetch(`${API_URL}/contact/quote/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    return response.json();
}
