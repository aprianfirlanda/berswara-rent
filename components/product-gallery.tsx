"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  name: string;
  photos: string[];
  videos: string[];
  locale: Locale;
};

function youtubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }
  } catch {
    return url;
  }
  return url;
}

export function ProductGallery({ name, photos, videos, locale }: Props) {
  const isId = locale === "id";
  const [activePhoto, setActivePhoto] = useState(photos[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        className="group block w-full overflow-hidden rounded-lg border border-slate-200 bg-white"
      >
        <Image
          src={activePhoto}
          alt={`${name} product photo`}
          width={920}
          height={620}
          className="h-auto w-full transition-transform duration-200 group-hover:scale-110"
        />
      </button>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo) => (
          <button key={photo} type="button" onClick={() => setActivePhoto(photo)} className="overflow-hidden rounded border border-slate-200">
            <Image src={photo} alt={`${name} thumbnail`} width={280} height={200} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {videos.map((video) => (
          <iframe
            key={video}
            className="aspect-video w-full rounded-lg border border-slate-200"
            src={youtubeEmbedUrl(video)}
            title={`${name} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ))}
      </div>
      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-label={`${name} image lightbox`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded bg-white px-3 py-1 text-sm"
            onClick={() => setIsLightboxOpen(false)}
          >
            {isId ? "Tutup" : "Close"}
          </button>
          <Image
            src={activePhoto}
            alt={`${name} enlarged photo`}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto rounded"
          />
        </div>
      ) : null}
    </section>
  );
}
