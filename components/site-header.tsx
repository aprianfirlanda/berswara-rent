"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/how-to-rent", label: "How to Rent" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-700 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
          <Link
            href="/catalog"
            className="rounded bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
          >
            Browse Catalog
          </Link>
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
              Browse Catalog
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
