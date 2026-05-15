import { formatDate, Product } from "@/lib/products";

type Props = {
  product: Product;
};

function buildDates(startDate: Date, totalDays: number): string[] {
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

export function AvailabilityCalendar({ product }: Props) {
  const today = new Date();
  const monthDates = buildDates(today, 28);
  const bookedDates = new Set(
    product.availabilityCalendar.filter((entry) => entry.status === "booked").map((entry) => entry.date),
  );

  return (
    <section className="rounded border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Availability Calendar (Read-only)</h3>
        <p className="text-xs text-slate-500">Updated: {formatDate(product.availabilityLastUpdated)}</p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {monthDates.map((date) => {
          const booked = bookedDates.has(date);
          return (
            <div
              key={date}
              className={`rounded border px-2 py-2 text-center text-xs ${
                booked ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {formatDate(date)}
              <div className="mt-1">{booked ? "Booked" : "Available"}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
