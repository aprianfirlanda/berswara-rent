import Image from "next/image";
import Link from "next/link";
import { Product, categoryLabel, formatIdr } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const isId = locale === "id";
  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--brand-soft)] bg-white shadow-sm">
      <Image
        src={product.photos[0]}
        alt={`${product.name} ${product.brand} front view`}
        width={640}
        height={420}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="inline-block rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-bold text-[var(--brand-secondary)]">{categoryLabel[product.category]}</div>
        <h3 className="text-lg font-semibold text-[var(--brand-secondary)]">{product.name}</h3>
        <p className="text-sm text-[var(--muted)]">{formatIdr(product.weeklyPrice)}/week</p>
        <p className={`text-xs font-medium ${product.availability ? "text-[var(--brand-secondary)]" : "text-[var(--brand-primary)]"}`}>
          {product.availability ? (isId ? "Tersedia" : "Available") : isId ? "Ketersediaan Terbatas" : "Limited Availability"}
        </p>
        <Link
          href={`/product/${product.id}`}
          className="inline-flex rounded-full bg-[var(--brand-secondary)] px-4 py-2 text-sm font-bold text-white hover:-translate-y-0.5"
        >
          {isId ? "Lihat Detail" : "View Details"}
        </Link>
      </div>
    </article>
  );
}
