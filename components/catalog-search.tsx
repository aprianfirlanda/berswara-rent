"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import type { Locale } from "@/lib/i18n";

type Props = {
  products: Product[];
  locale: Locale;
};

export function CatalogSearch({ products, locale }: Props) {
  const isId = locale === "id";
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
      );
    });
  }, [products, query]);

  return (
    <section className="mt-6">
      <label htmlFor="catalog-search" className="mb-2 block text-sm font-medium text-[var(--brand-secondary)]">
        {isId ? "Cari produk" : "Search products"}
      </label>
      <input
        id="catalog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={isId ? "Cari berdasarkan nama, brand, atau kategori" : "Search by name, brand, or category"}
        className="w-full rounded border border-[var(--brand-soft)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]"
      />
      <p className="mt-3 text-sm text-[var(--muted)]">
        {isId ? `${filteredProducts.length} produk ditemukan` : `${filteredProducts.length} product(s) found`}
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </section>
  );
}
