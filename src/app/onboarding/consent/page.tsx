import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ConsentForm } from "@/components/onboarding/ConsentForm";
import { OnboardingShell } from "@/components/onboarding/Shell";
import { COMPANY } from "@/config";
import { getParent, getProfile, requireUser } from "@/lib/onboardingGuard";

export const metadata: Metadata = { title: "Let them know" };

export default async function Consent() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const profile = await getProfile();

  const callName = parent.call_name || parent.name || "your parent";
  const yourName = profile?.name || "your child";

  return (
    <OnboardingShell
      step={3}
      title="Let them know"
      intro={`Sona works best when ${callName} is expecting her. A quick word from you goes a long way.`}
    >
      <ConsentForm callName={callName} yourName={yourName} sonaNumber={COMPANY.phoneDisplay} />
    </OnboardingShell>
  );
}
