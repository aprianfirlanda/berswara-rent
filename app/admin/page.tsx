import Link from "next/link";
import { redirect } from "next/navigation";
import { getDynamicProducts, getSiteContent } from "@/lib/cms";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminEmails } from "@/lib/supabase/config";
import { signOutAdmin, saveProduct, saveSiteContent, deleteProduct, uploadProductImage } from "@/app/admin/actions";
import type { Locale } from "@/lib/i18n";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPage({ searchParams }: Props) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const allowedEmails = getAdminEmails();
  const currentEmail = user.email?.toLowerCase() ?? "";
  const isAllowed = allowedEmails.length === 0 || allowedEmails.includes(currentEmail);
  if (!isAllowed) {
    return (
      <main className="mx-auto flex-1 max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-3 text-sm text-red-600">
          This account is not allowed. Add `{user.email}` to `ADMIN_EMAILS`.
        </p>
      </main>
    );
  }

  const params = await searchParams;
  const locale = (typeof params.locale === "string" ? params.locale : "id") as Locale;
  const section = typeof params.section === "string" ? params.section : "content";
  const content = await getSiteContent(locale);
  const products = await getDynamicProducts();

  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Admin CMS</h1>
          <p className="text-sm text-[var(--muted)]">Logged in as {user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="rounded border border-[var(--brand-soft)] px-3 py-2 text-sm">
            View Site
          </Link>
          <form action={signOutAdmin}>
            <button type="submit" className="rounded bg-[var(--brand-secondary)] px-3 py-2 text-sm font-medium text-white">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={`/admin?section=content&locale=${locale}`}
          className={`rounded px-3 py-2 text-sm ${section === "content" ? "bg-[var(--brand-secondary)] text-white" : "border border-[var(--brand-soft)]"}`}
        >
          Content
        </Link>
        <Link
          href={`/admin?section=products&locale=${locale}`}
          className={`rounded px-3 py-2 text-sm ${section === "products" ? "bg-[var(--brand-secondary)] text-white" : "border border-[var(--brand-soft)]"}`}
        >
          Products
        </Link>
        <Link
          href={`/admin?section=media&locale=${locale}`}
          className={`rounded px-3 py-2 text-sm ${section === "media" ? "bg-[var(--brand-secondary)] text-white" : "border border-[var(--brand-soft)]"}`}
        >
          Media
        </Link>
      </div>

      {section === "content" ? (
        <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Site Content ({locale.toUpperCase()})</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">Switch locale by query string: `?locale=id` or `?locale=en`</p>
        <form action={saveSiteContent} className="mt-5 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <label className="block text-sm">Hero Badge<input name="heroBadge" defaultValue={content.heroBadge} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Hero Title<input name="heroTitle" defaultValue={content.heroTitle} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Hero Description<textarea name="heroDescription" defaultValue={content.heroDescription} className="mt-1 w-full rounded border px-3 py-2" rows={3} /></label>
          <label className="block text-sm">About Summary<textarea name="aboutSummary" defaultValue={content.aboutSummary} className="mt-1 w-full rounded border px-3 py-2" rows={3} /></label>

          <div className="grid gap-3 md:grid-cols-3">
            <label className="block text-sm">WhatsApp<input name="contactWhatsapp" defaultValue={content.contact.whatsapp} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Instagram<input name="contactInstagram" defaultValue={content.contact.instagram} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Location<input name="contactLocation" defaultValue={content.contact.location} className="mt-1 w-full rounded border px-3 py-2" /></label>
          </div>

          {[1, 2, 3].map((index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <label className="block text-sm">Benefit {index} Title<input name={`benefit_title_${index}`} defaultValue={content.benefits[index - 1]?.title ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
              <label className="block text-sm">Benefit {index} Description<input name={`benefit_description_${index}`} defaultValue={content.benefits[index - 1]?.description ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
            </div>
          ))}

          {[1, 2, 3].map((index) => (
            <label key={index} className="block text-sm">Testimonial {index}<input name={`testimonial_${index}`} defaultValue={content.testimonials[index - 1] ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
          ))}

          {[1, 2, 3].map((index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <label className="block text-sm">FAQ {index} Question<input name={`faq_q_${index}`} defaultValue={content.faqs[index - 1]?.q ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
              <label className="block text-sm">FAQ {index} Answer<input name={`faq_a_${index}`} defaultValue={content.faqs[index - 1]?.a ?? ""} className="mt-1 w-full rounded border px-3 py-2" /></label>
            </div>
          ))}

          <button type="submit" className="rounded bg-[var(--brand-secondary)] px-4 py-2 text-sm font-medium text-white">Save Content</button>
        </form>
        </section>
      ) : null}

      {section === "products" ? (
        <>
          <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Add / Update Product</h2>
        <form action={saveProduct} className="mt-5 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm">Product ID (optional)<input name="id" placeholder="auto-from-name" className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Name<input name="name" required className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Category
              <select name="category" className="mt-1 w-full rounded border px-3 py-2">
                <option value="strollers">strollers</option>
                <option value="push-walkers">push-walkers</option>
                <option value="push-bikes">push-bikes</option>
              </select>
            </label>
            <label className="block text-sm">Brand<input name="brand" className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Weekly Price<input type="number" name="weeklyPrice" defaultValue={0} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Monthly Price<input type="number" name="monthlyPrice" defaultValue={0} className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Age Range<input name="ageRange" className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Weight Capacity<input name="weightCapacity" className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm md:col-span-2">Dimensions<input name="dimensions" className="mt-1 w-full rounded border px-3 py-2" /></label>
          </div>
          <label className="block text-sm">Description<textarea name="description" rows={3} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Features (one per line)<textarea name="features" rows={3} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Photos URL (one per line)<textarea name="photos" rows={3} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Videos URL (one per line)<textarea name="videos" rows={2} className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Availability Last Updated<input type="date" name="availabilityLastUpdated" className="mt-1 w-full rounded border px-3 py-2" /></label>
          <label className="block text-sm">Availability Calendar JSON<textarea name="availabilityCalendar" rows={3} defaultValue="[]" className="mt-1 w-full rounded border px-3 py-2" /></label>
          <div className="flex gap-4 text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="availability" defaultChecked /> Available</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" name="featured" /> Featured</label>
          </div>
          <button type="submit" className="rounded bg-[var(--brand-secondary)] px-4 py-2 text-sm font-medium text-white">Save Product</button>
        </form>
          </section>

          <section className="mt-8 rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Existing Products</h2>
        <div className="mt-4 space-y-2">
          {products.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-2 text-sm">
              <div>
                <span className="font-medium">{product.name}</span> <span className="text-[var(--muted)]">({product.id})</span>
              </div>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button type="submit" className="rounded border border-red-200 px-3 py-1 text-red-700">Delete</button>
              </form>
            </div>
          ))}
        </div>
          </section>
        </>
      ) : null}

      {section === "media" ? (
        <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">Upload Product Image</h2>
          <form action={uploadProductImage} className="mt-4 grid gap-3 md:grid-cols-3">
            <label className="block text-sm">Product ID<input name="productId" required className="mt-1 w-full rounded border px-3 py-2" /></label>
            <label className="block text-sm">Image File<input type="file" name="image" accept="image/*" required className="mt-1 w-full rounded border px-3 py-2" /></label>
            <div className="flex items-end"><button type="submit" className="rounded bg-[var(--brand-secondary)] px-4 py-2 text-sm font-medium text-white">Upload & Attach</button></div>
          </form>
        </section>
      ) : null}
    </main>
  );
}
