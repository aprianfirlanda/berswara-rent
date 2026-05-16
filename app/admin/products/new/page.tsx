import Link from "next/link";
import { getDynamicProducts } from "@/lib/cms";
import { requireAdminPage } from "@/lib/admin-auth";
import { AdminProductForm } from "@/components/admin-product-form";

export default async function AdminNewProductPage() {
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
  const categoryOptions = Array.from(new Set(products.map((item) => item.category)));

  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <Link href="/admin/products" className="rounded border border-[var(--brand-soft)] px-3 py-2 text-sm">Back to List</Link>
      </div>
      <AdminProductForm categoryOptions={categoryOptions} />
    </main>
  );
}
