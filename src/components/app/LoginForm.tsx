"use client";

import { useState, type FormEvent } from "react";
import { field, labelText, primary } from "@/components/app/form";
import { createClient } from "@/lib/supabase/client";

const googleBtn =
  "flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-ink bg-white text-[16px] font-semibold text-ink disabled:opacity-70";

/** Google and an email sign in link, as in the design. */
export function LoginForm({ code }: { code: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState("");

  // Carry the invite code through the round trip so step 1 can prefill it.
  const redirectTo = () => {
    const url = new URL("/auth/callback", window.location.origin);
    url.searchParams.set("next", code ? `/onboarding/you?code=${encodeURIComponent(code)}` : "/onboarding/you");
    return url.toString();
  };

  const withGoogle = async () => {
    setError("");
    setBusy("google");
    try {
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectTo() },
      });
      if (error) throw error;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start Google sign in.");
      setBusy(null);
    }
  };

  const withEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setBusy("email");
    try {
      const { error } = await createClient().auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo() },
      });
      if (error) throw error;
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send the sign in link.");
    } finally {
      setBusy(null);
    }
  };

  if (sent) {
    return (
      <div className="rounded-[14px] bg-good-bg px-5 py-4 text-good">
        <p className="font-semibold">Check your email.</p>
        <p className="mt-1 text-body">
          We sent a sign in link to {email.trim()}. Open it on this device.
        </p>
      </div>
    );
  }

  return (
    <>
      <button type="button" onClick={withGoogle} disabled={busy !== null} className={googleBtn}>
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.8-1.5 4.6-4.4 6.4l6.7 5.2C42.2 35.1 45 30 45 24z" />
          <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.8 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
          <path fill="#FBBC05" d="M11.5 28.5c-.5-1.4-.7-2.9-.7-4.5s.3-3.1.7-4.5l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 10z" />
          <path fill="#EA4335" d="M24 10.6c3.3 0 5.5 1.4 6.8 2.6l6-5.8C33.1 4 29 2 24 2 15.4 2 8.1 6.9 4.4 14l7.1 5.5c1.8-5.3 6.7-8.9 12.5-8.9z" />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-[13px] text-[#9A9086]">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={withEmail} noValidate className="flex flex-col gap-2">
        <label htmlFor="email" className={labelText}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className={field}
        />
        <button type="submit" disabled={busy !== null} className={`${primary} mt-1 w-full`}>
          {busy === "email" ? "Sending…" : "Email me a sign in link"}
        </button>
      </form>

      {error ? <p role="alert" className="text-[15px] font-semibold text-red">{error}</p> : null}
    </>
  );
}
