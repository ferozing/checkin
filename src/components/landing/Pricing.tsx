import { PRICE_PER_MONTH, TRIAL_DAYS } from "@/config";
import { StartTrialButton } from "./invite";
import { wrap } from "./styles";

export function Pricing() {
  return (
    <section id="pricing" className={`${wrap} scroll-mt-4 pb-[clamp(64px,9vw,112px)]`}>
      <div className="flex flex-wrap items-center justify-between gap-10 rounded-[36px] bg-green px-[clamp(24px,4vw,56px)] py-[clamp(36px,5vw,64px)] text-[#F4EEE2]">
        <div className="min-w-0 flex-[1_1_380px]">
          <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#E9B79C]">Pricing</p>
          <h2 className="mt-3 font-serif text-[clamp(32px,3.8vw,48px)] leading-[1.1] font-medium">About the price of a cup of chai a day.</h2>
          <p className="mt-[18px] text-[rgba(244,238,226,0.82)]">That&apos;s about ₹17 a day. Stop anytime.</p>
        </div>
        <div className="min-w-0 flex-[0_1_360px] rounded-[28px] bg-card px-7 py-8 text-center text-ink">
          <p className="inline-block rounded-full bg-terracotta-soft px-3.5 py-1.5 text-[15px] font-bold text-terracotta-text">First {TRIAL_DAYS} days free</p>
          <p className="mt-[18px] font-serif text-[64px] leading-none font-medium">{PRICE_PER_MONTH}</p>
          <p className="mt-2 text-muted">per month, per parent</p>
          <StartTrialButton className="mt-[26px] flex min-h-[58px] w-full cursor-pointer items-center justify-center rounded-full bg-green text-[18px] font-semibold text-card hover:bg-green-hover">
            Start {TRIAL_DAYS} day free trial
          </StartTrialButton>
          <p className="mt-3 text-[14px] text-muted">Pay with UPI or card after your trial</p>
        </div>
      </div>
    </section>
  );
}
