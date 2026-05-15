import Link from "next/link";

export function SiteFooter({
  labels,
}: {
  labels: {
    tagline: string;
    quickLinks: string;
    policies: string;
    terms: string;
    refund: string;
    location: string;
    catalog: string;
    about: string;
    contact: string;
  };
}) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Berswara Rent</h2>
          <p className="mt-2 text-sm text-slate-600">{labels.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{labels.quickLinks}</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><Link href="/catalog">{labels.catalog}</Link></li>
            <li><Link href="/about">{labels.about}</Link></li>
            <li><Link href="/contact">{labels.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{labels.policies}</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>{labels.terms}</li>
            <li>{labels.refund}</li>
            <li>{labels.location}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
