import type { ReactNode } from "react";
import { Mark } from "./Mark";

const TOTAL = 4;

/** Header, step counter and progress bar, shared by all four steps. */
export function OnboardingShell({
  step,
  children,
}: {
  step: number;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-paper">
      <div className="flex items-center justify-between gap-3 border-b border-line px-[18px] py-3.5">
        <Mark />
        <span className="text-[14px] text-muted">Step {step} of {TOTAL}</span>
      </div>
      <div className="h-1 bg-[#F1E9DA]">
        <div className="h-full bg-primary" style={{ width: `${(step / TOTAL) * 100}%` }} />
      </div>
      <div className="mx-auto flex w-full max-w-[620px] flex-1 flex-col gap-[22px] px-[18px] pt-8 pb-10">
        {children}
      </div>
    </div>
  );
}

export function StepTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[clamp(28px,4vw,34px)] leading-[1.1] font-normal">{children}</h1>
  );
}

export function StepIntro({ children }: { children: ReactNode }) {
  return <p className="text-[16px] leading-[1.55] text-body">{children}</p>;
}

/** Back on the left, the forward action on the right. */
export function StepNav({ back, children }: { back: string; children: ReactNode }) {
  return (
    <div className="mt-2 flex items-center justify-between gap-3">
      <a
        href={back}
        className="inline-flex min-h-11 items-center px-1 py-3 text-[15px] font-semibold text-muted no-underline"
      >
        Back
      </a>
      {children}
    </div>
  );
}
