import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog | Berswara Rent",
  description: "Parenting tips and baby gear reviews from Berswara Rent.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const locale = await getLocale();
  const isId = locale === "id";
  return (
    <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{isId ? "Blog & Artikel" : "Blog & Articles"}</h1>
      <p className="mt-2 text-sm text-slate-600">
        {isId ? "Tips parenting dan ulasan perlengkapan untuk keluarga di Bandung." : "Parenting tips and gear reviews for families in Bandung."}
      </p>
      <div className="mt-8 space-y-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-sky-700">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            <p className="mt-3 text-xs text-slate-500">{post.publishedAt} • {post.author}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
