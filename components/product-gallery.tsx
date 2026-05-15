"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  name: string;
  photos: string[];
  videos: string[];
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

export function ProductGallery({ name, photos, videos }: Props) {
  const [activePhoto, setActivePhoto] = useState(photos[0]);

  return (
    <section className="space-y-4">
      <Image
        src={activePhoto}
        alt={`${name} product photo`}
        width={920}
        height={620}
        className="h-auto w-full rounded-lg border border-slate-200 bg-white"
      />
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
    </section>
  );
}
