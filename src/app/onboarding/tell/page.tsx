import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingShell, StepIntro, StepTitle } from "@/components/app/OnboardingShell";
import { StepTell } from "@/components/app/StepTell";
import { COMPANY, TRIAL_DAYS } from "@/config";
import { getParent, requireUser } from "@/lib/session";
import { tellMessage } from "@/lib/tellMessage";

export const metadata: Metadata = { title: "Tell them first" };

/** The time as the child reads it in our own screens, which are in English. */
const pretty = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${suffix}`;
};

export default async function TellThem() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");

  const callName = parent.call_name || parent.name;
  const callTime = (parent.call_time ?? "09:00").slice(0, 5);
  const language = parent.language || "English";
  const args = { callName, callTime, caller: COMPANY.callerDisplay };

  return (
    <OnboardingShell step={4}>
      <StepTitle>Tell {callName} before the first call</StepTitle>
      <StepIntro>
        Calls go much better when it comes from you first. Send this, or say it in your own words.
      </StepIntro>
      <StepTell
        parent={parent}
        language={language}
        message={tellMessage({ ...args, language })}
        englishMessage={tellMessage({ ...args, language: "English" })}
        timeLabel={pretty(callTime)}
        trialDays={TRIAL_DAYS}
      />
    </OnboardingShell>
  );
}
