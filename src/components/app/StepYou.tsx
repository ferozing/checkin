"use client";

import { useState } from "react";
import { Field, PhonePrefix, SubmitButton, field } from "@/components/app/form";
import { StepNav } from "@/components/app/OnboardingShell";
import { APP_NAME } from "@/config";
import { saveProfile } from "@/lib/onboarding";

export function StepYou({
  name,
  whatsapp,
  optIn,
  code,
  badCode,
}: {
  name: string;
  whatsapp: string;
  optIn: boolean;
  code: string;
  badCode: boolean;
}) {
  const [checked, setChecked] = useState(optIn);

  return (
    <form action={saveProfile} className="flex flex-col gap-5">
      <Field id="name" label="Your name">
        <input id="name" name="name" required defaultValue={name} placeholder="Ravi Kumar" autoComplete="name" className={field} />
      </Field>

      {/* The code was checked before the email went out. Carried, not asked again. */}
      <input type="hidden" name="code" value={code} />
      {badCode ? (
        <p role="alert" className="text-[15px] font-semibold text-red">
          That invite code didn&apos;t work. Message us and we&apos;ll sort it out.
        </p>
      ) : null}

      <Field id="whatsapp" label="Your WhatsApp number">
        <div className="flex gap-2">
          <PhonePrefix />
          <input
            id="whatsapp"
            name="whatsapp"
            required
            inputMode="tel"
            defaultValue={whatsapp}
            placeholder="98765 43210"
            autoComplete="tel-national"
            className={field}
          />
        </div>
      </Field>

      <label className="flex cursor-pointer items-start gap-3 rounded-[14px] bg-sand p-4">
        <input
          type="checkbox"
          name="opt_in"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-0.5 h-[22px] w-[22px] shrink-0 accent-[#191714]"
        />
        <span className="text-[15px] leading-[1.5]">
          Send me {APP_NAME} updates on WhatsApp. I can stop them any time by replying STOP.
        </span>
      </label>

      <StepNav back="/login">
        <SubmitButton>Continue</SubmitButton>
      </StepNav>
    </form>
  );
}
