import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  externalUrl: string | null;
  coverImage: string | null;
  content: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".md"))
    .map(filename => {
      const slug = filename.replace(/\.md$/, "");
      return getPost(slug)!;
    })
    .filter(Boolean)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title:       data.title        ?? "Untitled",
    excerpt:     data.excerpt       ?? "",
    date:        data.date          ?? "",
    tags:        data.tags          ?? [],
    externalUrl: data.externalUrl   ?? null,
    coverImage:  data.coverImage    ?? null,
    content,
  };
}
