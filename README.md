## Berswara Rent

Next.js 16 website for baby gear rental with Supabase-backed CMS.

## Setup

1. Copy env:

```bash
cp .env.example .env
```

2. Fill Supabase values in `.env`.

3. In Supabase SQL editor, run:

`supabase/schema.sql`

4. Create at least one Auth user (Email/Password) from Supabase Auth dashboard.

5. Ensure that user email is included in `ADMIN_EMAILS`.

## Run

```bash
npm install
npm run dev
```

Open:

- Site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Admin CMS: `http://localhost:3000/admin`

## What is dynamic now

- Home content (`hero`, benefits, testimonials, FAQ)
- About content + contact block
- Product catalog, category pages, product detail pages
- Product images from Supabase Storage (`product-images` bucket)

All of these are editable from the admin page.
