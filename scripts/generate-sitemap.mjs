#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = process.env.VITE_SITE_URL || "https://mediamaticstudio.com";
const WP_API_URL = process.env.VITE_WP_URL || "https://blog.mediamaticstudio.com/wp-json/wp/v2";
const OUTPUT_SITEMAP = path.join(__dirname, "../public/sitemap.xml");
const OUTPUT_ROUTES = path.join(__dirname, "routes.json");

const services = [
  { slug: "digital-marketing", name: "Digital Marketing" },
  { slug: "web-development", name: "Web Development" },
  { slug: "designing", name: "Designing" },
  { slug: "animation", name: "Animation" },
  { slug: "contentmanagement", name: "Content Management" },
  { slug: "webhosting", name: "Web Hosting" },
];

const subServices = {
  "digital-marketing": ["seo", "smm", "sem", "email-marketing", "google-ads", "content-marketing"],
  "web-development": ["mobile-app", "website", "ecommerce", "custom-web", "ui-ux", "responsive"],
  "designing": ["logo", "brand-identity", "marketing-visuals", "social-media", "print", "guidelines"],
  "animation": ["2d-3d", "explainer", "concept", "scripting", "custom", "end-to-end"],
  "contentmanagement": ["seo-content", "copywriting", "social-content", "documentation", "blog", "brand-content"],
  "webhosting": ["shared", "dedicated", "domain-registration", "domain-transfer", "cpanel", "email"],
};

async function fetchAllBlogPosts() {
  const posts = [];
  let page = 1;
  let hasMore = true;
  console.log("📚 Fetching blog posts...");
  while (hasMore) {
    try {
      const response = await fetch(`${WP_API_URL}/posts?per_page=100&page=${page}&_embed=1`);
      if (!response.ok) break;
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) break;
      posts.push(...data);
      page++;
    } catch (e) {
      break;
    }
  }
  return posts;
}

function generateUrlEntry(url, priority = "0.7", changefreq = "weekly", lastmod = null) {
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>\n    <loc>${url}</loc>\n    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>${lastmodTag}\n  </url>`;
}

async function main() {
  try {
    const posts = await fetchAllBlogPosts();
    const urlEntries = [];
    const routesForPrerender = [];

    const addRoute = (urlPath, priority, changefreq, lastmod = null) => {
      // For Vite prerender, we just need the path
      routesForPrerender.push(urlPath);
      // For Sitemap, we need full absolute URL
      const fullUrl = `${SITE_URL}${urlPath}`;
      urlEntries.push(generateUrlEntry(fullUrl, priority, changefreq, lastmod));
    };

    // 1. Static Pages
    addRoute("/", "1.0", "daily");
    addRoute("/blog/", "0.8", "daily");
    addRoute("/get-quote/", "0.9", "monthly");
    addRoute("/contact/", "0.7", "monthly");
    addRoute("/contact-us/", "0.8", "monthly");

    // 2. Services
    services.forEach(s => addRoute(`/services/${s.slug}/`, "0.8", "weekly"));

    // 3. Sub-Services
    Object.entries(subServices).forEach(([serviceSlug, subs]) => {
      subs.forEach(sub => addRoute(`/services/${serviceSlug}/${sub}/`, "0.7", "weekly"));
    });

    // 4. Blog Posts
    posts.forEach(post => {
      const date = new Date(post.modified || post.date).toISOString().split("T")[0];
      addRoute(`/blog/${post.slug}/`, "0.7", "weekly", date);
    });

    // Write Sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join("\n")}\n</urlset>`;
    await fs.mkdir(path.dirname(OUTPUT_SITEMAP), { recursive: true });
    await fs.writeFile(OUTPUT_SITEMAP, xml, "utf8");
    console.log(`✅ Sitemap written to ${OUTPUT_SITEMAP}`);

    // Write Routes JSON
    await fs.writeFile(OUTPUT_ROUTES, JSON.stringify(routesForPrerender, null, 2), "utf8");
    console.log(`✅ Routes JSON written to ${OUTPUT_ROUTES}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

main();
