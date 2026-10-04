import type { Metadata } from "next";
import { LegalPage, Section, TextLink } from "@/components/LegalPage";
import { COMPANY, LEGAL_LAST_UPDATED, PRICE_PER_MONTH, TRIAL_DAYS } from "@/config";

export const metadata: Metadata = { title: "Refunds and cancellation" };

export default function RefundsPage() {
  return (
    <LegalPage title="Refunds and cancellation" intro={`Last updated ${LEGAL_LAST_UPDATED}`}>
      <Section title="Free trial">
        <p>You are not charged anything during the {TRIAL_DAYS} day free trial.</p>
      </Section>

      <Section title="Cancel anytime">
        <p>You can cancel your subscription at any time. After you cancel, you will not be charged again.</p>
      </Section>

      <Section title="Monthly fees">
        <p>The {PRICE_PER_MONTH} fee for the current month is non refundable.</p>
      </Section>

      <Section title="Billing questions">
        <p>
          If something looks wrong on your bill, write to{" "}
          <TextLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</TextLink> and we will sort it out.
        </p>
      </Section>
    </LegalPage>
  );
}
