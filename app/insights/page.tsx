import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights | Foundry",
  description:
    "Practical thinking on web credibility, referral growth and product consulting from Ehren at Foundry.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-cream border-b border-foundry-mist">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Insights
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] max-w-[640px]">
            Thinking about growth, credibility and product.
          </h1>
        </div>
      </section>

      {/* ── Post list ── */}
      <section className="px-8 md:px-16 py-[3rem] md:py-[5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          {posts.length === 0 ? (
            <p className="text-foundry-stone">No posts yet. Check back soon.</p>
          ) : (
            <div className="flex flex-col divide-y divide-foundry-mist">
              {posts.map(post => (
                <article key={post.slug} className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-12 items-start">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-foundry-ink font-medium text-[1.25rem] leading-[1.3] hover:text-foundry-stone transition-colors duration-200">
                      {post.externalUrl ? (
                        <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                          {post.title}
                          <span style={{ marginLeft: "0.4em", fontSize: "0.8em", opacity: 0.5 }}>↗</span>
                        </a>
                      ) : (
                        <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                      )}
                    </h2>
                    <p className="text-foundry-stone text-sm leading-relaxed max-w-[600px]">
                      {post.excerpt}
                    </p>
                    {!post.externalUrl && (
                      <Link
                        href={`/insights/${post.slug}`}
                        className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200 self-start"
                      >
                        Read
                      </Link>
                    )}
                  </div>
                  <div className="text-foundry-stone text-sm whitespace-nowrap md:pt-[0.35rem]">
                    {formatDate(post.date)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
