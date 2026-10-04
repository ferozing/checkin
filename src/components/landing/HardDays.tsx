"use client";

import { HEART, Icon, PhoneIcon } from "./icons";
import { StartTrialButton } from "./invite";
import { eyebrow, h2, wrap } from "./styles";
import { useTick } from "./tick";

const points = [
  { label: "Works on any phone", icon: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></> },
  { label: "No app for anyone", icon: <path d={HEART} /> },
  { label: "Never asks for money or OTP", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { label: "Stop anytime", icon: <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></> },
];

export function HardDays() {
  const { t } = useTick();
  const pulse = t % 2 ? "9px" : "3px";
  return (
    <section className={`${wrap} py-[clamp(64px,9vw,112px)]`}>
      <div className="flex flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_380px]">
          <p className={eyebrow}>On the hard days</p>
          <h2 className={h2}>Most days it&apos;s good news. When it isn&apos;t, you know in minutes.</h2>
          <p className="mt-[18px] text-ink-2">Sona asks them to rest and messages you right away.</p>
          <ul className="mt-7 grid grid-cols-2 gap-4">
            {points.map((p) => (
              <li key={p.label} className="flex items-center gap-3 text-[16px] font-semibold">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-green-soft text-green"><Icon sw={1.7}>{p.icon}</Icon></span>
                {p.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-w-0 flex-[1_1_420px] justify-center">
          <article className="w-full max-w-[440px] overflow-hidden rounded-[28px] bg-card shadow-[0_1px_2px_rgba(60,40,20,0.05),0_24px_60px_rgba(60,40,20,0.12)]">
            <div className="flex items-center gap-3 bg-red-bg px-[22px] py-4">
              <span className="h-3.5 w-3.5 rounded-full bg-red-dot" style={{ boxShadow: `0 0 0 ${pulse} rgba(196, 85, 58, 0.25)`, transition: "box-shadow 350ms ease-out" }} />
              <span className="font-serif text-[23px] font-semibold text-red">Please call now</span>
            </div>
            <div className="p-[22px]">
              <p className="text-[15px] text-muted">Papa · Today · 8:03 PM</p>
              <p className="mt-2 font-serif text-[21px] leading-[1.35]">Mentioned chest discomfort since the afternoon. Sona asked him to sit and rest.</p>
              <StartTrialButton className="mt-5 flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-red text-[18px] font-bold text-card">
                <PhoneIcon sw={1.9} />Call Papa now
              </StartTrialButton>
              <p className="mt-3 text-center text-[14px] text-muted">Sent within minutes of the call ending</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
