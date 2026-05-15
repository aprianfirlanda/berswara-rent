import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categoryLabel, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalog | Berswara Rent",
  description: "Explore strollers, push walkers, and push bikes available for rental in Bandung.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Catalog</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(categoryLabel).map(([slug, label]) => (
          <Link key={slug} href={`/category/${slug}`} className="rounded border border-slate-300 px-3 py-1 text-sm">
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
