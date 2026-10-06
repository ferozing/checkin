"use client";

import { useState } from "react";
import { hint, primary } from "@/components/onboarding/Shell";
import { saveConsent } from "@/lib/onboarding";

export function ConsentForm({ callName, yourName, sonaNumber }: { callName: string; yourName: string; sonaNumber: string }) {
  const [agreed, setAgreed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sonaNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="rounded-[18px] bg-card border border-line p-5">
        <p className="text-[14px] font-semibold tracking-[0.06em] text-muted uppercase">
          How Sona opens the first call
        </p>
        <p className="mt-3 font-serif text-[20px] leading-[1.4]">
          &ldquo;Hello {callName}, I&apos;m Sona. {yourName} asked me to call you every day, just to
          chat for a few minutes. Is this a good time?&rdquo;
        </p>
      </div>

      <div className="rounded-[18px] bg-terracotta-soft px-5 py-4 text-terracotta-text">
        <p>
          <strong>Tip:</strong> Save Sona&apos;s number on their phone as{" "}
          <strong>Sona (from {yourName})</strong> so they pick up.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[17px]">{sonaNumber}</span>
          <button type="button" onClick={copy} className="cursor-pointer rounded-full border-[1.5px] border-terracotta px-4 py-2 text-[14px] font-semibold">
            {copied ? "Copied" : "Copy number"}
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-[18px] border-[1.5px] border-line-strong bg-card p-4">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 accent-[#1F4D3A]" />
        <span>
          I&apos;ve told my parent Sona will call every day and they&apos;re okay with it.
        </span>
      </label>

      <form action={saveConsent}>
        <button type="submit" disabled={!agreed} className={primary}>Continue</button>
      </form>
      {!agreed ? <p className={hint}>Tick the box above to continue.</p> : null}
    </div>
  );
}
