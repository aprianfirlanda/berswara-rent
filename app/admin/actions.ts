"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminEmails } from "@/lib/supabase/config";
import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/cms";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const allowedEmails = getAdminEmails();
  const currentEmail = user.email?.toLowerCase() ?? "";
  if (allowedEmails.length > 0 && !allowedEmails.includes(currentEmail)) {
    throw new Error("Your account is not listed in ADMIN_EMAILS");
  }

  return { supabase, user };
}

export async function signOutAdmin() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveSiteContent(formData: FormData) {
  const { supabase } = await requireAdmin();
  const locale = (formData.get("locale") as Locale) ?? "id";

  const benefits = [1, 2, 3].map((index) => ({
    title: String(formData.get(`benefit_title_${index}`) ?? ""),
    description: String(formData.get(`benefit_description_${index}`) ?? ""),
  }));

  const testimonials = [1, 2, 3]
    .map((index) => String(formData.get(`testimonial_${index}`) ?? ""))
    .filter(Boolean);

  const faqs = [1, 2, 3].map((index) => ({
    q: String(formData.get(`faq_q_${index}`) ?? ""),
    a: String(formData.get(`faq_a_${index}`) ?? ""),
  }));

  const payload: SiteContent = {
    heroBadge: String(formData.get("heroBadge") ?? ""),
    heroTitle: String(formData.get("heroTitle") ?? ""),
    heroDescription: String(formData.get("heroDescription") ?? ""),
    aboutSummary: String(formData.get("aboutSummary") ?? ""),
    contact: {
      whatsapp: String(formData.get("contactWhatsapp") ?? ""),
      instagram: String(formData.get("contactInstagram") ?? ""),
      location: String(formData.get("contactLocation") ?? ""),
    },
    benefits,
    testimonials,
    faqs,
  };

  const { error } = await supabase.from("site_content").upsert(
    {
      key: "site",
      locale,
      value: payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key,locale" },
  );
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
  redirect(`/admin?saved=1&locale=${locale}`);
}

export async function saveProduct(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "");
  const customId = String(formData.get("id") ?? "");
  const id = customId || slugify(name, { lower: true, strict: true });
  if (!id || !name) throw new Error("Product id and name are required");

  const photos = String(formData.get("photos") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const videos = String(formData.get("videos") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const availabilityCalendarRaw = String(formData.get("availabilityCalendar") ?? "[]");
  let availabilityCalendar: Array<{ date: string; status: "available" | "booked" }> = [];
  try {
    availabilityCalendar = JSON.parse(availabilityCalendarRaw);
  } catch {
    throw new Error("availabilityCalendar must be valid JSON");
  }

  const { error } = await supabase.from("products").upsert(
    {
      id,
      name,
      category: String(formData.get("category") ?? "strollers"),
      brand: String(formData.get("brand") ?? ""),
      weekly_price: Number(formData.get("weeklyPrice") ?? 0),
      monthly_price: Number(formData.get("monthlyPrice") ?? 0),
      description: String(formData.get("description") ?? ""),
      features,
      age_range: String(formData.get("ageRange") ?? ""),
      weight_capacity: String(formData.get("weightCapacity") ?? ""),
      dimensions: String(formData.get("dimensions") ?? ""),
      availability: formData.get("availability") === "on",
      featured: formData.get("featured") === "on",
      availability_last_updated: String(formData.get("availabilityLastUpdated") ?? new Date().toISOString().slice(0, 10)),
      availability_calendar: availabilityCalendar,
      photos,
      videos,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin");
  redirect("/admin?savedProduct=1");
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product id");
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/admin");
  redirect("/admin?deleted=1");
}

export async function uploadProductImage(formData: FormData) {
  await requireAdmin();
  const productId = String(formData.get("productId") ?? "").trim();
  const file = formData.get("image") as File | null;
  if (!productId || !file) throw new Error("productId and image file are required");

  const adminClient = createSupabaseAdminClient();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${productId}/${Date.now()}.${extension}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await adminClient.storage.from("product-images").upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message);

  const { data } = adminClient.storage.from("product-images").getPublicUrl(path);

  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase.from("products").select("photos").eq("id", productId).maybeSingle();
  const nextPhotos = [...(product?.photos ?? []), data.publicUrl];
  const { error: updateError } = await supabase
    .from("products")
    .update({ photos: nextPhotos, updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (updateError) throw new Error(updateError.message);

  revalidatePath("/admin");
  revalidatePath(`/product/${productId}`);
  revalidatePath("/catalog");
  redirect(`/admin?uploaded=1&product=${productId}`);
}
