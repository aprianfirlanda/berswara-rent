import Image from "next/image";
import Link from "next/link";
import { Product, categoryLabel, formatIdr } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const isId = locale === "id";
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <Image
        src={product.photos[0]}
        alt={`${product.name} ${product.brand} front view`}
        width={640}
        height={420}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="text-xs font-medium text-sky-700">{categoryLabel[product.category]}</div>
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-600">{formatIdr(product.weeklyPrice)}/week</p>
        <p className={`text-xs font-medium ${product.availability ? "text-emerald-700" : "text-amber-700"}`}>
          {product.availability ? (isId ? "Tersedia" : "Available") : isId ? "Ketersediaan Terbatas" : "Limited Availability"}
        </p>
        <Link
          href={`/product/${product.id}`}
          className="inline-flex rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          {isId ? "Lihat Detail" : "View Details"}
        </Link>
      </div>
    </article>
  );
}
