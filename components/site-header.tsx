"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

export function SiteHeader({
  locale,
  labels,
}: {
  locale: Locale;
  labels: {
    home: string;
    catalog: string;
    howToRent: string;
    about: string;
    blog: string;
    contact: string;
    browseCatalog: string;
    language: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "/", label: labels.home },
    { href: "/catalog", label: labels.catalog },
    { href: "/how-to-rent", label: labels.howToRent },
    { href: "/about", label: labels.about },
    { href: "/blog", label: labels.blog },
    { href: "/contact", label: labels.contact },
  ];

  async function onLocaleChange(nextLocale: Locale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Berswara Rent
        </Link>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="rounded border border-slate-300 px-3 py-1 text-sm md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-700 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
          <Link
            href="/catalog"
            className="rounded bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
          >
            {labels.browseCatalog}
          </Link>
          <label className="text-sm text-slate-700">
            {labels.language}
            <select
              className="ml-2 rounded border border-slate-300 bg-white px-2 py-1"
              value={locale}
              onChange={(event) => void onLocaleChange(event.target.value as Locale)}
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
            </select>
          </label>
        </nav>
      </div>
      {open ? (
        <nav className="border-t border-slate-200 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-700" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/catalog"
              className="rounded bg-sky-700 px-3 py-2 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              {labels.browseCatalog}
            </Link>
            <label className="text-sm text-slate-700">
              {labels.language}
              <select
                className="ml-2 rounded border border-slate-300 bg-white px-2 py-1"
                value={locale}
                onChange={(event) => void onLocaleChange(event.target.value as Locale)}
              >
                <option value="id">ID</option>
                <option value="en">EN</option>
              </select>
            </label>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
