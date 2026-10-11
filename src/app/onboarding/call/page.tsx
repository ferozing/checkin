import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingShell, StepTitle } from "@/components/app/OnboardingShell";
import { StepCall } from "@/components/app/StepCall";
import { getParent, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Plan the daily call" };

export default async function PlanCall() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");

  return (
    <OnboardingShell step={3}>
      <StepTitle>Plan {parent.call_name || parent.name}&apos;s daily call</StepTitle>
      <StepCall parent={parent} />
    </OnboardingShell>
  );
}
