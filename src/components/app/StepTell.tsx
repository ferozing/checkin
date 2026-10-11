"use client";

import { useState } from "react";
import { CardChoice, Field, SubmitButton, ghost } from "@/components/app/form";
import { StepNav } from "@/components/app/OnboardingShell";
import { finishOnboarding } from "@/lib/onboarding";
import type { Parent } from "@/lib/session";

export function StepTell({
  parent,
  message,
  timeLabel,
  trialDays,
}: {
  parent: Parent;
  message: string;
  timeLabel: string;
  trialDays: number;
}) {
  const [when, setWhen] = useState<"tomorrow" | "today">("tomorrow");
  const [copied, setCopied] = useState(false);
  const callName = parent.call_name || parent.name;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form action={finishOnboarding} className="flex flex-col gap-5">
      {/* The message as it will look in WhatsApp. */}
      <div className="rounded-2xl bg-wa-chat p-3.5">
        <div className="ml-[12%] rounded-[10px_0_10px_10px] bg-wa-sent px-3.5 py-3 text-[15px] leading-[1.55] text-wa-ink">
          {message}
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center rounded-xl bg-ink px-4 text-[15px] font-semibold text-paper no-underline"
        >
          Send on WhatsApp
        </a>
        <button type="button" onClick={copy} className={ghost}>
          {copied ? "Copied" : "Copy message"}
        </button>
      </div>

      <div className="flex flex-col gap-2.5 border-t border-line pt-[18px]">
        <span className="text-[14px] font-semibold">On the first call, Sona will</span>
        <span className="text-[15px] leading-[1.5] text-body">
          1. Say she&apos;s a voice assistant calling for you
        </span>
        <span className="text-[15px] leading-[1.5] text-body">
          2. Ask {callName} if it&apos;s okay to call every day
        </span>
        <span className="text-[15px] leading-[1.5] text-body">
          3. Keep it short, warm and in their language
        </span>
      </div>

      <Field label="When should the first call happen?">
        <div className="grid grid-cols-2 gap-2">
          <CardChoice
            label={`Tomorrow, ${timeLabel}`}
            sub="Recommended, after you tell them"
            on={when === "tomorrow"}
            onClick={() => setWhen("tomorrow")}
          />
          <CardChoice
            label="Today, in 1 hour"
            sub="If you have already told them"
            on={when === "today"}
            onClick={() => setWhen("today")}
          />
        </div>
        <input type="hidden" name="first_call" value={when} />
      </Field>

      <StepNav back="/onboarding/call">
        <SubmitButton>Start my {trialDays} day free trial</SubmitButton>
      </StepNav>
    </form>
  );
}
