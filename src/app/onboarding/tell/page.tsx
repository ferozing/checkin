import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingShell, StepIntro, StepTitle } from "@/components/app/OnboardingShell";
import { StepTell } from "@/components/app/StepTell";
import { COMPANY, TRIAL_DAYS } from "@/config";
import { getParent, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Tell them first" };

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
  const timeLabel = pretty((parent.call_time ?? "09:00").slice(0, 5));

  // The words the child sends. Written here so the trust rules are in one place:
  // Sona is named as an assistant, and stopping the calls is offered up front.
  const message =
    `${callName}, from tomorrow a lady called Sona will call you at ${timeLabel} every day, from ` +
    `${COMPANY.callerDisplay}. She is an assistant I set up. She will ask how you are and if you ` +
    `took your tablets, and tell me. You can talk to her in ${parent.language}. If you don't want ` +
    `the calls, just tell her.`;

  return (
    <OnboardingShell step={4}>
      <StepTitle>Tell {callName} before the first call</StepTitle>
      <StepIntro>
        Calls go much better when it comes from you first. Send this, or say it in your own words.
      </StepIntro>
      <StepTell parent={parent} message={message} timeLabel={timeLabel} trialDays={TRIAL_DAYS} />
    </OnboardingShell>
  );
}
