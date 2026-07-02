import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                 lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/services`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/refer`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/book`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
