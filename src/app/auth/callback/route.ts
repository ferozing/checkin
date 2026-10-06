import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/** Where Google and the email login link come back to. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/onboarding/you";

  if (!isSupabaseConfigured || !code) {
    return NextResponse.redirect(`${origin}/signup?error=auth`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("auth callback failed", error.message);
    return NextResponse.redirect(`${origin}/signup?error=auth`);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
