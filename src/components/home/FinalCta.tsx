import Link from "next/link";
import { APP_NAME, COMPANY, founderWhatsAppUrl } from "@/config";
import { InviteBox } from "./InviteBox";
import { pad, wrap } from "./ui";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refunds", label: "Refunds" },
  { href: "/contact", label: "Contact" },
];

export function FinalCta() {
  return (
    <section id="start" className={`border-t border-line ${pad} pt-[clamp(72px,9vw,120px)] pb-8`}>
      <div className={`${wrap} flex flex-col gap-6`}>
        <h2 className="max-w-[900px] font-serif text-[clamp(40px,5.4vw,76px)] leading-[1.02] font-normal tracking-[-0.02em]">
          Tomorrow morning, you could already know.
        </h2>
        <p className="max-w-[560px] text-[18px] leading-[1.6] text-body">
          We&apos;re letting families in a few at a time so every first call goes well. Have an
          invite code? Start now. No code? Just message us.
        </p>
        <InviteBox />
        <a
          href={founderWhatsAppUrl()}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center self-start py-2 text-[16px] font-semibold text-ink underline underline-offset-[3px]"
        >
          No code? WhatsApp us at {COMPANY.phoneDisplay}
        </a>
      </div>

      <footer
        className={`${wrap} mt-[clamp(64px,8vw,110px)] flex flex-wrap justify-between gap-3 border-t border-line pt-[22px] text-[13.5px] leading-[1.6] text-muted`}
      >
        <span>
          {APP_NAME} is a product of {COMPANY.legalName}, an Udyam registered enterprise in{" "}
          {COMPANY.registeredState}.
        </span>
        <span>
          {legal.map((l, i) => (
            <span key={l.href}>
              {i > 0 ? " · " : ""}
              <Link href={l.href} className="text-body">{l.label}</Link>
            </span>
          ))}
        </span>
      </footer>
    </section>
  );
}
