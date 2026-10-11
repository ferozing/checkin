"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/** Mark an alert as handled, once the child has spoken to their parent. */
export async function handleAlert(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("alerts").update({ handled_at: new Date().toISOString() }).eq("id", id);
  redirect("/app/alerts");
}

/** Pause or resume the daily call. */
export async function setPaused(formData: FormData) {
  const id = String(formData.get("parent_id") ?? "");
  const paused = formData.get("paused") === "true";
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("parents").update({ paused }).eq("id", id);
  redirect("/app/parent");
}
