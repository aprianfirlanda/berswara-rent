import { formatDate, Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

type Props = {
  product: Product;
  locale: Locale;
};

function buildDates(startDate: Date, totalDays: number): string[] {
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

export function AvailabilityCalendar({ product, locale }: Props) {
  const isId = locale === "id";
  const today = new Date();
  const monthDates = buildDates(today, 28);
  const bookedDates = new Set(
    product.availabilityCalendar.filter((entry) => entry.status === "booked").map((entry) => entry.date),
  );

  return (
    <section className="rounded border border-[var(--brand-soft)] bg-[var(--surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--brand-secondary)]">{isId ? "Kalender Ketersediaan (Read-only)" : "Availability Calendar (Read-only)"}</h3>
        <p className="text-xs text-[var(--muted)]">{isId ? "Diperbarui" : "Updated"}: {formatDate(product.availabilityLastUpdated)}</p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {monthDates.map((date) => {
          const booked = bookedDates.has(date);
          return (
            <div
              key={date}
              className={`rounded border px-2 py-2 text-center text-xs ${
                booked
                  ? "border-[var(--brand-primary)]/30 bg-[var(--brand-soft)]/45 text-[var(--brand-primary)]"
                  : "border-[var(--brand-secondary)]/30 bg-[var(--brand-accent)]/35 text-[var(--brand-secondary)]"
              }`}
            >
              {formatDate(date)}
              <div className="mt-1">{booked ? (isId ? "Terpesan" : "Booked") : isId ? "Tersedia" : "Available"}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
