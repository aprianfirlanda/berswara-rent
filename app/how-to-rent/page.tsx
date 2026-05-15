import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Rent | Berswara Rent",
  description: "Simple steps to rent baby gear from Berswara Rent in Bandung.",
  alternates: { canonical: "/how-to-rent" },
};

const steps = [
  "Choose your gear from the catalog.",
  "Check availability via WhatsApp.",
  "Confirm booking, deposit, and payment.",
  "Schedule delivery or pick-up in Bandung.",
];

export default function HowToRentPage() {
  return (
    <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">How to Rent</h1>
      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="rounded border border-slate-200 bg-white p-4 text-sm">
            <span className="font-semibold">Step {index + 1}:</span> {step}
          </li>
        ))}
      </ol>
    </main>
  );
}
