"use client";

import { useState } from "react";
import { eyebrow, wrap } from "./styles";
import { useTick } from "./tick";

const C = {
  good: { status: "All good", dot: "#3E8E5C", fg: "#2D6A45" },
  amber: { status: "Worth a call today", dot: "#D69A2D", fg: "#85560A" },
  missed: { status: "Didn't pick up", dot: "#A0866B", fg: "#6B5440" },
} as const;

const days: { short: string; day: string; k: keyof typeof C; note: string; ask: string }[] = [
  { short: "Mon", day: "Papa · Monday", k: "good", note: "Busy with Diwali cleaning. Found your old school report card.", ask: "What did the report card say?" },
  { short: "Tue", day: "Papa · Tuesday", k: "good", note: "His old colleague Ramesh called after many years. Very happy.", ask: "How is Ramesh uncle?" },
  { short: "Wed", day: "Papa · Wednesday", k: "amber", note: "Forgot his evening tablet. Sounded a little tired after the market.", ask: "Did you get some rest today?" },
  { short: "Thu", day: "Papa · Thursday", k: "good", note: "Knee much better with the warm compress. Walked to the park.", ask: "Tell him you're glad the knee is better." },
  { short: "Fri", day: "Papa · Friday", k: "missed", note: "Was at a neighbour's place. Sona tried again at 8:45 PM and they chatted.", ask: "Did you enjoy the evening at the neighbour's?" },
  { short: "Sat", day: "Papa · Saturday", k: "good", note: "Made dal chawal and watched an old film with Mom.", ask: "Which film did you watch?" },
  { short: "Sun", day: "Papa · Sunday", k: "good", note: "Asked twice if you are coming home for Diwali.", ask: "Tell him your travel dates." },
];

const legend = [
  ["All good", "#3E8E5C"],
  ["Worth a call today", "#D69A2D"],
  ["Please call now", "#C4553A"],
  ["Didn't pick up", "#A0866B"],
];

export function Week() {
  const { n } = useTick();
  const [picked, setPicked] = useState<number | null>(null);
  const auto = picked === null;
  const day = auto ? Math.floor((n + 1) / 7) % 7 : picked;
  const sd = days[day];
  const sc = C[sd.k];

  return (
    <section className="border-y border-[#EFE6D6] bg-card">
      <div className={`${wrap} py-[clamp(64px,9vw,104px)]`}>
        <p className={eyebrow}>Your week at a glance</p>
        <h2 className="mt-3 max-w-[720px] font-serif text-[clamp(32px,3.8vw,48px)] leading-[1.1] font-medium">Seven calls. Seven little windows into home.</h2>
        <p className="mt-3.5 text-ink-2">{auto ? "Playing the week. Tap any day to stop." : "Tap a day."}</p>
        <div className="mt-8 grid grid-cols-7 gap-[clamp(6px,1.2vw,14px)]">
          {days.map((d, i) => {
            const s = day === i;
            return (
              <button
                key={d.short}
                type="button"
                aria-pressed={s}
                onClick={() => setPicked(i)}
                className="flex min-h-[92px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border-2 px-0.5 py-2 transition-colors duration-[250ms]"
                style={{ borderColor: s ? "#1F4D3A" : "#ECE3D3", background: s ? "#FBF6EC" : "#FFFDF8" }}
              >
                <span className="text-[14px] font-bold text-nav">{d.short}</span>
                <span className="h-[18px] w-[18px] rounded-full" style={{ background: C[d.k].dot }} />
              </button>
            );
          })}
        </div>
        <div className="mt-[18px] flex flex-wrap items-start gap-x-8 gap-y-4 rounded-3xl bg-cream p-[clamp(20px,3vw,28px)]">
          <div className="min-w-0 flex-[1_1_280px]">
            <p className="flex items-center gap-2.5 font-bold" style={{ color: sc.fg }}>
              <span className="h-3 w-3 rounded-full" style={{ background: sc.dot }} />
              {sd.day} · {sc.status}
            </p>
            <p className="mt-2 font-serif text-[23px] leading-[1.35]">{sd.note}</p>
          </div>
          <div className="min-w-0 flex-[1_1_260px] rounded-[18px] bg-terracotta-soft px-[18px] py-4">
            <p className="text-[12px] font-bold tracking-[0.08em] text-terracotta-text">ASK THEM</p>
            <p className="mt-1 font-hand text-[26px] leading-[1.15] text-[#4A2A1A]">{sd.ask}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-[22px] gap-y-2.5 text-[15px] text-ink-2">
          {legend.map(([label, c]) => (
            <span key={label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
