"use client";

import { eyebrow, h2, wrap } from "./styles";
import { useTick } from "./tick";

const notes = [
  { day: "MONDAY", text: "Papa's tulsi plant is flowering. Ask for a photo.", bg: "#FFF8E8", label: "text-terracotta-text", radius: "rounded-[6px_22px_22px_22px]", r: -2, base: 0, ph: 0 },
  { day: "TUESDAY", text: "Mom's school friend Kamla called after years. Ask what they talked about.", bg: "#EEF4EC", label: "text-good", radius: "rounded-[22px_6px_22px_22px]", r: 1.5, base: 16, ph: 1.6 },
  { day: "THURSDAY", text: "Papa's knee feels better with the warm compress. Tell him you're glad.", bg: "#EEF4EC", label: "text-good", radius: "rounded-[22px_22px_22px_6px]", r: 1, base: 0, ph: 3.1 },
  { day: "SUNDAY", text: "They asked twice if you're coming for Diwali.", bg: "#FFF8E8", label: "text-terracotta-text", radius: "rounded-[22px_22px_6px_22px]", r: -1.5, base: 16, ph: 4.7 },
];

export function TalkAbout() {
  const { t } = useTick();
  return (
    <section className={`${wrap} py-[clamp(64px,9vw,112px)]`}>
      <div className="flex flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_360px]">
          <p className={eyebrow}>What to talk about</p>
          <h2 className={h2}>Sona listens for the little things. You get to bring them up.</h2>
          <p className="mt-[18px] text-ink-2">Every note ends with one or two things to ask.</p>
        </div>
        <div className="grid min-w-0 flex-[1_1_520px] grid-cols-2 gap-[18px]">
          {notes.map((n) => (
            <div
              key={n.day}
              className={`${n.radius} px-[18px] pt-[18px] pb-5 shadow-[0_10px_24px_rgba(60,40,20,0.10)]`}
              style={{ background: n.bg, transform: `rotate(${n.r}deg) translateY(${(n.base + 6 * Math.sin(t * 0.6 + n.ph)).toFixed(1)}px)`, transition: "transform 700ms ease-in-out" }}
            >
              <p className={`text-[12px] font-bold tracking-[0.08em] ${n.label}`}>{n.day}</p>
              <p className="mt-1.5 font-hand text-[25px] leading-[1.15] text-[#3A2A20]">{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
