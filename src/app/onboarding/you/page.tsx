import type { Metadata } from "next";
import { OnboardingShell, field, hint, label, primary } from "@/components/onboarding/Shell";
import { saveProfile } from "@/lib/onboarding";
import { getProfile, requireUser } from "@/lib/onboardingGuard";

export const metadata: Metadata = { title: "About you" };

export default async function AboutYou() {
  await requireUser();
  const profile = await getProfile();

  return (
    <OnboardingShell step={1} title="About you" intro="So Sona knows who to send the updates to.">
      <form action={saveProfile} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={label}>Your name</label>
          <input id="name" name="name" required defaultValue={profile?.name ?? ""} autoComplete="given-name" className={field} />
          <p className={hint}>Sona will mention you by this name, so your parent knows who sent her.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="whatsapp" className={label}>Your WhatsApp number</label>
          <div className="flex items-center gap-2">
            <span className="flex h-[52px] items-center rounded-[14px] border-[1.5px] border-line-strong bg-sand px-4 text-[17px] text-ink-2">+91</span>
            <input id="whatsapp" name="whatsapp" required inputMode="tel" defaultValue={profile?.whatsapp ?? ""} autoComplete="tel-national" className={field} />
          </div>
          <p className={hint}>Only used for updates and alerts. Never shared.</p>
        </div>
        <button type="submit" className={primary}>Continue</button>
      </form>
    </OnboardingShell>
  );
}
