import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Berswara Rent",
  description: "Contact Berswara Rent via WhatsApp for booking inquiries in Bandung.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <div className="mt-6 space-y-3 rounded border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <p>WhatsApp: +62 812-3456-7890</p>
        <p>Instagram: @berswararent</p>
        <p>Location: Bandung, Jawa Barat</p>
      </div>
    </main>
  );
}
