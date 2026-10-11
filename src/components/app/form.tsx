"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/** The form furniture shared by login and the four onboarding steps. */
export const field =
  "min-h-[52px] w-full rounded-xl border-[1.5px] border-line-strong bg-white px-3.5 text-[16px] text-ink outline-none focus-visible:border-primary";
export const labelText = "text-[14px] font-semibold";
export const hintText = "text-[13px] text-muted";
export const primary =
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl bg-primary px-5 text-[16px] font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-70";
export const ghost =
  "inline-flex min-h-11 cursor-pointer items-center rounded-xl border-[1.5px] border-ink bg-transparent px-4 text-[15px] font-semibold text-ink";

export function Field({
  id,
  label,
  hint,
  children,
}: {
  id?: string;
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {id ? (
        <label htmlFor={id} className={labelText}>{label}</label>
      ) : (
        <span className={labelText}>{label}</span>
      )}
      {children}
      {hint ? <span className={hintText}>{hint}</span> : null}
    </div>
  );
}

/** A pill you pick from a row, as in the design. */
export function Chip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-11 cursor-pointer rounded-full border-[1.5px] px-4 text-[15px] font-semibold transition-colors ${
        on ? "border-ink bg-ink text-paper" : "border-line-strong bg-white text-ink hover:bg-sand"
      }`}
    >
      {label}
    </button>
  );
}

/** A larger card choice, used for the call slot and the first call timing. */
export function CardChoice({
  label,
  sub,
  on,
  onClick,
}: {
  label: string;
  sub: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex cursor-pointer flex-col gap-0.5 rounded-[14px] border-[1.5px] p-3.5 text-left text-ink ${
        on ? "border-primary bg-[#F6E6DC]" : "border-line-strong bg-white"
      }`}
    >
      <span className="text-[16px] font-bold">{label}</span>
      <span className="text-[13px] text-muted">{sub}</span>
    </button>
  );
}

/** The +91 prefix next to a phone input. */
export function PhonePrefix() {
  return (
    <span className="inline-flex min-h-[52px] items-center rounded-xl border-[1.5px] border-line-strong bg-sand px-3.5 text-[16px]">
      +91
    </span>
  );
}

/**
 * A submit button that says what it is doing.
 *
 * Server actions take a round trip, and without this the button looked inert:
 * you could not tell whether the tap had registered until the next screen
 * appeared. useFormStatus knows the form is in flight.
 */
export function SubmitButton({
  children,
  pending: pendingLabel = "Saving…",
  className = primary,
}: {
  children: ReactNode;
  pending?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={className}>
      {pending ? (
        <>
          <Spinner />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="mr-2 animate-spin">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Dims the step while it is saving, so the whole form reads as busy. */
export function Busy({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <fieldset disabled={pending} className={pending ? "opacity-60 transition-opacity" : ""}>
      {children}
    </fieldset>
  );
}
