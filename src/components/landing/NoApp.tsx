"use client";

import { HEART, Icon, PhoneIcon } from "./icons";
import { useTick } from "./tick";

const card = "min-w-0 max-w-[500px] flex-[1_1_320px] rounded-[32px] p-[clamp(26px,3vw,40px)]";

export function NoApp() {
  const { t } = useTick();
  const ringShake = t % 22 < 8 ? (t % 2 ? "rotate(-3deg)" : "rotate(3deg)") : "rotate(0deg)";
  const p = t % 22;
  const show = p >= 3 && p <= 10;
  const open = p >= 11;
  const n = {
    bannerT: show ? "translateY(0)" : open ? "translateY(-12px) scale(0.96)" : "translateY(-140%)",
    bannerO: show ? 1 : 0,
    tapT: p === 9 || p === 10 ? "scale(1.4)" : "scale(0.4)",
    tapO: p === 9 ? 1 : 0,
    chatO: open ? 1 : 0,
    chatT: open ? "translateY(0)" : "translateY(14px)",
  };
  const keys = ["#3E8E5C", "#4A433D", "#C4553A", ...Array(9).fill("#4A433D")];

  return (
    <section aria-labelledby="noapp" className="mb-[clamp(64px,9vw,112px)] border-y border-[#EADFCB] bg-[#F3EADB]">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,32px)] py-[clamp(64px,8vw,96px)]">
        <div className="text-center">
          <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-terracotta">Nothing to download</p>
          <h2 id="noapp" className="mx-auto mt-3 max-w-[820px] font-serif text-[clamp(34px,4.4vw,58px)] leading-[1.06] font-medium">
            No app to install. <span className="text-green italic">Not for them, not for you.</span>
          </h2>
        </div>
        <div className="mt-[clamp(36px,5vw,56px)] flex flex-wrap items-stretch justify-center gap-4">
          <div className={`${card} bg-card shadow-[0_1px_2px_rgba(60,40,20,0.05),0_18px_44px_rgba(60,40,20,0.08)]`}>
            <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-terracotta-soft text-terracotta-text">
              <Icon size={30} sw={1.6}><rect x="6" y="2" width="12" height="20" rx="2.5" /><rect x="8.5" y="4.5" width="7" height="5" rx="1" /><path d="M9 13h.01M12 13h.01M15 13h.01M9 16h.01M12 16h.01M15 16h.01M9 19h.01M12 19h.01M15 19h.01" /></Icon>
            </span>
            <p className="mt-7 text-[13px] font-bold tracking-[0.1em] text-terracotta-text">FOR YOUR PARENT</p>
            <p className="mt-1.5 font-serif text-[clamp(28px,3vw,38px)] leading-[1.1]">A normal phone call.</p>
            <p className="mt-3 text-ink-2">Any phone, even a basic one. No internet needed.</p>
            <div aria-hidden="true" className="mt-7 box-border flex h-[250px] items-end justify-center gap-[18px] overflow-hidden rounded-3xl bg-terracotta-soft px-4 pt-7">
              <div className="box-border h-[260px] w-[150px] shrink-0 rounded-t-[30px] bg-[#2F2A26] px-4 pt-[18px] shadow-[0_-6px_24px_rgba(60,40,20,0.18)]" style={{ transform: ringShake, transformOrigin: "50% 100%", transition: "transform 300ms ease-in-out" }}>
                <div className="flex h-24 flex-col items-center justify-center gap-1 rounded-[10px] bg-[#CFE3D2] font-sans text-[#1E2E25]">
                  <PhoneIcon size={20} sw={1.9} />
                  <span className="text-[13px] leading-[1.1] font-bold">Sona</span>
                  <span className="text-[11px] leading-[1.1]">(from Riya)</span>
                  <span className="text-[11px] leading-[1.1] font-semibold">calling...</span>
                </div>
                <div className="mt-3.5 grid grid-cols-3 gap-x-2.5 gap-y-2">
                  {keys.map((c, i) => <span key={i} className="h-3.5 rounded-md" style={{ background: c }} />)}
                </div>
              </div>
              <div className="flex flex-col gap-2 self-center text-[14px] font-semibold text-terracotta-text">
                {["No app", "No internet", "Just pick up"].map((x) => (
                  <span key={x} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-terracotta" />{x}</span>
                ))}
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center self-center rounded-full bg-green text-card shadow-[0_8px_20px_rgba(31,77,58,0.25)]">
            <Icon size={24}><path d={HEART} /></Icon>
          </div>

          <div className={`${card} bg-green text-[#F4EEE2] shadow-[0_18px_44px_rgba(31,77,58,0.25)]`}>
            <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[rgba(255,253,248,0.12)]">
              <Icon size={30} sw={1.6}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></Icon>
            </span>
            <p className="mt-7 text-[13px] font-bold tracking-[0.1em] text-[#E9B79C]">FOR YOU</p>
            <p className="mt-1.5 font-serif text-[clamp(28px,3vw,38px)] leading-[1.1]">A message on WhatsApp.</p>
            <p className="mt-3 text-[rgba(244,238,226,0.82)]">Just add Sona&apos;s number. Updates land where you already chat.</p>
            <div aria-label="A WhatsApp update from Sona arriving" role="img" className="relative mt-[22px] h-[236px] overflow-hidden rounded-[22px] bg-[#EFE8DC] text-[#1E1E1E]">
              <div className="absolute inset-0 flex flex-col" style={{ opacity: n.chatO, transform: n.chatT, transition: "opacity 450ms ease, transform 450ms ease" }}>
                <div className="flex items-center gap-2.5 border-b border-[#E2DACB] bg-white px-3.5 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green text-cream"><Icon size={16} sw={1.9}><path d={HEART} /></Icon></span>
                  <span className="text-[14px] font-bold">Sona · Parent Check In</span>
                </div>
                <div className="px-3.5 py-3">
                  <div className="max-w-[290px] rounded-[6px_16px_16px_16px] bg-white px-3 py-2.5 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
                    <p className="text-[13px] text-[#5D6670]">Papa&apos;s morning call · 6 min</p>
                    <p className="mt-[3px] flex items-center gap-1.5 text-[15px] font-bold text-good"><span className="h-2 w-2 rounded-full bg-good-dot" />All good</p>
                    <p className="mt-[3px] text-[14px] leading-[1.4]">Had poha, BP tablet taken, cheerful.</p>
                    <p className="mt-1.5 rounded-lg bg-terracotta-soft px-2 py-1.5 text-[14px] leading-[1.35]"><strong>Ask him:</strong> How was the morning walk?</p>
                    <p className="mt-[3px] text-right text-[11px] text-[#7A848D]">9:42 AM</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-2.5 right-2.5 left-2.5 flex items-start gap-3 rounded-[18px] bg-[rgba(255,255,255,0.97)] px-3.5 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.22)]" style={{ transform: n.bannerT, opacity: n.bannerO, transition: "transform 500ms cubic-bezier(0.2, 0.9, 0.3, 1.15), opacity 350ms ease" }}>
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-green text-cream"><Icon size={18} sw={1.9}><path d={HEART} /></Icon></span>
                <div className="min-w-0 flex-1">
                  <p className="flex justify-between gap-2 text-[13px] text-[#5D6670]"><span className="font-bold text-[#1E1E1E]">Sona · Parent Check In</span><span>now</span></p>
                  <p className="mt-0.5 text-[14px] leading-[1.35]">Papa&apos;s update is here. All good today. Tap to see what to ask him.</p>
                </div>
                <span aria-hidden="true" className="absolute top-1/2 left-1/2 -mt-[22px] -ml-[22px] h-11 w-11 rounded-full bg-[rgba(31,77,58,0.25)]" style={{ transform: n.tapT, opacity: n.tapO, transition: "transform 300ms ease, opacity 300ms ease" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
