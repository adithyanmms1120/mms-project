// BlogPost interface for WordPress mapping
export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    publish_date: string;
    read_time: string;
    featured_image: string;
    excerpt: string;
    content: string;
    faqs?: { question: string; answer: string }[];
}

export function mapWPPostToBlogPost(wpPost: any): BlogPost {

    // Clean HTML and decode entities safely
    const cleanContent = (html: string = ""): string => {
        return html
            .replace(/<[^>]*>?/gm, '') // Strip tags
            .replace(/&nbsp;/g, ' ')   // Decode space
            .replace(/&amp;/g, '&')    // Decode amp
            .replace(/&lt;/g, '<')     // Decode lt
            .replace(/&gt;/g, '>')     // Decode gt
            .replace(/&quot;/g, '"')   // Decode quotes
            .replace(/&#039;/g, "'")   // Decode apostrophe
            .trim();
    };

    // Calculate read time safely
    const wordCount = cleanContent(wpPost.content?.rendered || "")
        .split(/\s+/)
        .filter(Boolean).length;

    return {
        id: wpPost.id,

        title: wpPost.title?.rendered || "Untitled Post",

        slug: wpPost.slug || `post-${wpPost.id}`,

        category:
            wpPost._embedded?.['wp:term']?.[0]?.[0]?.name ||
            "Uncategorized",

        author: {
            name: wpPost._embedded?.author?.[0]?.name || "Admin",
            role: "Author",
            avatar:
                wpPost._embedded?.author?.[0]?.avatar_urls?.['96'] ||
                "https://i.pravatar.cc/150",
        },

        publish_date: new Date(wpPost.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),

        read_time: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,

        // ✅ Priority: Yoast OG → Featured Media → Default
        featured_image:
            wpPost.yoast_head_json?.og_image?.[0]?.url ||
            wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000",

        excerpt:
            wpPost.excerpt?.rendered
                ? cleanContent(wpPost.excerpt.rendered)
                : "",

        content: wpPost.content?.rendered || "",

        faqs: wpPost.acf?.faqs?.length ? wpPost.acf.faqs : parseFAQsFromContent(wpPost.content?.rendered || "")
    };
}

// Fallback: Parse FAQs from HTML content if ACF is missing
function parseFAQsFromContent(html: string): { question: string; answer: string }[] {
    if (!html) return [];

    const faqs: { question: string; answer: string }[] = [];
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Find the FAQ start (usually a heading containing "FAQ")
    const headings = Array.from(tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const faqHeading = headings.find(h => {
        const text = h.textContent?.toLowerCase() || "";
        return text.includes("faq") || text.includes("frequently asked questions");
    });

    if (!faqHeading) return [];

    const faqLevel = parseInt(faqHeading.tagName[1]);
    // Iterate through siblings after the FAQ heading
    let current = faqHeading.nextElementSibling;
    let currentQuestion = "";
    let currentAnswer = "";

    while (current) {
        const tagName = current.tagName.toLowerCase();
        const tagLevel = tagName.startsWith('h') ? parseInt(tagName[1]) : 0;
        const text = current.textContent?.trim() || "";

        if (!text && !current.querySelector('img')) {
            current = current.nextElementSibling;
            continue;
        }

        // Stop condition: 
        // 1. We hit a heading of the SAME or HIGHER level than the FAQ title (e.g. FAQ is H2, we hit another H2)
        // 2. AND it doesn't look like a question (doesn't end with a question mark)
        // 3. AND it's not the very first thing after the FAQ title
        if (tagLevel > 0 && tagLevel <= faqLevel && !text.endsWith('?') && currentQuestion !== "") {
            break;
        }

        // Possible Question: Any heading (h2-h6) or a paragraph starting with a number or containing bold text
        const isHeading = tagLevel > 0;
        const isBoldStart = tagName === "p" && (current.querySelector("strong") || text.match(/^\d+[\.\)]/));
        const isLikelyQuestion = text.endsWith('?') || (text.length > 5 && text.length < 200 && (isHeading || isBoldStart));

        if (isLikelyQuestion) {
            // If we already had a question/answer pair, save it
            if (currentQuestion && currentAnswer) {
                faqs.push({ question: currentQuestion, answer: currentAnswer });
                currentAnswer = "";
            }
            currentQuestion = text.replace(/^\d+[\.\)]\s*/, ""); // Strip leading numbers
        } else if (currentQuestion) {
            // Collect paragraphs, lists, images etc. into the answer
            currentAnswer += current.outerHTML;
        }

        current = current.nextElementSibling;
    }

    // Push last pair
    if (currentQuestion && currentAnswer) {
        faqs.push({ question: currentQuestion, answer: currentAnswer });
    }

    return faqs;
}
