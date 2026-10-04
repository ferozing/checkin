"use client";

import { ClockIcon, HeartIcon } from "./icons";
import { useTick } from "./tick";

const usual: [string, boolean][] = [
  ["Khana kha liya?", true],
  ["Haan.", false],
  ["Dawai li?", true],
  ["Haan.", false],
  ["Sab theek?", true],
  ["Haan beta, sab theek.", false],
];
const after: [string, boolean][] = [
  ["Mom! I heard you're in charge of the sweets for the wedding?", true],
  ["Arre, who told you? Listen, I found the best halwai in the whole city. Kaju katli, and his jalebi is something else!", false],
  ["Save some kaju katli for me. I'm coming for Diwali!", true],
  ["Really? When? I'll make your room ready. Wait, let me tell you what Kamla said...", false],
];
const chips = ["The wedding", "Her favourite halwai", "Your Diwali visit", "Kamla aunty's news"];

export function Understand() {
  const { t } = useTick();
  const a = t % 33;
  const msgAt = [2, 6, 10, 14];
  const chipAt = [18, 19, 20, 21];
  const mins = Math.min(22, Math.max(1, Math.round((a - 1) * 1.2)));

  return (
    <section className="bg-green text-[#F4EEE2]">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,32px)] py-[clamp(64px,9vw,112px)]">
        <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#E9B79C]">We understand</p>
        <h2 className="mt-3 max-w-[860px] font-serif text-[clamp(32px,4.2vw,54px)] leading-[1.1] font-medium">You call everyday. And somehow, you both run out of things to say.</h2>
        <div className="mt-[clamp(40px,5vw,56px)] flex flex-wrap items-stretch gap-6">
          <div className="min-w-0 flex-[1_1_340px] rounded-[28px] border border-[rgba(255,253,248,0.14)] bg-[rgba(255,253,248,0.06)] p-7">
            <p className="text-[15px] font-bold text-[rgba(244,238,226,0.75)]">The usual call</p>
            <div className="mt-[18px] flex flex-col gap-2.5 text-[17px]">
              {usual.map(([text, me], i) => (
                <p key={i} className={me ? "self-end rounded-[16px_16px_6px_16px] bg-[rgba(255,253,248,0.12)] px-3.5 py-2" : "self-start rounded-[16px_16px_16px_6px] bg-[rgba(255,253,248,0.07)] px-3.5 py-2"}>{text}</p>
              ))}
            </div>
            <p className="mt-[22px] inline-flex items-center gap-2 text-[15px] font-semibold text-[rgba(244,238,226,0.75)]">
              <ClockIcon size={16} />2 minutes. You hang up still wondering.
            </p>
          </div>

          <div className="min-w-0 flex-[1_1_340px] rounded-[28px] bg-card p-7 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <p className="text-[15px] font-bold text-terracotta-text">The call after reading Sona&apos;s note</p>
            <div className="mt-3.5 -rotate-1 rounded-[14px] bg-terracotta-soft px-3.5 py-2.5">
              <p className="font-hand text-[24px] leading-[1.2] text-[#4A2A1A]">Ask her: the sweets list for Sharma ji&apos;s wedding</p>
            </div>
            <div className="mt-4 flex flex-col gap-2.5 text-[17px]">
              {after.map(([text, me], i) => {
                const shown = a >= msgAt[i];
                return (
                  <p
                    key={i}
                    className={`max-w-[88%] px-3.5 py-2 ${me ? "self-end rounded-[16px_16px_6px_16px] bg-green-soft" : "self-start rounded-[16px_16px_16px_6px] bg-sand"}`}
                    style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(10px)", transition: "opacity 450ms ease, transform 450ms ease" }}
                  >
                    {text}
                  </p>
                );
              })}
            </div>
            <div className="mt-[18px] border-t border-dashed border-[#E3D8C6] pt-4">
              <p className="text-[13px] font-bold tracking-[0.08em] text-muted">ONE NOTE, AND YOU BOTH TALKED ABOUT</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {chips.map((c, i) => {
                  const shown = a >= chipAt[i];
                  return (
                    <span key={c} className="inline-block rounded-full bg-terracotta-soft px-3 py-1.5 text-[14px] font-semibold text-terracotta-text" style={{ opacity: shown ? 1 : 0, transform: shown ? "scale(1)" : "scale(0.8)", transition: "opacity 350ms ease, transform 350ms ease" }}>
                      {c}
                    </span>
                  );
                })}
              </div>
            </div>
            <p className="mt-[22px] inline-flex items-center gap-2 text-[15px] font-bold text-good">
              <HeartIcon size={16} />
              <span>{mins} minutes. They tell you everything.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
