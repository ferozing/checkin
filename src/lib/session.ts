import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient, getUser } from "@/lib/supabase/server";

/** Everything past login needs a signed in user. */
export async function requireUser() {
  if (!isSupabaseConfigured) redirect("/login");
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}

export async function getProfile() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("name, whatsapp, whatsapp_opt_in")
    .eq("id", auth.user.id)
    .maybeSingle();
  return data;
}

export type Parent = {
  id: string;
  name: string;
  call_name: string | null;
  phone: string;
  language: string;
  city: string | null;
  call_slot: "morning" | "evening";
  call_time: string;
  medicines: { name: string; when: string }[] | null;
  watch_for: string[] | null;
  topics: string | null;
  first_call_at: string | null;
  paused: boolean;
  consent_status: "pending" | "given" | "declined";
  recording_consent: boolean;
};

export async function getParent(): Promise<Parent | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase
    .from("parents")
    .select("id, name, call_name, phone, language, city, call_slot, call_time, medicines, watch_for, topics, first_call_at, paused, consent_status, recording_consent")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return (data as Parent | null) ?? null;
}
