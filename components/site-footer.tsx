import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Berswara Rent</h2>
          <p className="mt-2 text-sm text-slate-600">
            Premium baby gear rental in Bandung, Jawa Barat.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><Link href="/catalog">Catalog</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Policies</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>Terms of Service</li>
            <li>Refund &amp; Damage Policy</li>
            <li>Bandung, Jawa Barat</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
