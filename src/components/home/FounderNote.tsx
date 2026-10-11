import { APP_NAME, COMPANY, FOUNDER_NAME, founderWhatsAppUrl } from "@/config";
import { PhotoSlot, pad, wrap } from "./ui";

export function FounderNote() {
  return (
    <section className={`${pad} pb-[clamp(72px,9vw,128px)]`}>
      <div
        className={`${wrap} flex flex-wrap items-center gap-[clamp(28px,5vw,64px)] rounded-[22px] bg-sand p-[clamp(28px,5vw,64px)]`}
      >
        <PhotoSlot
          className="aspect-square flex-[0_1_320px]"
          label="the founder with his parents"
          note={
            <>
              <strong>Real photo here.</strong> {FOUNDER_NAME} with his parents at home.
            </>
          }
        />
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-faint">
            Why we built this
          </span>
          <p className="font-serif text-[clamp(22px,2.2vw,28px)] leading-[1.45]">
            &ldquo;Every call home went the same way. Everything&apos;s fine, did you eat, okay bye.
            I wanted to know how my parents really were, and have something real to talk about.
            {" "}{APP_NAME} is what I built for my own family first.&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-hand text-[34px] text-ink">{FOUNDER_NAME}</span>
            <span className="text-[14px] text-muted">
              Founder, {APP_NAME} by {COMPANY.name}
            </span>
            <a
              href={founderWhatsAppUrl()}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center py-2.5 text-[15px] font-semibold text-ink underline underline-offset-[3px]"
            >
              Message me on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
