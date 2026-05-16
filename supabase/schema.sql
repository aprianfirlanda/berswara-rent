-- Run this SQL in Supabase SQL editor.

create table if not exists public.site_content (
  key text not null,
  locale text not null check (locale in ('id', 'en')),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  brand text not null default '',
  weekly_price integer not null default 0,
  monthly_price integer not null default 0,
  description text not null default '',
  features text[] not null default '{}',
  age_range text not null default '',
  weight_capacity text not null default '',
  dimensions text not null default '',
  availability boolean not null default true,
  featured boolean not null default false,
  availability_last_updated date not null default current_date,
  availability_calendar jsonb not null default '[]'::jsonb,
  photos text[] not null default '{}',
  videos text[] not null default '{}',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.products drop constraint if exists products_category_check;

alter table public.site_content enable row level security;
alter table public.products enable row level security;

drop policy if exists "public read site_content" on public.site_content;
create policy "public read site_content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "public read products" on public.products;
create policy "public read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

drop policy if exists "authenticated manage site_content" on public.site_content;
create policy "authenticated manage site_content"
  on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated manage products" on public.products;
create policy "authenticated manage products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

insert into public.site_content (key, locale, value)
values
  (
    'site',
    'id',
    '{
      "heroBadge":"Aman • Bersih • Siap Pakai",
      "heroImage":"/images/hero-baby-stroller.svg",
      "logoImage":"/favicon.ico",
      "faviconImage":"/favicon.ico",
      "heroTitle":"Sewa Perlengkapan Bayi Premium di Bandung",
      "heroDescription":"Pilihan sewa stroller, push walker, dan push bike yang aman, bersih, dan praktis.",
      "aboutSummary":"Kami membantu keluarga di Bandung mengakses perlengkapan bayi premium tanpa biaya kepemilikan dan beban penyimpanan yang tinggi.",
      "contact":{"whatsapp":"+62 812-3456-7890","instagram":"@berswararent","location":"Bandung, Jawa Barat"},
      "benefits":[
        {"title":"Higienitas Utama","description":"Semua item disanitasi sebelum dan sesudah setiap penyewaan."},
        {"title":"Brand Premium","description":"Perlengkapan terpercaya untuk kenyamanan, keamanan, dan keandalan."},
        {"title":"Sewa Fleksibel","description":"Paket mingguan dan bulanan untuk kebutuhan jangka pendek maupun panjang."}
      ],
      "testimonials":[
        "Stroller bersih dan anak nyaman selama liburan.",
        "Proses sewa cepat, admin ramah, dan sangat membantu.",
        "Push walker bagus, kondisi mulus, pengiriman tepat waktu."
      ],
      "faqs":[
        {"q":"Apakah ada deposit?","a":"Ya, beberapa produk memerlukan deposit yang akan dikembalikan setelah item dicek saat pengembalian."},
        {"q":"Bagaimana jika telat mengembalikan?","a":"Kami bantu perpanjangan selama stok tersedia. Biaya tambahan dihitung per hari."},
        {"q":"Apakah produk selalu disanitasi?","a":"Semua produk dibersihkan dan disanitasi sebelum dikirim ke pelanggan berikutnya."}
      ]
    }'::jsonb
  ),
  (
    'site',
    'en',
    '{
      "heroBadge":"Safe • Clean • Ready to Use",
      "heroImage":"/images/hero-baby-stroller.svg",
      "logoImage":"/favicon.ico",
      "faviconImage":"/favicon.ico",
      "heroTitle":"Cute Premium Baby Gear Rental in Bandung",
      "heroDescription":"Safe, clean, and practical rental options for strollers, push walkers, and push bikes.",
      "aboutSummary":"We help families in Bandung access premium baby gear without high ownership cost or storage burden.",
      "contact":{"whatsapp":"+62 812-3456-7890","instagram":"@berswararent","location":"Bandung, West Java"},
      "benefits":[
        {"title":"Hygiene First","description":"All items are sanitized before and after each rental."},
        {"title":"Premium Brands","description":"Trusted gear selected for comfort, safety, and reliability."},
        {"title":"Flexible Rental","description":"Weekly and monthly plans for short visits or longer use."}
      ],
      "testimonials":[
        "The stroller was clean and my child felt comfortable.",
        "Rental process was quick, and the team was very helpful.",
        "Great push walker, excellent condition, on-time delivery."
      ],
      "faqs":[
        {"q":"Is a deposit required?","a":"Yes, some products require a deposit that is returned after post-rental inspection."},
        {"q":"What if I return late?","a":"We can extend your rental if stock is available. Extra fees are calculated per day."},
        {"q":"Are products sanitized?","a":"Every item is cleaned and sanitized before it is delivered to the next customer."}
      ]
    }'::jsonb
  )
on conflict (key, locale) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public read product-images" on storage.objects;
create policy "public read product-images"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

drop policy if exists "authenticated write product-images" on storage.objects;
create policy "authenticated write product-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "public read site-assets" on storage.objects;
create policy "public read site-assets"
  on storage.objects for select
  to public
  using (bucket_id = 'site-assets');

drop policy if exists "authenticated write site-assets" on storage.objects;
create policy "authenticated write site-assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-assets');
