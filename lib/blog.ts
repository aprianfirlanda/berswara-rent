export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  author: string;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tips-sewa-stroller-bandung",
    title: "Tips Sewa Stroller di Bandung untuk Liburan Keluarga",
    excerpt: "Panduan memilih stroller rental yang tepat untuk perjalanan keluarga di Bandung.",
    description: "Pelajari cara memilih stroller rental yang aman, nyaman, dan sesuai itinerary keluarga Anda di Bandung.",
    publishedAt: "2026-05-01",
    author: "Berswara Rent Team",
    tags: ["stroller", "travel", "bandung"],
    content: [
      "Pilih stroller berdasarkan usia anak dan durasi pemakaian. Untuk city trip, model ringkas dengan one-hand fold biasanya lebih praktis.",
      "Periksa kondisi roda, rem, dan sabuk pengaman sebelum digunakan. Pastikan semua komponen bekerja dengan baik.",
      "Jika Anda berpindah antar lokasi wisata, prioritaskan stroller yang ringan dan mudah disimpan di bagasi.",
    ],
  },
  {
    slug: "push-walker-untuk-motorik-balita",
    title: "Memilih Push Walker untuk Latihan Motorik Balita",
    excerpt: "Faktor penting saat memilih push walker untuk fase belajar jalan.",
    description: "Ketahui poin penting dalam memilih push walker untuk mendukung perkembangan motorik balita.",
    publishedAt: "2026-05-05",
    author: "Berswara Rent Team",
    tags: ["push walker", "development"],
    content: [
      "Gunakan push walker dengan kontrol kecepatan roda agar balita tetap stabil saat belajar.",
      "Cari model dengan panel aktivitas yang bisa dilepas, sehingga produk tetap relevan saat anak mulai lebih aktif.",
      "Selalu gunakan di permukaan rata dan dampingi balita selama sesi bermain.",
    ],
  },
  {
    slug: "review-push-bike-untuk-usia-1-3-tahun",
    title: "Review Push Bike untuk Usia 1-3 Tahun",
    excerpt: "Apa yang perlu diperhatikan sebelum menyewa push bike untuk toddler.",
    description: "Review ringkas fitur penting push bike untuk toddler agar tetap aman dan nyaman.",
    publishedAt: "2026-05-08",
    author: "Berswara Rent Team",
    tags: ["push bike", "review"],
    content: [
      "Pastikan ada sabuk pengaman dan parent handle untuk kontrol saat anak belum stabil sepenuhnya.",
      "Cek apakah mode produk bisa berubah sesuai tahap pertumbuhan anak.",
      "Untuk penggunaan mingguan, fitur foldable membantu penyimpanan saat tidak dipakai.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
