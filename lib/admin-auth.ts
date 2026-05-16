import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminEmails } from "@/lib/supabase/config";

export async function requireAdminPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const allowedEmails = getAdminEmails();
  const currentEmail = user.email?.toLowerCase() ?? "";
  const isAllowed = allowedEmails.length === 0 || allowedEmails.includes(currentEmail);
  if (!isAllowed) {
    return { user, isAllowed: false as const };
  }

  return { user, isAllowed: true as const };
}
