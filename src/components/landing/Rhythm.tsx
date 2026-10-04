"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { eyebrow, h2, wrap } from "./styles";

const slots = {
  morning: {
    time: "9:30 AM",
    label: "Morning, after breakfast",
    opener: "Good morning Papa! Nashta ho gaya? Did you sleep well last night?",
    checks: ["How they slept", "Morning tablets after breakfast", "Plans for the day", "Any pain or worry"],
    bg: "#FFF1D6",
    fg: "#3A2A20",
    chip: "rgba(255, 253, 248, 0.75)",
  },
  evening: {
    time: "8:00 PM",
    label: "Evening, after dinner",
    opener: "Hello Mom! How was your day? Dinner ho gaya?",
    checks: ["What they ate today", "Evening tablets", "How the day went", "Anything on their mind"],
    bg: "#1F4D3A",
    fg: "#F4EEE2",
    chip: "rgba(255, 253, 248, 0.10)",
  },
};

export function Rhythm() {
  const [slot, setSlot] = useState<"morning" | "evening">("morning");
  const s = slots[slot];
  const pill = (active: boolean) =>
    `flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full px-[22px] text-[17px] font-semibold transition-colors duration-300 ${active ? "bg-card text-green" : "bg-transparent text-muted"}`;
  return (
    <section className={`${wrap} py-[clamp(64px,9vw,112px)]`}>
      <div className="flex flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_360px]">
          <p className={eyebrow}>Their rhythm, not ours</p>
          <h2 className={h2}>Morning after breakfast, or evening after dinner.</h2>
          <p className="mt-[18px] text-ink-2">Sona changes what she asks to match.</p>
          <div role="group" aria-label="Call time" className="mt-7 inline-flex gap-1 rounded-full bg-[#F0E7D7] p-1.5">
            <button type="button" aria-pressed={slot === "morning"} onClick={() => setSlot("morning")} className={pill(slot === "morning")}>
              <Icon><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></Icon>
              Morning
            </button>
            <button type="button" aria-pressed={slot === "evening"} onClick={() => setSlot("evening")} className={pill(slot === "evening")}>
              <Icon><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></Icon>
              Evening
            </button>
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_480px]">
          <div className="rounded-[32px] p-[clamp(24px,3vw,36px)] shadow-[0_24px_60px_rgba(60,40,20,0.12)]" style={{ background: s.bg, color: s.fg, transition: "background 500ms, color 500ms" }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-serif text-[clamp(44px,5vw,64px)] leading-none">{s.time}</p>
              <p className="text-[16px] font-semibold opacity-85">{s.label}</p>
            </div>
            <p className="mt-[22px] font-serif text-[22px] leading-[1.4] italic">“{s.opener}”</p>
            <p className="mt-6 mb-2.5 text-[13px] font-bold tracking-[0.1em] opacity-75">SONA GENTLY CHECKS</p>
            <ul className="grid grid-cols-2 gap-2.5">
              {s.checks.map((c) => (
                <li key={c} className="flex items-center gap-2.5 rounded-[14px] px-3.5 py-3 text-[16px] font-medium" style={{ background: s.chip }}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
