import { mapWPPostToBlogPost } from "../utils/wp-mapper";

const API_URL = import.meta.env.VITE_API_URL || "https://mediamaticstudio.com/api";
// WordPress REST API endpoint - now pointing to your installation!
const WP_URL = import.meta.env.VITE_WP_URL || "https://blog.mediamaticstudio.com/wp-json/wp/v2";

export async function fetchBlogPosts(page: number = 1): Promise<{ posts: any[], totalPages: number }> {
    const response = await fetch(`${WP_URL}/posts?page=${page}&_embed`);
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

export async function fetchBlogPostBySlug(slug: string): Promise<any> {
    const response = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`);
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
