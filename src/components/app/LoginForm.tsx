"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { field, labelText, primary } from "@/components/app/form";
import { APP_NAME, founderWhatsAppUrl } from "@/config";
import { checkInviteCode } from "@/lib/invite";
import { createClient } from "@/lib/supabase/client";

const googleBtn =
  "flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-ink bg-white text-[16px] font-semibold text-ink disabled:opacity-70";
const linkBtn = "cursor-pointer bg-transparent p-0 text-[14px] font-semibold text-ink underline underline-offset-[3px]";

type Stage = "code" | "email" | "otp";

/**
 * Invite code, then email, then the six digit code from that email.
 *
 * The code is checked before we ever send an email, so nobody without an
 * invite can make us send one. It travels with the sign up as user metadata,
 * so onboarding can redeem it even if the link is reopened later.
 */
export function LoginForm({ code: initialCode, google }: { code: string; google: boolean }) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>(initialCode ? "email" : "code");
  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  const next = `/onboarding/you?code=${encodeURIComponent(code)}`;

  const submitCode = async (e: FormEvent) => {
    e.preventDefault();
    const entered = code.trim().toUpperCase();
    if (!entered || busy) return;
    setBusy(true);
    setError("");
    const ok = await checkInviteCode(entered);
    setBusy(false);
    if (!ok) {
      setError("That code didn't work. Check it, or message us for one.");
      return;
    }
    setCode(entered);
    setStage("email");
  };

  const sendOtp = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await createClient().auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true, data: { invite_code: code } },
      });
      if (error) throw error;
      setStage("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the code.");
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e: FormEvent) => {
    e.preventDefault();
    const token = otp.replace(/\D/g, "");
    if (token.length < 6 || busy) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await createClient().auth.verifyOtp({
        email: email.trim(),
        token,
        type: "email",
      });
      if (error) throw error;
      router.push(next);
      router.refresh();
    } catch {
      setError("That code didn't work. Check it, or send a new one.");
      setBusy(false);
    }
  };

  const withGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      const url = new URL("/auth/callback", window.location.origin);
      url.searchParams.set("next", next);
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: url.toString() },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start Google sign in.");
      setBusy(false);
    }
  };

  const problem = error ? <p role="alert" className="text-[15px] font-semibold text-red">{error}</p> : null;

  if (stage === "code") {
    return (
      <form onSubmit={submitCode} noValidate className="flex flex-col gap-2">
        <label htmlFor="code" className={labelText}>Invite code</label>
        <input
          id="code"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(""); }}
          placeholder="FIRST50"
          autoCapitalize="characters"
          autoComplete="off"
          autoFocus
          className={`${field} uppercase placeholder:normal-case`}
        />
        <button type="submit" disabled={busy} className={`${primary} mt-1 w-full`}>
          {busy ? "Checking…" : "Continue"}
        </button>
        {problem}
        <span className="mt-1 text-[14px] leading-[1.5] text-muted">
          {APP_NAME} is invite only for now. No code?{" "}
          <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className="font-semibold text-ink">
            WhatsApp us
          </a>
        </span>
      </form>
    );
  }

  if (stage === "email") {
    return (
      <>
        {google ? (
          <>
            <button type="button" onClick={withGoogle} disabled={busy} className={googleBtn}>
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.8-1.5 4.6-4.4 6.4l6.7 5.2C42.2 35.1 45 30 45 24z" />
                <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.8 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
                <path fill="#FBBC05" d="M11.5 28.5c-.5-1.4-.7-2.9-.7-4.5s.3-3.1.7-4.5l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 10z" />
                <path fill="#EA4335" d="M24 10.6c3.3 0 5.5 1.4 6.8 2.6l6-5.8C33.1 4 29 2 24 2 15.4 2 8.1 6.9 4.4 14l7.1 5.5c1.8-5.3 6.7-8.9 12.5-8.9z" />
              </svg>
              Continue with Google
            </button>
            <div className="flex items-center gap-3 text-[13px] text-[#9A9086]">
              <span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" />
            </div>
          </>
        ) : null}

        <form onSubmit={sendOtp} noValidate className="flex flex-col gap-2">
          <label htmlFor="email" className={labelText}>Your email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="you@email.com"
            autoComplete="email"
            autoFocus
            className={field}
          />
          <button type="submit" disabled={busy} className={`${primary} mt-1 w-full`}>
            {busy ? "Sending…" : "Send me a code"}
          </button>
          {problem}
          <span className="mt-1 text-[14px] text-muted">
            Code {code} accepted.{" "}
            <button type="button" onClick={() => { setStage("code"); setError(""); }} className={linkBtn}>
              Change
            </button>
          </span>
        </form>
      </>
    );
  }

  return (
    <form onSubmit={verify} noValidate className="flex flex-col gap-2">
      <label htmlFor="otp" className={labelText}>Enter the 6 digit code</label>
      <input
        id="otp"
        value={otp}
        onChange={(e) => { setOtp(e.target.value); setError(""); }}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="123456"
        autoFocus
        className={`${field} text-center text-[24px] tracking-[0.4em]`}
      />
      <button type="submit" disabled={busy} className={`${primary} mt-1 w-full`}>
        {busy ? "Checking…" : "Verify and continue"}
      </button>
      {problem}
      <span className="mt-1 text-[14px] leading-[1.5] text-muted">
        Sent to {email}.{" "}
        <button
          type="button"
          onClick={async () => { await sendOtp(); setResent(true); }}
          disabled={busy}
          className={linkBtn}
        >
          {resent ? "Sent again" : "Send again"}
        </button>
        {" · "}
        <button type="button" onClick={() => { setStage("email"); setOtp(""); setError(""); }} className={linkBtn}>
          Change email
        </button>
      </span>
    </form>
  );
}
