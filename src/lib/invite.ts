"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Checks an invite code on the server.
 *
 * The codes used to ship inside the browser bundle, where anyone could read
 * them. They now live in the invite_codes table, which has no read policy, so
 * the only way to test one is this action calling a security definer function.
 * Nothing about the code list reaches the client.
 */
export async function checkInviteCode(raw: string): Promise<boolean> {
  const code = raw.trim();
  if (!code) return false;

  if (!isSupabaseConfigured) {
    // Before the Supabase project exists, fall back to the launch codes so the
    // invite flow still works. Remove FALLBACK_INVITE_CODES once it is set up.
    const { FALLBACK_INVITE_CODES } = await import("@/config");
    return FALLBACK_INVITE_CODES.map((c) => c.toUpperCase()).includes(code.toUpperCase());
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("invite_code_is_valid", { p_code: code });
  if (error) {
    console.error("invite_code_is_valid failed", error.message);
    return false;
  }
  return data === true;
}
