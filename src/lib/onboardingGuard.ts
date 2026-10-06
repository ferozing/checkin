import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient, getUser } from "@/lib/supabase/server";

/** Onboarding needs a signed in user. Sends people back to sign up otherwise. */
export async function requireUser() {
  if (!isSupabaseConfigured) redirect("/signup");
  const user = await getUser();
  if (!user) redirect("/signup");
  return user;
}

export async function getProfile() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase.from("profiles").select("name, whatsapp").eq("id", auth.user.id).maybeSingle();
  return data;
}

export async function getParent() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase
    .from("parents")
    .select("id, name, call_name, phone, language, call_slot, call_time, medicines, watch_for, consent_at")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data;
}
