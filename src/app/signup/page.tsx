import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextLink } from "@/components/LegalPage";
import { APP_NAME, COMPANY, INVITE_CODES, TRIAL_DAYS, founderWhatsAppUrl, signupWhatsAppUrl } from "@/config";

export const metadata: Metadata = { title: "Sign up" };

// Sign up proper arrives with Phase 2 (Supabase accounts and onboarding).
// Until then a valid invite code hands off to WhatsApp, so nobody reaches a dead end.
export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const { code } = await searchParams;
  const entered = typeof code === "string" ? code.trim().toUpperCase() : "";
  const valid = INVITE_CODES.map((c) => c.toUpperCase()).includes(entered);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[640px] px-[clamp(20px,4vw,32px)] pt-[clamp(24px,5vw,56px)] pb-[clamp(64px,9vw,112px)]">
        {valid ? (
          <>
            <p className="inline-flex rounded-full bg-good-bg px-3.5 py-1.5 text-[14px] font-semibold text-good">
              Invite code {entered} accepted
            </p>
            <h1 className="mt-4 font-serif text-[clamp(34px,5vw,52px)] leading-[1.05] font-medium tracking-[-0.02em]">
              You&apos;re in. Let&apos;s set up the first call.
            </h1>
            <p className="mt-4 text-ink-2">
              We set every family up by hand right now, so the first call goes well. Message us on
              WhatsApp and we&apos;ll ask three things: your parent&apos;s name and number, the
              language they&apos;re most comfortable in, and what time suits them.
            </p>
            <p className="mt-3 text-ink-2">
              Their first {TRIAL_DAYS} days are free, and you can stop at any point.
            </p>
            <a
              href={signupWhatsAppUrl(entered)}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex min-h-[60px] items-center gap-3 rounded-full bg-green px-[30px] text-[19px] font-semibold text-card shadow-[0_10px_28px_rgba(31,77,58,0.25)] transition-colors hover:bg-green-hover"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Set up on WhatsApp
            </a>
            <p className="mt-6 text-[15px] text-muted">
              Prefer email? Write to <TextLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</TextLink>.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.05] font-medium tracking-[-0.02em]">
              {entered ? "That code didn’t work" : "You need an invite code"}
            </h1>
            <p className="mt-4 text-ink-2">
              {APP_NAME} is invite only while we grow carefully, so every first call gets proper
              attention. Message us and we&apos;ll sort you out.
            </p>
            <a
              href={founderWhatsAppUrl()}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex min-h-[60px] items-center gap-3 rounded-full bg-green px-[30px] text-[19px] font-semibold text-card shadow-[0_10px_28px_rgba(31,77,58,0.25)] transition-colors hover:bg-green-hover"
            >
              Message us on WhatsApp
            </a>
            <p className="mt-6 text-[15px] text-muted">
              Or go back to the <Link href="/" className="text-green underline underline-offset-[3px]">home page</Link>.
            </p>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
