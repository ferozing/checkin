import type { Metadata } from "next";
import { OnboardingShell, StepTitle } from "@/components/app/OnboardingShell";
import { StepParent } from "@/components/app/StepParent";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Who should Sona call?" };

export default async function AboutParent({ searchParams }: PageProps<"/onboarding/parent">) {
  await requireUser();
  const [parent, profile, q] = await Promise.all([getParent(), getProfile(), searchParams]);

  return (
    <OnboardingShell step={2}>
      <StepTitle>Who should Sona call?</StepTitle>
      <StepParent parent={parent} ownPhone={profile?.whatsapp ?? ""} rejected={q.same === "1"} />
    </OnboardingShell>
  );
}
