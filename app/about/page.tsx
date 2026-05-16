import type { Metadata } from "next";
import { getSiteContent } from "@/lib/cms";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About Us | Berswara Baby Rent",
  description: "Learn about Berswara Baby Rent and how to contact us in Bandung.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const isId = locale === "id";
  const content = await getSiteContent(locale);
  return (
    <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{isId ? "Tentang Berswara Baby Rent" : "About Berswara Rent"}</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">{content.aboutSummary}</p>
      <section className="mt-8">
        <article className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">{isId ? "Kontak" : "Contact"}</h2>
          <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <p>WhatsApp: {content.contact.whatsapp}</p>
            <p>Instagram: {content.contact.instagram}</p>
            <p>{isId ? "Lokasi" : "Location"}: {content.contact.location}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
