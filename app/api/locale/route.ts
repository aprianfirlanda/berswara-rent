import { NextResponse } from "next/server";
import { getLocaleCookieName, Locale } from "@/lib/i18n";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { locale?: Locale } | null;
  const locale = payload?.locale === "en" ? "en" : "id";

  const response = NextResponse.json({ ok: true, locale });
  response.cookies.set(getLocaleCookieName(), locale, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
