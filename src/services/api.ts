
const API_URL = import.meta.env.VITE_API_URL || "https://www.mediamaticstudio.com/api";

export async function fetchBlogPosts(page: number = 1): Promise<any> { // Using any until pagination logic is clear
    const response = await fetch(`${API_URL}/blog/posts/?page=${page}`);
    if (!response.ok) {
        throw new Error(`Error fetching blog posts: ${response.statusText}`);
    }
    return response.json();
}

export async function fetchBlogPostBySlug(slug: string): Promise<any> {
    const response = await fetch(`${API_URL}/blog/posts/${slug}/`);
    if (!response.ok) {
        throw new Error(`Error fetching blog post: ${response.statusText}`);
    }
    return response.json();
}

// Admin / Auth Functions
// Note: Frontend implementation for Admin Login & Management is planned but authentication logic is assumed to be handled separately.
// For now, we focus on public access.
