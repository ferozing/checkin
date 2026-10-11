import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Which sign in methods Supabase actually has switched on.
 *
 * Asked at render time rather than hardcoded, so the Google button appears by
 * itself the day the provider is enabled, and never shows while clicking it
 * would only produce an error.
 */
export async function enabledProviders(): Promise<{ email: boolean; google: boolean }> {
  if (!isSupabaseConfigured) return { email: false, google: false };
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_ANON_KEY },
      next: { revalidate: 300 },
    });
    if (!res.ok) return { email: true, google: false };
    const data = (await res.json()) as { external?: Record<string, boolean> };
    return {
      email: data.external?.email ?? true,
      google: data.external?.google ?? false,
    };
  } catch {
    // If we cannot ask, offer the method that needs no extra setup.
    return { email: true, google: false };
  }
}
