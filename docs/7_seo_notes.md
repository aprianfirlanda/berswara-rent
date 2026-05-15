# SEO Notes: Berswara Rent

## 1. Keyword Strategy
- **Primary Keywords:** Baby rent Bandung, Sewa perlengkapan bayi Bandung, Baby equipment rental Bandung, Sewa stroller Bandung, Sewa push bike Bandung.
- **Secondary Keywords:** Premium baby gear rental Jawa Barat, Sewa mainan anak Bandung, Affordable baby rent Bandung, Jasa sewa stroller terdekat.

## 2. On-Page SEO
- **Title Tags:** 
    - Home: `Berswara Rent | Premium Baby Equipment Rental Bandung`
    - Product: `Rent [Product Name] in Bandung - [Category] | Berswara Rent`
- **Meta Descriptions:** 
    - Home: `Rent premium and clean baby gear from Berswara Rent in Bandung, Jawa Barat. We offer strollers, push walkers, and bikes at affordable rates.`
    - Product: `Rent [Product Name] in Bandung for only [Price]/week. Safe, sanitized, and ready for your little one. Inquire now!`
- **Alt Text:** Every product image must have descriptive alt text (e.g., `alt="Blue Bugaboo Butterfly Stroller Front View"`).
- **Video Schema:** Include `VideoObject` structured data for pages with YouTube/external videos to enhance search results.
- **Headings:** Use H1 for Page Titles, H2 for Sections, H3 for Product Names in grids.

## 3. Technical SEO (Next.js focus)
- **Metadata API:** Utilize `generateMetadata` in `app/product/[id]/page.tsx`.
- **Sitemap:** Use `next-sitemap` or generate `sitemap.xml` to index all products.
- **Canonical Tags:** Ensure canonical tags point to the primary URL to avoid duplicate content.
- **Structured Data (JSON-LD):** 
    - Use `Product` schema for detail pages.
    - Use `LocalBusiness` schema for the home page (include address: Bandung, Jawa Barat).
    - Use `Organization` schema for brand identity.

## 4. Performance
- **Image Optimization:** Use `next/image` for WebP conversion and lazy loading.
- **Static Generation:** Pre-render all product pages (SSG) for fast TTFB.
