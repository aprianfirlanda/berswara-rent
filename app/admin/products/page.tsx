import Link from "next/link";
import { getDynamicProducts } from "@/lib/cms";
import { requireAdminPage } from "@/lib/admin-auth";
import { deleteProduct, signOutAdmin } from "@/app/admin/actions";

export default async function AdminProductsPage() {
  const auth = await requireAdminPage();
  if (!auth.isAllowed) {
    return (
      <main className="mx-auto flex-1 max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-3 text-sm text-red-600">
          This account is not allowed. Add `{auth.user.email}` to `ADMIN_EMAILS`.
        </p>
      </main>
    );
  }

  const products = await getDynamicProducts();

  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Product Admin</h1>
          <p className="text-sm text-[var(--muted)]">Logged in as {auth.user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin" className="rounded border border-[var(--brand-soft)] px-3 py-2 text-sm">Content Admin</Link>
          <Link href="/admin/products/new" className="rounded bg-[var(--brand-secondary)] px-3 py-2 text-sm font-medium text-white">Add Product</Link>
          <form action={signOutAdmin}>
            <button type="submit" className="rounded border border-[var(--brand-soft)] px-3 py-2 text-sm">Sign out</button>
          </form>
        </div>
      </div>

      <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--brand-soft)] text-left">
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Category</th>
                <th className="px-3 py-2 font-semibold">Primary Price</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[var(--brand-soft)]">
                  <td className="px-3 py-2">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-[var(--muted)]">{product.id}</div>
                  </td>
                  <td className="px-3 py-2">{product.category}</td>
                  <td className="px-3 py-2">
                    {product.prices[0] ? `${product.prices[0].label}: Rp ${product.prices[0].amount.toLocaleString("id-ID")}` : `Rp ${product.weeklyPrice.toLocaleString("id-ID")}`}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded px-2 py-1 text-xs ${product.availability ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {product.availability ? "Available" : "Limited"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="rounded border border-[var(--brand-soft)] px-3 py-1">Edit</Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="rounded border border-red-200 px-3 py-1 text-red-700">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
