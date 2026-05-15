import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Berswara Rent",
  description: "Learn about Berswara Rent and our hygiene-focused rental process.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">About Berswara Rent</h1>
      <p className="mt-4 text-sm text-slate-700">
        We help families in Bandung access premium baby gear without high ownership cost or storage burden.
      </p>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Our Story</h2>
          <p className="mt-3 text-sm text-slate-700">
            Berswara Rent was built to provide practical, safe, and trusted rental options for growing families.
          </p>
        </article>
        <article className="rounded border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Hygiene Process</h2>
          <p className="mt-3 text-sm text-slate-700">
            Every returned item is cleaned, sanitized, inspected, and packed before the next rental cycle.
          </p>
          <Image
            src="/images/hygiene-process.svg"
            alt="Sanitizing and cleaning process for baby gear rental"
            width={720}
            height={420}
            className="mt-4 h-auto w-full rounded border border-slate-200"
          />
        </article>
      </section>
    </main>
  );
}
