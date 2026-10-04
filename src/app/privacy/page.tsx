import type { Metadata } from "next";
import { Bullets, LegalPage, Section, TextLink } from "@/components/LegalPage";
import { APP_NAME, COMPANY, LEGAL_LAST_UPDATED } from "@/config";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  const mail = <TextLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</TextLink>;
  return (
    <LegalPage title="Privacy policy" intro={`Last updated ${LEGAL_LAST_UPDATED}`}>
      <p className="mt-6 text-ink-2">
        {APP_NAME} is run by {COMPANY.name}. Sona, a voice assistant, calls your parent once a day and sends you a short
        update on WhatsApp. This page explains what we collect and how we look after it.
      </p>

      <Section title="What we collect">
        <Bullets>
          <li><strong className="text-ink">About you:</strong> your name, email address and WhatsApp number.</li>
          <li><strong className="text-ink">About your parent:</strong> their name and phone number.</li>
          <li>
            <strong className="text-ink">From each call:</strong> the call recording, the transcript and the summary.
            These may include health and wellbeing notes, such as medicines, mood, food and sleep.
          </li>
        </Bullets>
      </Section>

      <Section title="Why we use it">
        <p>We use this data only to make the daily calls to your parent and to send you updates about them.</p>
      </Section>

      <Section title="Who processes it for us">
        <p>We share data only with the providers we need to run {APP_NAME}:</p>
        <Bullets>
          <li><strong className="text-ink">Supabase</strong> stores our database.</li>
          <li><strong className="text-ink">Bolna</strong> places the voice calls.</li>
          <li><strong className="text-ink">Meta WhatsApp</strong> delivers your updates.</li>
          <li><strong className="text-ink">Razorpay</strong> processes payments.</li>
          <li><strong className="text-ink">An AI model provider</strong> turns call transcripts into summaries.</li>
        </Bullets>
      </Section>

      <Section title="We never sell your data">
        <p>Your data is never sold, and never used for advertising.</p>
      </Section>

      <Section title="Your parent's consent">
        <p>Before the first call, you confirm that your parent has agreed to receive the calls.</p>
      </Section>

      <Section title="Deleting your data">
        <p>Ask us to delete your data, or your parent&apos;s, by writing to {mail}. We delete it within 30 days of your request.</p>
      </Section>

      <Section title="Questions">
        <p>Write to {mail} or see our <TextLink href="/contact">contact page</TextLink>.</p>
      </Section>
    </LegalPage>
  );
}
