"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const button =
  "flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-3 rounded-full text-[17px] font-semibold transition-colors disabled:opacity-60";

export function SignUpForm({ code }: { code: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState("");

  // Carry the invite code through the round trip, so onboarding knows they were invited.
  const redirectTo = () => {
    const url = new URL("/auth/callback", window.location.origin);
    const next = code ? `/onboarding/you?code=${encodeURIComponent(code)}` : "/onboarding/you";
    url.searchParams.set("next", next);
    return url.toString();
  };

  const withGoogle = async () => {
    setError("");
    setBusy("google");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
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
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo() },
      });
      if (error) throw error;
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send the login link.");
    } finally {
      setBusy(null);
    }
  };

  if (sent) {
    return (
      <div className="mt-8 rounded-[18px] bg-good-bg px-6 py-5 text-good">
        <p className="font-semibold">Check your email.</p>
        <p className="mt-1 text-ink-2">
          We sent a login link to {email.trim()}. Open it on this device and you&apos;ll be signed in.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      <button type="button" onClick={withGoogle} disabled={busy !== null} className={`${button} border-[1.5px] border-line-strong bg-card text-ink hover:bg-sand`}>
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.8-1.5 4.6-4.4 6.4l6.7 5.2C42.2 35.1 45 30 45 24z" />
          <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.8 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
          <path fill="#FBBC05" d="M11.5 28.5c-.5-1.4-.7-2.9-.7-4.5s.3-3.1.7-4.5l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 10z" />
          <path fill="#EA4335" d="M24 10.6c3.3 0 5.5 1.4 6.8 2.6l6-5.8C33.1 4 29 2 24 2 15.4 2 8.1 6.9 4.4 14l7.1 5.5c1.8-5.3 6.7-8.9 12.5-8.9z" />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-[14px] text-muted before:h-px before:flex-1 before:bg-line-strong after:h-px after:flex-1 after:bg-line-strong">
        or
      </div>

      <form onSubmit={withEmail} noValidate className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[15px] font-semibold">Your email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
          className="h-[52px] rounded-[14px] border-[1.5px] border-line-strong bg-card px-4 text-[17px] text-ink outline-none focus-visible:border-green"
        />
        <button type="submit" disabled={busy !== null} className={`${button} mt-1 bg-green text-card hover:bg-green-hover`}>
          {busy === "email" ? "Sending…" : "Email me a login link"}
        </button>
      </form>

      {error ? <p role="alert" className="text-[15px] text-red">{error}</p> : null}
    </div>
  );
}
