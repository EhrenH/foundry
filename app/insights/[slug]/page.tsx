import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getAllPosts, getPost } from "@/lib/blog";
import BlogInteractions from "@/components/BlogInteractions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title:       `${post.title} | Foundry`,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await marked(post.content, { gfm: true });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:        post.title,
    description:     post.excerpt,
    datePublished:   post.date,
    author: {
      "@type": "Person",
      name:  "Ehren Hendricks",
      url:   "https://foundry.co.za/about",
    },
    publisher: {
      "@type":  "Organization",
      name:     "Foundry",
      url:      "https://foundry.co.za",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* ── Back nav ── */}
        <div className="px-8 md:px-16 py-5 border-b border-foundry-mist bg-foundry-white">
          <div className="max-w-[760px] mx-auto">
            <Link
              href="/insights"
              className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-200"
            >
              Insights
            </Link>
          </div>
        </div>

        {/* ── Article ── */}
        <article className="px-8 md:px-16 py-[3rem] md:py-[5rem] bg-foundry-white">
          <div className="max-w-[760px] mx-auto">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
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
              <span className="text-foundry-stone text-sm">{formatDate(post.date)}</span>
            </div>

            {/* Headline */}
            <h1 className="text-[2rem] md:text-[2.75rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.1] mb-5">
              {post.title}
            </h1>
            <p className="text-foundry-stone text-lg leading-relaxed mb-10 border-b border-foundry-mist pb-10">
              {post.excerpt}
            </p>

            {/* Body */}
            <div
              className="prose-foundry"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Interactions */}
            <BlogInteractions slug={slug} />
          </div>
        </article>

        {/* ── CTA ── */}
        <section className="px-8 md:px-16 py-[3rem] md:py-[4rem] bg-foundry-cream border-t border-foundry-mist">
          <div className="max-w-[760px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-foundry-ink font-medium text-lg mb-1">Want to put this into practice?</p>
              <p className="text-foundry-stone text-sm">Book a call and we&rsquo;ll figure out where to start.</p>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center bg-foundry-ochre text-white font-medium px-5 py-3 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-200 whitespace-nowrap text-sm"
            >
              Book a call
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
