
async function checkAPI() {
    const WP_URL = "https://blog.mediamaticstudio.com/wp-json/wp/v2";
    console.log(`Checking API: ${WP_URL}/posts?per_page=5`);

    try {
        const response = await fetch(`${WP_URL}/posts?per_page=5&_=${Date.now()}`);
        if (!response.ok) {
            console.error(`Status: ${response.status} ${response.statusText}`);
            return;
        }

        const posts = await response.json();
        console.log(`Found ${posts.length} posts.`);
        posts.forEach((post, i) => {
            console.log(`${i + 1}. Title: ${post.title.rendered}`);
            console.log(`   Status: ${post.status}`);
            console.log(`   Date: ${post.date}`);
            console.log(`   Slug: ${post.slug}`);
            console.log('---');
        });
    } catch (error) {
        console.error("Error fetching:", error.message);
    }
}

checkAPI();
