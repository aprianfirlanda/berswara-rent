import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About Us | Berswara Rent",
  description: "Learn about Berswara Rent and how to contact us in Bandung.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const isId = locale === "id";
  return (
    <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{isId ? "Tentang Berswara Rent" : "About Berswara Rent"}</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        {isId
          ? "Kami membantu keluarga di Bandung mengakses perlengkapan bayi premium tanpa biaya kepemilikan dan beban penyimpanan yang tinggi."
          : "We help families in Bandung access premium baby gear without high ownership cost or storage burden."}
      </p>
      <section className="mt-8">
        <article className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">{isId ? "Kontak" : "Contact"}</h2>
          <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <p>WhatsApp: +62 812-3456-7890</p>
            <p>Instagram: @berswararent</p>
            <p>{isId ? "Lokasi" : "Location"}: Bandung, Jawa Barat</p>
          </div>
        </article>
      </section>
    </main>
  );
}
