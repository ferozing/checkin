import type { Metadata } from "next";
import { ParentForm } from "@/components/onboarding/ParentForm";
import { OnboardingShell } from "@/components/onboarding/Shell";
import { getParent, requireUser } from "@/lib/onboardingGuard";

export const metadata: Metadata = { title: "About your parent" };

export default async function AboutParent() {
  await requireUser();
  const parent = await getParent();

  return (
    <OnboardingShell
      step={2}
      title="About your parent"
      intro="This helps Sona talk to them the way family does."
    >
      <ParentForm
        parent={
          parent
            ? {
                name: parent.name ?? "",
                call_name: parent.call_name ?? "",
                phone: parent.phone ?? "",
                language: parent.language ?? "Hindi",
                call_slot: parent.call_slot === "evening" ? "evening" : "morning",
                call_time: (parent.call_time ?? "09:30").slice(0, 5),
                medicines: parent.medicines ?? "",
                watch_for: parent.watch_for ?? "",
              }
            : null
        }
      />
    </OnboardingShell>
  );
}
