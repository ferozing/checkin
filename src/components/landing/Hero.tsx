"use client";

import { ArrowIcon, CheckIcon, ClockIcon, Icon, PhoneIcon } from "./icons";
import { StartTrialButton } from "./invite";
import { ctaBig, wrap } from "./styles";
import { useTick } from "./tick";

const script = [
  { at: 9, sona: true, text: "Hello Mom, Sona here! Khana ho gaya?" },
  { at: 17, sona: false, text: "Haan beta, dal chawal. The whole lane is busy, Sharma ji's daughter is getting married!" },
  { at: 27, sona: true, text: "How lovely! Did you take your BP tablet today?" },
  { at: 34, sona: false, text: "Yes, with chai. Now I'm making the sweets list for the wedding." },
];

const summary = ["Had dal chawal", "BP tablet taken", "Slept well", "Happy, busy"];

function demoState(t: number) {
  const ringing = t < 9;
  const done = t >= 44;
  const talking = !ringing && !done;
  const said = script.filter((l) => t >= l.at);
  const cur = said.length ? said[said.length - 1] : script[0];
  const secs = Math.max(0, Math.min(t, 44) - 9) * 9 + 4;
  const clock = Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0");
  const momColor = "#E9B79C";
  const sonaColor = "#9FD3B4";
  const bars = Array.from({ length: 28 }, (_, i) => {
    const env = Math.sin(((i + 1) / 29) * Math.PI);
    const wobble = Math.abs(Math.sin(i * 1.7 + t * 1.3) * 0.6 + Math.sin(i * 0.6 - t * 0.9) * 0.4);
    return talking ? Math.round(6 + 40 * env * wobble) : ringing ? 4 : 3;
  });
  const p1 = t % 4;
  const p2 = (t + 2) % 4;
  const on = "#1F4D3A";
  const off = "#B9AE9F";
  return {
    ringing,
    talking,
    who: cur.sona ? "SONA" : "MOM",
    caption: cur.text,
    bars,
    wave: cur.sona ? sonaColor : momColor,
    sub: ringing ? "Calling... 8:00 PM, her usual time" : done ? "Call ended · 6 min · Hindi" : "On call · " + clock,
    subColor: talking ? "#9FD3B4" : "rgba(244, 238, 226, 0.75)",
    glow: talking ? (cur.sona ? "rgba(159, 211, 180, 0.35)" : "rgba(233, 183, 156, 0.45)") : "rgba(255, 253, 248, 0.06)",
    ring1: `scale(${1 + p1 * 0.16})`,
    ring1o: ringing ? 0.6 - p1 * 0.15 : 0,
    ring2: `scale(${1 + p2 * 0.16})`,
    ring2o: ringing ? 0.6 - p2 * 0.15 : 0,
    sheet: done ? "translateY(0)" : "translateY(115%)",
    c1: ringing ? on : off,
    c2: talking ? on : off,
    c3: done ? "#B4532A" : off,
  };
}

export function Hero() {
  const { t, replay } = useTick();
  const d = demoState(t);
  return (
    <section id="top" className={`${wrap} flex flex-wrap items-center gap-[clamp(40px,6vw,72px)] pt-[clamp(24px,5vw,56px)] pb-[clamp(64px,9vw,112px)]`}>
      <div className="min-w-0 flex-[1_1_460px]">
        <p className="mb-[22px] inline-flex items-center gap-2.5 rounded-full bg-terracotta-soft px-4 py-2 text-[15px] font-semibold text-terracotta-text">
          <span className="h-2 w-2 rounded-full bg-terracotta" />
          For children who care, even on busy days
        </p>
        <h1 className="font-serif text-[clamp(40px,5.6vw,74px)] leading-[1.03] font-medium tracking-[-0.02em] text-[#1F2A24]">
          A daily call for your parents. <span className="text-green italic">A daily update for you.</span>
        </h1>
        <p className="mt-[26px] max-w-[540px] text-[clamp(18px,1.6vw,21px)] leading-[1.6] text-ink-2">
          Sona calls your Mom or Dad every day. You get a 30 second note on WhatsApp on how they are, and{" "}
          <strong className="text-ink">what to ask them</strong>.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <StartTrialButton className={ctaBig}>
            Start 3 day free trial <ArrowIcon sw={2} />
          </StartTrialButton>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-[22px] gap-y-2.5 text-[15px] font-semibold text-nav">
          <li className="flex items-center gap-2"><span className="flex text-green"><ClockIcon size={18} sw={1.9} /></span>Set up in 2 minutes</li>
          <li className="flex items-center gap-2"><span className="flex text-green"><PhoneIcon size={18} sw={1.9} /></span>First call today</li>
          <li className="flex items-center gap-2"><span className="flex text-green"><CheckIcon size={18} sw={1.9} /></span>Cancel anytime</li>
        </ul>
      </div>

      <div className="flex min-w-0 flex-[1_1_400px] justify-center">
        <div className="relative w-full max-w-[440px]">
          <div aria-hidden="true" className="absolute top-[18px] right-[-10px] bottom-[-14px] left-[18px] rotate-[2.5deg] rounded-[32px] bg-[#F1E6D4]" />
          <div
            aria-label="Live demo of a phone call and summary"
            role="img"
            className="relative flex h-[600px] flex-col items-center overflow-hidden rounded-[36px] bg-[#183D2E] text-[#F4EEE2] shadow-[0_1px_2px_rgba(20,30,20,0.08),0_28px_64px_rgba(24,61,46,0.32)]"
          >
            <div className="flex items-center justify-between gap-3 self-stretch pt-[18px] pr-[18px] pl-[22px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,253,248,0.08)] px-3 py-1.5 text-[13px] font-semibold tracking-[0.02em] text-[rgba(244,238,226,0.78)]">
                <Icon size={14}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M9 7h6M9 11h6M9 15h6" /></Icon>
                To Mom&apos;s basic phone · no app
              </span>
              <button type="button" onClick={replay} aria-label="Replay the demo" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[rgba(255,253,248,0.10)] text-[#F4EEE2]">
                <Icon size={18} sw={1.9}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></Icon>
              </button>
            </div>

            <div className="relative mt-[26px] h-28 w-28">
              <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-[#9FD3B4]" style={{ transform: d.ring1, opacity: d.ring1o, transition: "transform 350ms linear, opacity 350ms linear" }} />
              <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-[#9FD3B4]" style={{ transform: d.ring2, opacity: d.ring2o, transition: "transform 350ms linear, opacity 350ms linear" }} />
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-terracotta-soft font-serif text-[46px] font-semibold text-terracotta-text" style={{ boxShadow: `0 0 0 6px ${d.glow}`, transition: "box-shadow 400ms" }}>M</span>
            </div>
            <p className="mt-[18px] font-serif text-[32px] leading-[1.1] font-medium">Mom</p>
            <p className="mt-1.5 text-[16px] font-semibold tracking-[0.02em] tabular-nums" style={{ color: d.subColor }}>{d.sub}</p>

            <div aria-hidden="true" className="mt-[22px] flex h-12 items-center gap-1">
              {d.bars.map((h, i) => (
                <span key={i} className="w-1 rounded-full" style={{ height: h, background: d.wave, transition: "height 320ms ease-in-out, background 300ms" }} />
              ))}
            </div>

            <div className="mx-[22px] mt-[18px] min-h-[104px] self-stretch text-center">
              {d.ringing ? (
                <p className="font-serif text-[19px] leading-[1.45] text-[rgba(244,238,226,0.82)] italic">Ringing her normal phone, at her usual time.</p>
              ) : null}
              {d.talking ? (
                <>
                  <p className="text-[12px] font-bold tracking-[0.12em]" style={{ color: d.wave }}>{d.who} SPEAKING</p>
                  <p className="mt-1.5 font-serif text-[19px] leading-[1.45] text-card">“{d.caption}”</p>
                </>
              ) : null}
            </div>

            <div aria-hidden="true" className="mt-auto mb-[26px] flex items-center gap-7">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[rgba(255,253,248,0.10)]">
                <Icon size={22} sw={1.7}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v5" /></Icon>
              </span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-dot text-card">
                <PhoneIcon size={26} style={{ transform: "rotate(135deg)" }} />
              </span>
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[rgba(255,253,248,0.10)]">
                <Icon size={22} sw={1.7}><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></Icon>
              </span>
            </div>

            <div className="absolute right-3 bottom-3 left-3 rounded-[26px] bg-card p-5 text-ink shadow-[0_-8px_30px_rgba(60,40,20,0.14)]" style={{ transform: d.sheet, transition: "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
              <div className="flex items-center justify-between gap-2.5">
                <span className="font-serif text-[15px] text-terracotta-text italic">Sent to your WhatsApp · 8:09 PM</span>
                <span className="inline-flex items-center gap-[7px] rounded-full bg-good-bg px-[11px] py-[5px] text-[14px] font-bold text-good">
                  <span className="h-[9px] w-[9px] rounded-full bg-good-dot" />All good
                </span>
              </div>
              <ul className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[15px]">
                {summary.map((s) => (
                  <li key={s} className="flex items-center gap-2"><span className="flex text-good"><CheckIcon size={17} sw={2.2} /></span>{s}</li>
                ))}
              </ul>
              <div className="mt-3.5 rounded-2xl bg-terracotta-soft px-4 py-3.5">
                <p className="text-[12px] font-bold tracking-[0.08em] text-terracotta-text">ASK HER TODAY</p>
                <p className="mt-0.5 font-hand text-[27px] leading-[1.15] text-[#4A2A1A]">“How is the sweets list for the wedding coming along?”</p>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="relative mt-[18px] flex justify-center gap-[18px] text-[14px] font-semibold">
            {[["Sona calls", d.c1], ["They talk", d.c2], ["You get the summary", d.c3]].map(([label, c]) => (
              <span key={label} className="flex items-center gap-1.5" style={{ color: c }}>
                <span className="h-2 w-2 rounded-full" style={{ background: c }} />{label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
