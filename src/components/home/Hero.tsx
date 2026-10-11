import { PRICE_PER_MONTH, TRIAL_DAYS } from "@/config";
import { PhotoSlot, WaAvatar, pad, primaryBtn, wrap } from "./ui";

export function Hero() {
  return (
    <section id="top" className={`${pad} pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,80px)]`}>
      <div className={`${wrap} flex flex-wrap items-center gap-[clamp(36px,5vw,72px)]`}>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
          <h1 className="font-serif text-[clamp(42px,5.4vw,76px)] leading-[1.02] font-normal tracking-[-0.02em]">
            Before you call home tonight, know how <em className="text-primary">her day</em> really
            went.
          </h1>
          <p className="max-w-[520px] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-body">
            Every morning we make a short, friendly call to your parent on their normal phone. Then
            you get a note on WhatsApp: how they are, their medicines, and one thing to ask them. We
            don&apos;t replace your call. We make it a better one.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <a href="#start" className={`${primaryBtn} min-h-[56px] px-6 text-[17px]`}>
              Try {TRIAL_DAYS} days free
            </a>
            <a
              href="#listen"
              className="inline-flex min-h-11 items-center gap-2.5 px-1.5 py-3.5 text-[16px] font-semibold text-ink no-underline"
            >
              <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-ink">
                <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                  <path d="M1 1l10 6l-10 6z" fill="#191714" />
                </svg>
              </span>
              Hear a real call
            </a>
          </div>
          <span className="text-[14px] text-faint">
            Then {PRICE_PER_MONTH} a month per parent. Cancel anytime from WhatsApp.
          </span>
        </div>

        <div className="relative min-w-0 flex-[1_1_460px]">
          <PhotoSlot
            className="aspect-[4/5] p-[22px]"
            label="your parent on their phone at home in morning light"
            note={
              <>
                <strong>Real photo here.</strong> A real parent at home, on a basic phone, morning
                light. Not stock.
              </>
            }
          />
          {/* The note landing on WhatsApp, the moment the product delivers. */}
          <div className="absolute top-9 left-[clamp(-28px,-2vw,0px)] w-[min(340px,86%)] overflow-hidden rounded-[14px] bg-white shadow-[0_18px_40px_rgba(25,23,20,0.18)]">
            <div className="flex items-center gap-2.5 bg-wa-header px-3.5 py-2.5 text-white">
              <WaAvatar size={30} />
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold">Checkin</span>
                <span className="text-[11px] opacity-85">Business account</span>
              </div>
            </div>
            <div className="bg-wa-chat p-3">
              <div className="flex flex-col gap-1 rounded-[0_10px_10px_10px] bg-white px-3 pt-2.5 pb-1.5 text-[14px] leading-[1.5] text-wa-ink">
                <span><strong>Amma · Thursday</strong></span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-good-dot" />
                  All good today
                </span>
                <span>Took her BP tablet after breakfast. Slept well, sounded cheerful. Made upma.</span>
                <span><strong>Ask her tonight:</strong> did the tomato plants finally flower?</span>
                <span className="flex items-center gap-1 self-end text-[11px] text-wa-meta">
                  9:08 am
                  <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
                    <path d="M1 5l3 3L10 2M6 8l1 0L14 2" fill="none" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
