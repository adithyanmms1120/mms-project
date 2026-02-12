export interface BlogPost {
    title: string;
    slug: string;
    author: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
    };
    content: string;
    featured_image: string | null;
    status: 'draft' | 'scheduled' | 'published';
    publish_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
