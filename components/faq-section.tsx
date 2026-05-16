"use client";

import { useState } from "react";
export function FaqSection({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-[var(--brand-primary)]">FAQ</h2>
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
