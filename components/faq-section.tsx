"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const faqId = [
  {
    q: "Apakah ada deposit?",
    a: "Ya, beberapa produk memerlukan deposit yang akan dikembalikan setelah item dicek saat pengembalian.",
  },
  {
    q: "Bagaimana jika telat mengembalikan?",
    a: "Kami bantu perpanjangan selama stok tersedia. Biaya tambahan dihitung per hari.",
  },
  {
    q: "Apakah produk selalu disanitasi?",
    a: "Semua produk dibersihkan dan disanitasi sebelum dikirim ke pelanggan berikutnya.",
  },
];

const faqEn = [
  {
    q: "Is a deposit required?",
    a: "Yes, some products require a deposit that is returned after post-rental inspection.",
  },
  {
    q: "What if I return late?",
    a: "We can extend your rental if stock is available. Extra fees are calculated per day.",
  },
  {
    q: "Are products sanitized?",
    a: "Every item is cleaned and sanitized before it is delivered to the next customer.",
  },
];

export function FaqSection({ locale }: { locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isId = locale === "id";
  const faqs = isId ? faqId : faqEn;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-[var(--brand-primary)]">{isId ? "FAQ" : "FAQ"}</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <article key={faq.q} className="rounded-3xl border border-[var(--brand-soft)] bg-[var(--surface)] p-5 shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
              >
                <span className="text-lg font-semibold text-[var(--brand-primary)]">{faq.q}</span>
                <span className="text-xl text-[var(--brand-secondary)]">{open ? "−" : "+"}</span>
              </button>
              {open ? <p className="mt-3 text-sm text-[var(--muted)]">{faq.a}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
