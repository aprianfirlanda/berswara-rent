import type { Locale } from "@/lib/i18n";

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const message = isId
    ? "Halo Berswara Rent, saya ingin tanya ketersediaan produk."
    : "Hi Berswara Rent, I would like to ask about product availability.";
  const href = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[var(--brand-secondary)] px-5 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5"
      aria-label={isId ? "Chat WhatsApp" : "WhatsApp Chat"}
    >
      WhatsApp
    </a>
  );
}
