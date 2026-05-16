"use client";

import { useMemo, useState } from "react";

type Benefit = { title: string; description: string };
type Faq = { q: string; a: string };

type Props = {
  initialBenefits: Benefit[];
  initialTestimonials: string[];
  initialFaqs: Faq[];
};

export function AdminContentArraysEditor({ initialBenefits, initialTestimonials, initialFaqs }: Props) {
  const [benefits, setBenefits] = useState<Benefit[]>(initialBenefits);
  const [testimonials, setTestimonials] = useState<string[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);

  const benefitsJson = useMemo(() => JSON.stringify(benefits), [benefits]);
  const testimonialsText = useMemo(() => testimonials.join("\n"), [testimonials]);
  const faqsJson = useMemo(() => JSON.stringify(faqs), [faqs]);

  return (
    <div className="space-y-6">
      <input type="hidden" name="benefitsJson" value={benefitsJson} />
      <input type="hidden" name="testimonialsText" value={testimonialsText} />
      <input type="hidden" name="faqsJson" value={faqsJson} />

      <section className="rounded border border-[var(--brand-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Benefits</h3>
          <button
            type="button"
            className="rounded border border-[var(--brand-soft)] px-3 py-1 text-xs"
            onClick={() => setBenefits((prev) => [...prev, { title: "", description: "" }])}
          >
            Add Benefit
          </button>
        </div>
        <div className="space-y-3">
          {benefits.map((item, index) => (
            <div key={index} className="rounded border border-[var(--brand-soft)] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">Benefit #{index + 1}</p>
                <button
                  type="button"
                  className="rounded border border-red-200 px-2 py-1 text-xs text-red-700"
                  onClick={() => setBenefits((prev) => prev.filter((_, i) => i !== index))}
                >
                  Delete
                </button>
              </div>
              <label className="block text-xs">
                Title
                <input
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  value={item.title}
                  onChange={(event) =>
                    setBenefits((prev) => prev.map((row, i) => (i === index ? { ...row, title: event.target.value } : row)))
                  }
                />
              </label>
              <label className="mt-2 block text-xs">
                Description
                <textarea
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  rows={2}
                  value={item.description}
                  onChange={(event) =>
                    setBenefits((prev) => prev.map((row, i) => (i === index ? { ...row, description: event.target.value } : row)))
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded border border-[var(--brand-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Testimonials</h3>
          <button
            type="button"
            className="rounded border border-[var(--brand-soft)] px-3 py-1 text-xs"
            onClick={() => setTestimonials((prev) => [...prev, ""])}
          >
            Add Testimonial
          </button>
        </div>
        <div className="space-y-3">
          {testimonials.map((item, index) => (
            <div key={index} className="rounded border border-[var(--brand-soft)] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">Testimonial #{index + 1}</p>
                <button
                  type="button"
                  className="rounded border border-red-200 px-2 py-1 text-xs text-red-700"
                  onClick={() => setTestimonials((prev) => prev.filter((_, i) => i !== index))}
                >
                  Delete
                </button>
              </div>
              <label className="block text-xs">
                Text
                <textarea
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  rows={2}
                  value={item}
                  onChange={(event) =>
                    setTestimonials((prev) => prev.map((row, i) => (i === index ? event.target.value : row)))
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded border border-[var(--brand-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">FAQs</h3>
          <button
            type="button"
            className="rounded border border-[var(--brand-soft)] px-3 py-1 text-xs"
            onClick={() => setFaqs((prev) => [...prev, { q: "", a: "" }])}
          >
            Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div key={index} className="rounded border border-[var(--brand-soft)] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">FAQ #{index + 1}</p>
                <button
                  type="button"
                  className="rounded border border-red-200 px-2 py-1 text-xs text-red-700"
                  onClick={() => setFaqs((prev) => prev.filter((_, i) => i !== index))}
                >
                  Delete
                </button>
              </div>
              <label className="block text-xs">
                Question
                <input
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  value={item.q}
                  onChange={(event) =>
                    setFaqs((prev) => prev.map((row, i) => (i === index ? { ...row, q: event.target.value } : row)))
                  }
                />
              </label>
              <label className="mt-2 block text-xs">
                Answer
                <textarea
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  rows={2}
                  value={item.a}
                  onChange={(event) =>
                    setFaqs((prev) => prev.map((row, i) => (i === index ? { ...row, a: event.target.value } : row)))
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
