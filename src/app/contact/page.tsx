import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextLink } from "@/components/LegalPage";
import { COMPANY } from "@/config";

export const metadata: Metadata = { title: "Contact" };

const items = [
  { label: "Company", value: COMPANY.name },
  { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { label: "Phone and WhatsApp", value: COMPANY.phoneDisplay, href: `tel:${COMPANY.phoneE164}` },
  { label: "Address", value: COMPANY.address },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[760px] px-[clamp(20px,4vw,32px)] pt-[clamp(24px,5vw,56px)] pb-[clamp(64px,9vw,112px)]">
        <h1 className="font-serif text-[clamp(40px,5.6vw,64px)] leading-[1.05] font-medium tracking-[-0.02em]">Contact us</h1>
        <p className="mt-3 text-[15px] text-muted">We usually reply within one working day.</p>
        <dl className="mt-9 grid gap-3.5">
          {items.map((item) => (
            <div key={item.label} className="rounded-[22px] bg-card px-6 py-5 shadow-soft">
              <dt className="text-[14px] font-semibold text-muted">{item.label}</dt>
              <dd className="mt-1.5 text-[20px] font-semibold text-ink">
                {item.href ? (
                  <a href={item.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px] [overflow-wrap:anywhere]">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-ink-2">
          For billing questions, write to <TextLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</TextLink>. To
          delete your data, see our <TextLink href="/privacy">privacy policy</TextLink>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
