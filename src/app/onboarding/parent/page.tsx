import type { Metadata } from "next";
import { OnboardingShell, StepTitle } from "@/components/app/OnboardingShell";
import { StepParent } from "@/components/app/StepParent";
import { getParent, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Who should Sona call?" };

export default async function AboutParent() {
  await requireUser();
  const parent = await getParent();

  return (
    <OnboardingShell step={2}>
      <StepTitle>Who should Sona call?</StepTitle>
      <StepParent parent={parent} />
    </OnboardingShell>
  );
}
