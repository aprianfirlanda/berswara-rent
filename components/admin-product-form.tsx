import { saveProduct, uploadProductImage } from "@/app/admin/actions";
import { AdminProductRichFields } from "@/components/admin-product-rich-fields";
import type { Product } from "@/lib/products";

export function AdminProductForm({ product, categoryOptions }: { product?: Product; categoryOptions: string[] }) {
  return (
    <div className="space-y-6">
      <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">{product ? `Edit Product: ${product.name}` : "Add Product"}</h2>
        <form action={saveProduct} className="mt-5 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm">Product ID (optional)<input name="id" defaultValue={product?.id ?? ""} placeholder="auto-from-name" className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Name<input name="name" required defaultValue={product?.name ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">
              Category
              <input
                name="category"
                list="category-options"
                defaultValue={product?.category ?? ""}
                required
                className="mt-1 w-full rounded border px-3 py-2"
                placeholder="e.g. strollers"
              />
              <datalist id="category-options">
                {categoryOptions.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </label>
            <label className="block text-sm">Brand<input name="brand" defaultValue={product?.brand ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Age Range<input name="ageRange" defaultValue={product?.ageRange ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Weight Capacity<input name="weightCapacity" defaultValue={product?.weightCapacity ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm md:col-span-2">Dimensions<input name="dimensions" defaultValue={product?.dimensions ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
          </div>
          <label className="block text-sm">Description<textarea name="description" defaultValue={product?.description ?? ""} rows={3} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Features (one per line)<textarea name="features" defaultValue={(product?.features ?? []).join("\n")} rows={3} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Availability Last Updated<input type="date" name="availabilityLastUpdated" defaultValue={product?.availabilityLastUpdated ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <div className="flex gap-4 text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="availability" defaultChecked={product ? product.availability : true} /> Available</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} /> Featured</label>
          </div>

          <AdminProductRichFields
            initialPrices={product?.prices ?? [
              { label: "Weekly", amount: product?.weeklyPrice ?? 0 },
              { label: "Monthly", amount: product?.monthlyPrice ?? 0 },
            ]}
            initialPhotos={product?.photos ?? []}
            initialVideos={product?.videos ?? []}
            initialAvailability={product?.availabilityCalendar ?? []}
          />

          <button type="submit" className="rounded bg-[var(--brand-secondary)] px-4 py-2 text-sm font-medium text-white">{product ? "Update Product" : "Add Product"}</button>
        </form>
      </section>

      {product ? (
        <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
          <h3 className="text-sm font-semibold">Upload Photo to {product.name}</h3>
          <form action={uploadProductImage} className="mt-3 grid gap-2 md:grid-cols-[1fr_auto]">
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="redirectTo" value={`/admin/products/${product.id}/edit`} />
            <input type="file" name="image" accept="image/*" required className="w-full rounded border px-3 py-2" />
            <button type="submit" className="rounded bg-[var(--brand-secondary)] px-3 py-2 text-white">Upload Image</button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
