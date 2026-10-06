import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextLink } from "@/components/LegalPage";
import { APP_NAME, COMPANY, TRIAL_DAYS, founderWhatsAppUrl, signupWhatsAppUrl } from "@/config";
import { checkInviteCode } from "@/lib/invite";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Sign up" };

const cta =
  "mt-8 inline-flex min-h-[60px] items-center gap-3 rounded-full bg-green px-[30px] text-[19px] font-semibold text-card shadow-[0_10px_28px_rgba(31,77,58,0.25)] transition-colors hover:bg-green-hover";

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const { code, error } = await searchParams;
  const entered = typeof code === "string" ? code.trim().toUpperCase() : "";
  const valid = await checkInviteCode(entered);

  // Already signed in? Carry on where they left off.
  if (valid && (await getUser())) redirect("/onboarding/you");

  const shell = (children: React.ReactNode) => (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[560px] px-[clamp(20px,4vw,32px)] pt-[clamp(24px,5vw,56px)] pb-[clamp(64px,9vw,112px)]">
        {children}
      </main>
      <SiteFooter />
    </>
  );

  if (!valid) {
    return shell(
      <>
        <h1 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.05] font-medium tracking-[-0.02em]">
          {entered ? "That code didn’t work" : "You need an invite code"}
        </h1>
        <p className="mt-4 text-ink-2">
          {APP_NAME} is invite only while we grow carefully, so every first call gets proper
          attention. Message us and we&apos;ll sort you out.
        </p>
        <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className={cta}>
          Message us on WhatsApp
        </a>
        <p className="mt-6 text-[15px] text-muted">
          Or go back to the{" "}
          <Link href="/" className="text-green underline underline-offset-[3px]">home page</Link>.
        </p>
      </>,
    );
  }

  // Supabase accounts are not wired up yet, so hand off to WhatsApp rather than
  // showing a sign up form that cannot work.
  if (!isSupabaseConfigured) {
    return shell(
      <>
        <p className="inline-flex rounded-full bg-good-bg px-3.5 py-1.5 text-[14px] font-semibold text-good">
          Invite code {entered} accepted
        </p>
        <h1 className="mt-4 font-serif text-[clamp(34px,5vw,52px)] leading-[1.05] font-medium tracking-[-0.02em]">
          You&apos;re in. Let&apos;s set up the first call.
        </h1>
        <p className="mt-4 text-ink-2">
          We set every family up by hand right now, so the first call goes well. Message us on
          WhatsApp and we&apos;ll ask three things: your parent&apos;s name and number, the language
          they&apos;re most comfortable in, and what time suits them.
        </p>
        <a href={signupWhatsAppUrl(entered)} target="_blank" rel="noopener" className={cta}>
          Set up on WhatsApp
        </a>
        <p className="mt-6 text-[15px] text-muted">
          Prefer email? Write to <TextLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</TextLink>.
        </p>
      </>,
    );
  }

  return shell(
    <>
      <h1 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.05] font-medium tracking-[-0.02em]">
        Let&apos;s set up a daily call home.
      </h1>
      <p className="mt-4 text-ink-2">
        Your {TRIAL_DAYS} day free trial starts today. It takes about two minutes.
      </p>
      {error ? (
        <p role="alert" className="mt-4 rounded-[14px] bg-red-bg px-4 py-3 text-[15px] text-red">
          That sign in link didn&apos;t work. Try again.
        </p>
      ) : null}
      <SignUpForm code={entered} />
      <p className="mt-6 text-[15px] text-muted">
        No passwords to remember. By continuing you agree to our{" "}
        <TextLink href="/terms">Terms</TextLink> and <TextLink href="/privacy">Privacy policy</TextLink>.
      </p>
    </>,
  );
}
