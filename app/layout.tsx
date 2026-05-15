import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { dictionaries, getLocale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://berswara-rent.example"),
  title: "Berswara Rent | Premium Baby Equipment Rental Bandung",
  description:
    "Rent premium and clean baby gear from Berswara Rent in Bandung, Jawa Barat.",
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = dictionaries[locale];
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <SiteHeader locale={locale} labels={dict.header} />
        {children}
        <SiteFooter
          labels={{
            ...dict.footer,
            catalog: dict.header.catalog,
            about: dict.header.about,
            contact: dict.header.contact,
          }}
        />
      </body>
    </html>
  );
}
