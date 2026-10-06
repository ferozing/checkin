import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";

const TOTAL = 4;

export function OnboardingShell({
  step,
  title,
  intro,
  children,
}: {
  step: number;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[560px] px-[clamp(20px,4vw,32px)] pt-[clamp(16px,4vw,40px)] pb-[clamp(64px,9vw,112px)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {Array.from({ length: TOTAL }, (_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-green" : "bg-line"}`} />
            ))}
          </div>
          <span className="text-[14px] text-muted">Step {step} of {TOTAL}</span>
        </div>
        <h1 className="mt-7 font-serif text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-medium tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mt-3 text-ink-2">{intro}</p>
        {children}
      </main>
    </>
  );
}

export const field =
  "h-[52px] w-full rounded-[14px] border-[1.5px] border-line-strong bg-card px-4 text-[17px] text-ink outline-none focus-visible:border-green";
export const label = "text-[15px] font-semibold";
export const hint = "text-[14px] text-muted";
export const primary =
  "flex min-h-[56px] w-full cursor-pointer items-center justify-center rounded-full bg-green text-[17px] font-semibold text-card transition-colors hover:bg-green-hover disabled:opacity-60";
