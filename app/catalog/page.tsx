import type { Metadata } from "next";
import Link from "next/link";
import { CatalogSearch } from "@/components/catalog-search";
import { categoryLabel } from "@/lib/products";
import { getDynamicProducts } from "@/lib/cms";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Catalog | Berswara Rent",
  description: "Explore strollers, push walkers, and push bikes available for rental in Bandung.",
  alternates: { canonical: "/catalog" },
};

export default async function CatalogPage() {
  const locale = await getLocale();
  const products = await getDynamicProducts();
  const isId = locale === "id";
  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{isId ? "Katalog" : "Catalog"}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(categoryLabel).map(([slug, label]) => (
          <Link key={slug} href={`/category/${slug}`} className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] px-3 py-1 text-sm">
            {label}
          </Link>
        ))}
      </div>
      <CatalogSearch products={products} locale={locale} />
    </main>
  );
}
