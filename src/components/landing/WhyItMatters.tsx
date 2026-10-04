"use client";

import type { CSSProperties } from "react";
import { useTick } from "./tick";

export function WhyItMatters() {
  const { t } = useTick();
  const ringing = t % 22 < 9;
  const sp = t % 4;
  const sp2 = (sp + 2) % 4;
  const s = {
    sunY: 200 - Math.round(70 * Math.sin((Math.PI * t) / 66)),
    leaf: `rotate(${(Math.sin(t * 0.35) * 3).toFixed(2)}deg)`,
    steam1: `translateY(${-sp * 6}px)`,
    steam1o: 0.9 - sp * 0.22,
    steam2: `translateY(${-sp2 * 6}px)`,
    steam2o: 0.9 - sp2 * 0.22,
    shake: ringing ? (t % 2 ? "rotate(-4deg)" : "rotate(4deg)") : "rotate(0deg)",
    screen: ringing ? "#CFE3D2" : "#7E8E83",
    wave: ringing && t % 2 ? "scale(1.12)" : "scale(0.9)",
    waveO: ringing ? (t % 2 ? 0.95 : 0.35) : 0,
  };
  const keyRows = [
    ["#3E8E5C", "#4A433D", "#C4553A"],
    ["#4A433D", "#4A433D", "#4A433D"],
    ["#4A433D", "#4A433D", "#4A433D"],
    ["#4A433D", "#4A433D", "#4A433D"],
  ];

  return (
    <section aria-label="Why it matters" className="mx-auto max-w-[1240px] px-[clamp(12px,2vw,20px)] pb-[clamp(64px,9vw,112px)]">
      <div className="relative flex flex-wrap items-end gap-x-6 gap-y-2 overflow-hidden rounded-[clamp(24px,3vw,40px)] bg-[#7A5F48] px-[clamp(24px,4vw,56px)] pt-[clamp(28px,4vw,56px)]">
        <div className="min-w-0 flex-[1_1_380px] pb-[clamp(28px,4vw,56px)] text-card">
          <p className="font-serif text-[clamp(36px,5vw,68px)] leading-[1.04] font-medium tracking-[-0.01em]">Your call is the best part of their day.</p>
          <p className="mt-3.5 font-hand text-[clamp(28px,3vw,40px)] leading-[1.1] text-[#F6D9C6]">You&apos;re not careless, just busy. We&apos;re here to help you show you care.</p>
        </div>
        <div aria-hidden="true" className="flex min-w-0 flex-[1_1_380px] justify-center">
          <svg viewBox="0 0 600 420" width="100%" className="block max-w-[600px]">
            <rect x="300" y="20" width="250" height="230" rx="10" fill="#E9B79C" />
            <circle cx="425" cy={s.sunY} r="46" fill="#F9E3CF" style={{ cy: s.sunY, transition: "cy 1200ms ease-in-out" } as CSSProperties} />
            <path d="M300 205h40v-30h30v30h50v-45h40v45h40v-20h50v65H300z" fill="#C98E6E" />
            <rect x="300" y="20" width="250" height="230" rx="10" fill="none" stroke="#5E4636" strokeWidth="12" />
            <path d="M425 20v230M300 135h250" stroke="#5E4636" strokeWidth="8" />
            <rect x="0" y="322" width="600" height="14" fill="#5E4636" />
            <rect x="0" y="336" width="600" height="84" fill="#4A3426" />
            <rect x="62" y="262" width="76" height="64" rx="8" fill="#B4532A" />
            <rect x="56" y="256" width="88" height="14" rx="6" fill="#C4673E" />
            <g style={{ transformOrigin: "100px 256px", transform: s.leaf, transition: "transform 1100ms ease-in-out" }}>
              <ellipse cx="78" cy="214" rx="14" ry="30" fill="#3E8E5C" transform="rotate(-28 78 214)" />
              <ellipse cx="100" cy="200" rx="14" ry="40" fill="#2D6A45" />
              <ellipse cx="122" cy="214" rx="14" ry="30" fill="#3E8E5C" transform="rotate(28 122 214)" />
              <ellipse cx="90" cy="236" rx="10" ry="18" fill="#4E9E6B" transform="rotate(-50 90 236)" />
            </g>
            <g style={{ transform: s.steam1, opacity: s.steam1o, transition: "transform 700ms linear, opacity 700ms linear" }}>
              <path d="M226 236c-10-12 10-20 0-34" stroke="#F4EEE2" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
            <g style={{ transform: s.steam2, opacity: s.steam2o, transition: "transform 700ms linear, opacity 700ms linear" }}>
              <path d="M244 230c-10-12 10-20 0-34" stroke="#F4EEE2" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
            <path d="M206 250h60l-7 76h-46z" fill="rgba(255, 253, 248, 0.22)" stroke="#F4EEE2" strokeWidth="3" />
            <path d="M209 272h54l-4.5 54h-45z" fill="#C08A55" />
            <ellipse cx="236" cy="328" rx="44" ry="7" fill="#3A281D" />
            <g style={{ transformOrigin: "400px 326px", transform: s.shake, transition: "transform 200ms ease-in-out" }}>
              <rect x="362" y="196" width="76" height="130" rx="14" fill="#2F2A26" />
              <rect x="371" y="208" width="58" height="42" rx="5" fill={s.screen} style={{ transition: "fill 300ms" }} />
              <text x="400" y="234" textAnchor="middle" fontFamily="Figtree, sans-serif" fontSize="12" fontWeight="700" fill="#1E2E25">Sona</text>
              {keyRows.map((row, r) =>
                row.map((c, i) => <rect key={`${r}-${i}`} x={372 + i * 21} y={262 + r * 14} width="14" height="8" rx="3" fill={c} />),
              )}
            </g>
            <g style={{ transformOrigin: "400px 250px", transform: s.wave, opacity: s.waveO, transition: "transform 600ms ease-out, opacity 600ms ease-out" }}>
              <path d="M452 210a40 40 0 0 1 0 56M468 196a62 62 0 0 1 0 84" stroke="#F6D9C6" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M348 210a40 40 0 0 0 0 56M332 196a62 62 0 0 0 0 84" stroke="#F6D9C6" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
