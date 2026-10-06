"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Step 1: who the updates go to. */
export async function saveProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  if (!name || !whatsapp) return;

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/signup");

  await supabase.from("profiles").upsert({ id: auth.user.id, name, whatsapp });
  redirect("/onboarding/parent");
}

/** Step 2: the parent Sona will call. */
export async function saveParent(formData: FormData) {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const name = get("name");
  const phone = get("phone");
  if (!name || !phone) return;

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/signup");

  const slot = get("call_slot") === "evening" ? "evening" : "morning";
  const row = {
    user_id: auth.user.id,
    name,
    call_name: get("call_name") || name,
    phone,
    language: get("language") || "Hindi",
    call_slot: slot,
    call_time: get("call_time") || (slot === "evening" ? "20:00" : "09:30"),
    medicines: get("medicines") || null,
    watch_for: get("watch_for") || null,
  };

  // One parent per family for now, so keep updating the same row.
  const { data: existing } = await supabase
    .from("parents")
    .select("id")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (existing) {
    await supabase.from("parents").update(row).eq("id", existing.id);
  } else {
    await supabase.from("parents").insert(row);
  }
  redirect("/onboarding/consent");
}

/** Step 3: the parent knows Sona is going to call. */
export async function saveConsent() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/signup");

  const { data: parent } = await supabase
    .from("parents")
    .select("id")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (parent) {
    await supabase.from("parents").update({ consent_at: new Date().toISOString() }).eq("id", parent.id);
  }
  redirect("/onboarding/updates");
}

/** Step 4: start the trial. */
export async function startTrial(trialDays: number) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/signup");

  const ends = new Date();
  ends.setDate(ends.getDate() + trialDays);
  await supabase.from("subscriptions").upsert({
    user_id: auth.user.id,
    status: "trial",
    trial_ends_at: ends.toISOString(),
  });
  redirect("/onboarding/updates?done=1");
}
