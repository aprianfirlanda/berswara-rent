import Link from "next/link";
import { notFound } from "next/navigation";
import { getDynamicProducts } from "@/lib/cms";
import { requireAdminPage } from "@/lib/admin-auth";
import { AdminProductForm } from "@/components/admin-product-form";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditProductPage({ params }: Props) {
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

  const { id } = await params;
  const products = await getDynamicProducts();
  const categoryOptions = Array.from(new Set(products.map((item) => item.category)));
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Edit Product</h1>
        <Link href="/admin/products" className="rounded border border-[var(--brand-soft)] px-3 py-2 text-sm">Back to List</Link>
      </div>
      <AdminProductForm product={product} categoryOptions={categoryOptions} />
    </main>
  );
}
