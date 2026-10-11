import type { Metadata } from "next";
import { OnboardingShell, StepIntro, StepTitle } from "@/components/app/OnboardingShell";
import { StepYou } from "@/components/app/StepYou";
import { redirect } from "next/navigation";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "About you" };

export default async function AboutYou({ searchParams }: PageProps<"/onboarding/you">) {
  await requireUser();
  // Already set up? Go straight to the app.
  if (await getParent()) redirect("/app");
  const profile = await getProfile();
  const { code, bad } = await searchParams;

  return (
    <OnboardingShell step={1}>
      <StepTitle>First, about you</StepTitle>
      <StepIntro>Your daily notes and any alerts come to your WhatsApp.</StepIntro>
      <StepYou
        name={profile?.name ?? ""}
        whatsapp={profile?.whatsapp ?? ""}
        optIn={profile?.whatsapp_opt_in ?? true}
        code={typeof code === "string" ? code.toUpperCase() : ""}
        badCode={bad === "1"}
      />
    </OnboardingShell>
  );
}
