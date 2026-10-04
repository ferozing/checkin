import type { Metadata } from "next";
import { Bullets, Callout, LegalPage, Section, TextLink } from "@/components/LegalPage";
import { APP_NAME, COMPANY, LEGAL_LAST_UPDATED, PRICE_PER_MONTH, TRIAL_DAYS } from "@/config";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" intro={`Last updated ${LEGAL_LAST_UPDATED}`}>
      <p className="mt-6 text-ink-2">
        These terms apply when you use {APP_NAME}, a service by {COMPANY.name}. By signing up, you agree to them.
      </p>

      <Callout>
        <strong>Not a medical or emergency service.</strong> {APP_NAME} is a daily companion call, not medical care. In
        an emergency, call{" "}
        <a href="tel:112" className="font-semibold underline underline-offset-[3px]">112</a>.
      </Callout>

      <Section title="Your parent's consent">
        <p>You must have your parent&apos;s consent before you add them, and you confirm this before the first call.</p>
      </Section>

      <Section title="Price and payment">
        <Bullets>
          <li>Your first {TRIAL_DAYS} days are free.</li>
          <li>After the trial, it costs {PRICE_PER_MONTH} per month for each parent.</li>
          <li>You can cancel anytime. See our <TextLink href="/refunds">refund policy</TextLink>.</li>
        </Bullets>
      </Section>

      <Section title="Governing law">
        <p>These terms are governed by the laws of India.</p>
      </Section>

      <Section title="Contact">
        <p>
          Write to <TextLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</TextLink> or see our{" "}
          <TextLink href="/contact">contact page</TextLink>.
        </p>
      </Section>
    </LegalPage>
  );
}
