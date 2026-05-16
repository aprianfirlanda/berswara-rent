import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { FaqSection } from "@/components/faq-section";
import { categoryLabel } from "@/lib/products";
import { getDynamicProducts, getSiteContent } from "@/lib/cms";
import { getLocale } from "@/lib/i18n";

export default async function Home() {
  const locale = await getLocale();
  const isId = locale === "id";
  const content = await getSiteContent(locale);
  const products = await getDynamicProducts();
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
      <section className="relative overflow-hidden px-4 pt-5">
        <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-[var(--brand-soft)]/70" />
        <div className="absolute -right-10 bottom-10 h-36 w-36 rounded-full bg-[var(--brand-peach)]/45" />
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-[var(--brand-soft)] bg-[var(--surface)] px-6 py-10 shadow-sm md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-[var(--brand-soft)] px-4 py-1 text-xs font-bold text-[var(--brand-secondary)]">
              {content.heroBadge}
            </span>
            <h1 className="text-4xl font-bold leading-tight text-[var(--brand-primary)] md:text-5xl">
              {content.heroTitle}
            </h1>
            <p className="max-w-xl text-base text-[var(--muted)]">
              {content.heroDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="rounded-full bg-[var(--brand-secondary)] px-6 py-3 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5">
                {isId ? "Lihat Katalog" : "Browse Catalog"}
              </Link>
              <Link href="/how-to-rent" className="rounded-full border border-[var(--brand-soft)] bg-white px-6 py-3 text-sm font-bold text-[var(--brand-primary)] hover:bg-[var(--brand-accent)]/45">
                {isId ? "Cara Sewa" : "How It Works"}
              </Link>
            </div>
          </div>
          <Image
            src="/images/hero-baby-stroller.svg"
            alt="Baby in premium stroller for rental service"
            width={900}
            height={620}
            className="float-soft h-auto w-full rounded-3xl border border-[var(--brand-soft)] bg-white p-2"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-[var(--brand-primary)]">{isId ? "Kategori Unggulan" : "Featured Categories"}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {categories.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="rounded-3xl border border-[var(--brand-soft)] bg-white p-6 shadow-sm hover:-translate-y-0.5"
            >
              <div className="mb-3 h-10 w-10 rounded-full bg-[var(--brand-soft)]" />
              <h3 className="text-xl font-bold text-[var(--brand-primary)]">{label}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {isId ? `Lihat ${label.toLowerCase()} yang tersedia untuk disewa.` : `See available ${label.toLowerCase()} for rent.`}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-3xl font-bold text-[var(--brand-primary)]">{isId ? "Produk Unggulan" : "Featured Products"}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 rounded-3xl border border-[var(--brand-soft)] bg-[var(--brand-accent)]/40 p-6 md:grid-cols-3">
          {content.benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-3xl border border-[var(--brand-soft)] bg-white p-5">
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-3xl font-bold text-[var(--brand-primary)]">{isId ? "Testimonial Orang Tua" : "Parent Testimonials"}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {content.testimonials.map((text) => (
            <article key={text} className="rounded-3xl border border-[var(--brand-soft)] bg-[var(--brand-soft)]/55 p-5 shadow-sm">
              <p className="text-sm text-[var(--foreground)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection faqs={content.faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </main>
  );
}
