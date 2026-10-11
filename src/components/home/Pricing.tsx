import { PRICE_PER_MONTH, TRIAL_DAYS } from "@/config";
import { pad, primaryBtn, wrap } from "./ui";

const includes = [
  "A call every day, at the time you pick",
  "A note on WhatsApp after every call",
  "Instant alerts and missed call follow ups",
];

const faqs = [
  [
    "Will my parent know it is an AI?",
    "Yes, always. Sona introduces herself as a voice assistant calling on your behalf, every single time. We think anything else would be wrong.",
  ],
  [
    "What if my parent does not want the calls?",
    "Then there are no calls. Sona asks for their permission on the first call, and they can stop it any day just by saying so. You can also pause from WhatsApp.",
  ],
  [
    "Does this replace me calling home?",
    "No, and it should not. Checkin gives you a reason and a starting point for your own call. The best families use both.",
  ],
  [
    "Who can see what my parent says?",
    "Only you, and anyone you add from your family. We never sell or share it, and you can ask us to delete everything.",
  ],
  [
    "Which languages work today?",
    "Hindi, Telugu, Tamil, Kannada, Bengali and English. Tell us yours on WhatsApp and we will tell you honestly if it is ready.",
  ],
];

export function Pricing() {
  return (
    <section id="pricing" className={`${pad} pb-[clamp(72px,9vw,128px)]`}>
      <div className={`${wrap} flex flex-wrap items-start gap-[clamp(32px,5vw,80px)]`}>
        <div className="flex flex-[1_1_340px] flex-col gap-3.5 rounded-[18px] border-[1.5px] border-ink p-[30px]">
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-faint">One parent</span>
          <span className="font-serif text-[64px] leading-none">
            {PRICE_PER_MONTH}
            <span className="font-sans text-[17px] text-muted"> a month</span>
          </span>
          <div className="flex flex-col gap-2 text-[16px] leading-[1.5] text-body">
            {includes.map((i) => (
              <span key={i}>{i}</span>
            ))}
            <span>First {TRIAL_DAYS} days free. Cancel any time.</span>
          </div>
          <a href="#start" className={`${primaryBtn} mt-2 w-full`}>
            Try {TRIAL_DAYS} days free
          </a>
        </div>

        <div className="flex min-w-0 flex-[999_1_520px] flex-col">
          <h2 className="mb-4 font-serif text-[clamp(32px,3.4vw,44px)] leading-[1.1] font-normal tracking-[-0.02em]">
            Questions families ask us
          </h2>
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[18px] text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-[22px] font-normal text-faint after:content-['+'] group-open:after:content-['\2212']"
                />
              </summary>
              <p className="mb-[18px] max-w-[620px] text-[16px] leading-[1.6] text-body">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
