import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About Us | Berswara Rent",
  description: "Learn about Berswara Rent and our hygiene-focused rental process.",
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
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">{isId ? "Cerita Kami" : "Our Story"}</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {isId
              ? "Berswara Rent dibangun untuk menyediakan opsi sewa yang praktis, aman, dan terpercaya bagi keluarga yang sedang bertumbuh."
              : "Berswara Rent was built to provide practical, safe, and trusted rental options for growing families."}
          </p>
        </article>
        <article className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">{isId ? "Proses Higienitas" : "Hygiene Process"}</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {isId
              ? "Setiap item yang kembali dibersihkan, disanitasi, diperiksa, dan dikemas sebelum siklus sewa berikutnya."
              : "Every returned item is cleaned, sanitized, inspected, and packed before the next rental cycle."}
          </p>
          <Image
            src="/images/hygiene-process.svg"
            alt="Sanitizing and cleaning process for baby gear rental"
            width={720}
            height={420}
            className="mt-4 h-auto w-full rounded border border-[var(--brand-soft)]"
          />
        </article>
      </section>
    </main>
  );
}
