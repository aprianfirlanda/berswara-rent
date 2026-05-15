import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { categoryLabel, getProductsByCategory, ProductCategory } from "@/lib/products";
import { getLocale } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(categoryLabel).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug as ProductCategory;
  const label = categoryLabel[category];
  if (!label) return {};

  return {
    title: `${label} | Berswara Rent`,
    description: `Browse ${label.toLowerCase()} available for rental in Bandung.`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const locale = await getLocale();
  const isId = locale === "id";
  const { slug } = await params;
  const category = slug as ProductCategory;
  const label = categoryLabel[category];

  if (!label) notFound();

  const items = getProductsByCategory(category);
  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{label}</h1>
      <p className="mt-2 text-sm text-slate-600">{isId ? "Katalog dengan filter kategori." : "Category filtered catalog."}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </main>
  );
}
