"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type Props = {
  products: Product[];
};

export function CatalogSearch({ products }: Props) {
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
      <label htmlFor="catalog-search" className="mb-2 block text-sm font-medium text-slate-700">
        Search products
      </label>
      <input
        id="catalog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name, brand, or category"
        className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500"
      />
      <p className="mt-3 text-sm text-slate-600">{filteredProducts.length} product(s) found</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
