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
  };
}) {
  return (
    <footer className="mt-16 px-4 pb-6">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-[var(--brand-soft)] bg-[var(--brand-accent)]/55 px-6 py-10 shadow-sm md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-[var(--brand-secondary)]">Berswara Rent</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{labels.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--brand-secondary)]">{labels.quickLinks}</h2>
          <ul className="mt-2 space-y-2 text-sm text-[var(--muted)]">
            <li><Link href="/catalog">{labels.catalog}</Link></li>
            <li><Link href="/about">{labels.about}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--brand-secondary)]">{labels.policies}</h2>
          <ul className="mt-2 space-y-2 text-sm text-[var(--muted)]">
            <li>{labels.terms}</li>
            <li>{labels.refund}</li>
            <li>{labels.location}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
