import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OnboardingShell, hint, label, primary } from "@/components/onboarding/Shell";
import { COMPANY, PRICE_PER_MONTH, TRIAL_DAYS, founderWhatsAppUrl } from "@/config";
import { startTrial } from "@/lib/onboarding";
import { getParent, getProfile, requireUser } from "@/lib/onboardingGuard";

export const metadata: Metadata = { title: "Get your daily updates" };

/** "9:30 AM" from a stored "09:30:00". */
function pretty(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export default async function Updates({ searchParams }: PageProps<"/onboarding/updates">) {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const profile = await getProfile();
  const { done } = await searchParams;

  const callName = parent.call_name || parent.name || "your parent";
  const when = pretty((parent.call_time ?? "09:30").slice(0, 5));

  if (done) {
    return (
      <OnboardingShell step={4} title="You're all set." intro={`Sona calls ${callName} tomorrow at ${when}.`}>
        <div className="mt-8 rounded-[18px] bg-good-bg px-6 py-5 text-good">
          <p className="font-semibold">Your {TRIAL_DAYS} day free trial has started.</p>
          <p className="mt-1 text-ink-2">
            Your first note arrives on WhatsApp right after that call. We&apos;ll remind you before
            the trial ends.
          </p>
        </div>
        <p className="mt-6 text-ink-2">
          Anything to change before then? Message us on{" "}
          <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className="text-green underline underline-offset-[3px]">WhatsApp</a>{" "}
          and we&apos;ll sort it out.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-[52px] items-center text-[17px] font-semibold text-green underline underline-offset-[3px]">
          Back to the home page
        </Link>
      </OnboardingShell>
    );
  }

  const start = startTrial.bind(null, TRIAL_DAYS);

  return (
    <OnboardingShell step={4} title="Get your daily updates" intro="On WhatsApp. No app to install.">
      <div className="mt-8 flex flex-col gap-6">
        <div className="rounded-[18px] border border-line bg-card p-5">
          <p className={label}>WhatsApp</p>
          <p className="mt-1 font-mono text-[17px] text-ink-2">
            +91 {profile?.whatsapp ?? ""}
          </p>
          <a
            href={founderWhatsAppUrl()}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex min-h-[52px] items-center gap-2.5 rounded-full border-[1.5px] border-green px-5 text-[17px] font-semibold text-green hover:bg-green-soft"
          >
            Send us a hello on WhatsApp
          </a>
          <p className={`${hint} mt-3`}>Save Sona&apos;s number ({COMPANY.phoneDisplay}) when it arrives, and you&apos;re set.</p>
        </div>

        <p className="text-ink-2">
          Sona&apos;s first call to {callName} is <strong>tomorrow at {when}</strong>. Your note
          arrives right after.
        </p>

        <form action={start}>
          <button type="submit" className={primary}>Start my free trial</button>
        </form>
        <p className={hint}>
          {TRIAL_DAYS} days free, then {PRICE_PER_MONTH} per month. We&apos;ll remind you before it ends.
        </p>
      </div>
    </OnboardingShell>
  );
}
