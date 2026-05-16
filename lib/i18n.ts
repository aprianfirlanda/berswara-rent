import { cookies } from "next/headers";

export type Locale = "id" | "en";

const LOCALE_COOKIE = "berswara_locale";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  if (value === "en") return "en";
  return "id";
}

export function getLocaleCookieName() {
  return LOCALE_COOKIE;
}

type Dict = {
  header: {
    home: string;
    catalog: string;
    howToRent: string;
    about: string;
    account: string;
    language: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    policies: string;
    terms: string;
    refund: string;
    location: string;
  };
  common: {
    close: string;
    available: string;
    booked: string;
    updated: string;
  };
};

export const dictionaries: Record<Locale, Dict> = {
  id: {
    header: {
      home: "Beranda",
      catalog: "Katalog",
      howToRent: "Cara Sewa",
      about: "Tentang Kami",
      account: "Akun",
      language: "Bahasa",
    },
    footer: {
      tagline: "Sewa perlengkapan bayi premium di Bandung, Jawa Barat.",
      quickLinks: "Tautan Cepat",
      policies: "Kebijakan",
      terms: "Syarat & Ketentuan",
      refund: "Kebijakan Refund & Kerusakan",
      location: "Bandung, Jawa Barat",
    },
    common: {
      close: "Tutup",
      available: "Tersedia",
      booked: "Terpesan",
      updated: "Diperbarui",
    },
  },
  en: {
    header: {
      home: "Home",
      catalog: "Catalog",
      howToRent: "How to Rent",
      about: "About Us",
      account: "Account",
      language: "Language",
    },
    footer: {
      tagline: "Premium baby gear rental in Bandung, West Java.",
      quickLinks: "Quick Links",
      policies: "Policies",
      terms: "Terms of Service",
      refund: "Refund & Damage Policy",
      location: "Bandung, West Java",
    },
    common: {
      close: "Close",
      available: "Available",
      booked: "Booked",
      updated: "Updated",
    },
  },
};
