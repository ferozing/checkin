"use server";

import { redirect } from "next/navigation";
import { TRIAL_DAYS } from "@/config";
import { createClient } from "@/lib/supabase/server";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

async function me() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return { supabase, user: data.user };
}

/** The one parent this family is setting up. */
async function myParent() {
  const { supabase, user } = await me();
  const { data } = await supabase
    .from("parents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return { supabase, user, parent: data };
}

/** Step 1: who the notes go to, and the invite code. */
export async function saveProfile(formData: FormData) {
  const name = str(formData, "name");
  const whatsapp = str(formData, "whatsapp");
  const code = str(formData, "code").toUpperCase();
  if (!name || !whatsapp || !code) return;

  const { supabase, user } = await me();

  const { data: valid } = await supabase.rpc("invite_code_is_valid", { p_code: code });
  if (valid !== true) redirect(`/onboarding/you?code=${encodeURIComponent(code)}&bad=1`);

  await supabase.from("profiles").upsert({
    id: user.id,
    name,
    whatsapp,
    whatsapp_opt_in: formData.get("opt_in") === "on",
  });
  // Spend the code only once the profile is saved.
  await supabase.rpc("redeem_invite_code", { p_code: code });
  redirect("/onboarding/parent");
}

/** Step 2: who Sona calls. */
export async function saveParent(formData: FormData) {
  const name = str(formData, "name");
  const phone = str(formData, "phone");
  if (!name || !phone) return;

  const { supabase, user, parent } = await myParent();
  const row = {
    user_id: user.id,
    name,
    call_name: str(formData, "call_name") || name,
    phone,
    language: str(formData, "language") || "Telugu",
    city: str(formData, "city") || null,
  };

  if (parent) await supabase.from("parents").update(row).eq("id", parent.id);
  else await supabase.from("parents").insert(row);
  redirect("/onboarding/call");
}

/** Step 3: when to call, what to ask about. */
export async function saveCall(formData: FormData) {
  const { supabase, parent } = await myParent();
  if (!parent) redirect("/onboarding/parent");

  const slot = str(formData, "call_slot") === "evening" ? "evening" : "morning";
  const medicines = formData
    .getAll("medicine")
    .map((m) => String(m).trim())
    .filter(Boolean)
    .map((line) => {
      const [medName, ...rest] = line.split("|");
      return { name: medName.trim(), when: rest.join("|").trim() };
    });

  await supabase
    .from("parents")
    .update({
      call_slot: slot,
      call_time: str(formData, "call_time") || (slot === "evening" ? "18:00" : "09:00"),
      medicines,
      watch_for: formData.getAll("watch_for").map(String),
      topics: str(formData, "topics") || null,
    })
    .eq("id", parent.id);
  redirect("/onboarding/tell");
}

/**
 * Step 4: book the first call and start the trial. Consent stays `pending`:
 * only the parent can give it, on the call itself.
 */
export async function finishOnboarding(formData: FormData) {
  const { supabase, user, parent } = await myParent();
  if (!parent) redirect("/onboarding/parent");

  const when = str(formData, "first_call");
  const at = new Date();
  if (when === "today") {
    at.setHours(at.getHours() + 1);
  } else {
    const [h, m] = (parent.call_time ?? "09:00").split(":").map(Number);
    at.setDate(at.getDate() + 1);
    at.setHours(h, m, 0, 0);
  }

  await supabase.from("parents").update({ first_call_at: at.toISOString() }).eq("id", parent.id);

  const trialEnds = new Date();
  trialEnds.setDate(trialEnds.getDate() + TRIAL_DAYS);
  await supabase.from("subscriptions").upsert(
    {
      user_id: user.id,
      parent_id: parent.id,
      status: "trial",
      trial_ends_at: trialEnds.toISOString(),
    },
    { onConflict: "parent_id" },
  );

  redirect("/first");
}
