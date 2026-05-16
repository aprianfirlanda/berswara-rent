"use client";

import { useMemo, useState } from "react";

type AvailabilityItem = { date: string; status: "available" | "booked" };

type Props = {
  initialPhotos: string[];
  initialVideos: string[];
  initialAvailability: AvailabilityItem[];
};

function moveItem<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function AdminProductRichFields({ initialPhotos, initialVideos, initialAvailability }: Props) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [videos, setVideos] = useState<string[]>(initialVideos);
  const [availability, setAvailability] = useState<AvailabilityItem[]>(initialAvailability);

  const photosJson = useMemo(() => JSON.stringify(photos), [photos]);
  const videosJson = useMemo(() => JSON.stringify(videos), [videos]);
  const availabilityJson = useMemo(() => JSON.stringify(availability), [availability]);

  return (
    <div className="space-y-5">
      <input type="hidden" name="photosJson" value={photosJson} />
      <input type="hidden" name="videosJson" value={videosJson} />
      <input type="hidden" name="availabilityCalendarJson" value={availabilityJson} />

      <section className="rounded border border-[var(--brand-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Photos</h3>
          <button type="button" className="rounded border border-[var(--brand-soft)] px-3 py-1 text-xs" onClick={() => setPhotos((prev) => [...prev, ""])}>
            Add
          </button>
        </div>
        <div className="space-y-2">
          {photos.map((item, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-[1fr_auto_auto_auto]">
              <input
                value={item}
                onChange={(event) => setPhotos((prev) => prev.map((row, i) => (i === index ? event.target.value : row)))}
                className="w-full rounded border px-3 py-2 text-sm"
                placeholder="https://..."
              />
              <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setPhotos((prev) => moveItem(prev, index, index - 1))}>
                Up
              </button>
              <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setPhotos((prev) => moveItem(prev, index, index + 1))}>
                Down
              </button>
              <button type="button" className="rounded border border-red-200 px-2 py-1 text-xs text-red-700" onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded border border-[var(--brand-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Videos</h3>
          <button type="button" className="rounded border border-[var(--brand-soft)] px-3 py-1 text-xs" onClick={() => setVideos((prev) => [...prev, ""])}>
            Add
          </button>
        </div>
        <div className="space-y-2">
          {videos.map((item, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-[1fr_auto_auto_auto]">
              <input
                value={item}
                onChange={(event) => setVideos((prev) => prev.map((row, i) => (i === index ? event.target.value : row)))}
                className="w-full rounded border px-3 py-2 text-sm"
                placeholder="https://youtube.com/..."
              />
              <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setVideos((prev) => moveItem(prev, index, index - 1))}>
                Up
              </button>
              <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setVideos((prev) => moveItem(prev, index, index + 1))}>
                Down
              </button>
              <button type="button" className="rounded border border-red-200 px-2 py-1 text-xs text-red-700" onClick={() => setVideos((prev) => prev.filter((_, i) => i !== index))}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded border border-[var(--brand-soft)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Availability</h3>
          <button
            type="button"
            className="rounded border border-[var(--brand-soft)] px-3 py-1 text-xs"
            onClick={() => setAvailability((prev) => [...prev, { date: new Date().toISOString().slice(0, 10), status: "available" }])}
          >
            Add Date
          </button>
        </div>
        <div className="space-y-2">
          {availability.map((item, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-[1fr_180px_auto_auto_auto]">
              <input
                type="date"
                value={item.date}
                onChange={(event) =>
                  setAvailability((prev) =>
                    prev.map((row, i) => (i === index ? { ...row, date: event.target.value } : row)),
                  )
                }
                className="rounded border px-3 py-2 text-sm"
              />
              <select
                value={item.status}
                onChange={(event) =>
                  setAvailability((prev) =>
                    prev.map((row, i) => (i === index ? { ...row, status: event.target.value as "available" | "booked" } : row)),
                  )
                }
                className="rounded border px-3 py-2 text-sm"
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
              </select>
              <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setAvailability((prev) => moveItem(prev, index, index - 1))}>
                Up
              </button>
              <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setAvailability((prev) => moveItem(prev, index, index + 1))}>
                Down
              </button>
              <button type="button" className="rounded border border-red-200 px-2 py-1 text-xs text-red-700" onClick={() => setAvailability((prev) => prev.filter((_, i) => i !== index))}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
