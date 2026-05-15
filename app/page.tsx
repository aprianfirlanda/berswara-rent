import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categoryLabel, products } from "@/lib/products";

export default function Home() {
  const featured = products.filter((product) => product.featured);
  const categories = Object.entries(categoryLabel);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Berswara Rent",
    description: "Premium baby gear rental service in Bandung.",
    areaServed: "Bandung, Jawa Barat",
    address: { "@type": "PostalAddress", addressLocality: "Bandung", addressRegion: "Jawa Barat" },
  };

  return (
    <main className="flex-1">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold text-slate-900">
              Premium Baby Gear for Rent in Bandung
            </h1>
            <p className="text-base text-slate-600">
              Safe, clean, and practical rental options for strollers, push walkers, and push bikes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="rounded bg-sky-700 px-4 py-2 text-sm font-medium text-white">
                Browse Catalog
              </Link>
              <Link href="/how-to-rent" className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                How It Works
              </Link>
            </div>
          </div>
          <Image
            src="/images/hero-baby-stroller.svg"
            alt="Baby in premium stroller for rental service"
            width={900}
            height={620}
            className="h-auto w-full rounded-lg border border-slate-200"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Featured Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {categories.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="rounded-lg border border-slate-200 bg-white p-5 hover:border-sky-300"
            >
              <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
              <p className="mt-2 text-sm text-slate-600">See available {label.toLowerCase()} for rent.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold">Featured Products</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
          <article className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold">Hygiene First</h3>
            <p className="mt-2 text-sm text-slate-600">All items are sanitized before and after each rental.</p>
          </article>
          <article className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold">Premium Brands</h3>
            <p className="mt-2 text-sm text-slate-600">Trusted gear selected for comfort, safety, and reliability.</p>
          </article>
          <article className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold">Flexible Rental</h3>
            <p className="mt-2 text-sm text-slate-600">Weekly and monthly plans for short visits or longer use.</p>
          </article>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </main>
  );
}
