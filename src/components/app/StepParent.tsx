"use client";

import { useState } from "react";
import { Chip, Field, SubmitButton, field } from "@/components/app/form";
import { StepNav } from "@/components/app/OnboardingShell";
import { saveParent } from "@/lib/onboarding";
import { samePhone } from "@/lib/phone";
import type { Parent } from "@/lib/session";

const CALL_NAMES = ["Amma", "Papa", "Ma", "Dad", "Nanna", "Other"];
const LANGUAGES = ["Telugu", "Hindi", "Tamil", "Kannada", "Bengali", "English"];

export function StepParent({
  parent,
  ownPhone,
  rejected,
}: {
  parent: Parent | null;
  ownPhone: string;
  rejected: boolean;
}) {
  const [callName, setCallName] = useState(parent?.call_name ?? "Amma");
  const [language, setLanguage] = useState(parent?.language ?? "Telugu");
  const [phone, setPhone] = useState(parent?.phone ?? "");

  // Sona calls this number every morning. People trying the product out reach
  // for their own number, and then the calls go to them instead of their
  // parent. Catch it here, and again in saveParent.
  const isOwn = !!ownPhone && samePhone(ownPhone, phone);
  const showOwn = isOwn || rejected;

  return (
    <form action={saveParent} className="flex flex-col gap-5">
      <Field id="pname" label="Their name">
        <input id="pname" name="name" required defaultValue={parent?.name ?? ""} placeholder="Lakshmi Devi" className={field} />
      </Field>

      <Field label="What do you call them?" hint="Sona will use this name on every call.">
        <div className="flex flex-wrap gap-2">
          {CALL_NAMES.map((n) => (
            <Chip key={n} label={n} on={callName === n} onClick={() => setCallName(n)} />
          ))}
        </div>
        <input
          aria-label="What you call them"
          name="call_name"
          value={callName}
          onChange={(e) => setCallName(e.target.value)}
          className={`${field} mt-1`}
        />
      </Field>

      <Field
        id="phone"
        label="Their phone number"
        hint={showOwn ? undefined : "The phone they actually answer. Mobile or landline."}
      >
        <input
          id="phone"
          name="phone"
          required
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={showOwn || undefined}
          aria-describedby={showOwn ? "phone-own" : undefined}
          placeholder="Mobile or landline with area code"
          className={`${field} ${showOwn ? "border-red" : ""}`}
        />
        {showOwn && (
          <span id="phone-own" role="alert" className="text-[13px] leading-[1.5] text-red">
            That is your own number. Put {callName}&apos;s number here, or Sona will call you
            instead of them.
          </span>
        )}
      </Field>

      <Field label="Language for the call">
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <Chip key={l} label={l} on={language === l} onClick={() => setLanguage(l)} />
          ))}
        </div>
        <input type="hidden" name="language" value={language} />
      </Field>

      <Field id="city" label="Town or city">
        <input id="city" name="city" defaultValue={parent?.city ?? ""} placeholder="Vijayawada" className={field} />
      </Field>

      <StepNav back="/onboarding/you">
        <SubmitButton disabledReason={isOwn ? "Enter their number to continue" : undefined}>
          Continue
        </SubmitButton>
      </StepNav>
    </form>
  );
}
