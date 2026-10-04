"use client";

import { TRIAL_DAYS } from "@/config";
import { ArrowIcon } from "./icons";
import { StartTrialButton } from "./invite";
import { ctaBig } from "./styles";
import { useTick } from "./tick";

const lines = [
  "Dear Riya,",
  "Papa had a lovely day. He finished his morning walk, his knee is better, and he took both tablets. He asked twice if you are coming for Diwali.",
  "Maybe call him tonight?",
  "With love, Sona",
];
const total = lines.reduce((n, l) => n + l.split(" ").length, 0);

function typeLetter(t: number) {
  let budget = Math.floor(t * 2.2);
  const typing = budget < total;
  let caretDone = false;
  return lines.map((l) => {
    const w = l.split(" ");
    const take = Math.max(0, Math.min(w.length, budget));
    budget -= take;
    const isCur = !caretDone && (take < w.length || budget === 0);
    if (isCur) caretDone = true;
    return { text: w.slice(0, take).join(" "), caret: isCur && typing && t % 2 === 1 };
  });
}

export function FinalCta() {
  const { t } = useTick();
  const letter = typeLetter(t);

  return (
    <section className="bg-[#F3EADB] px-[clamp(20px,4vw,32px)] py-[clamp(64px,9vw,112px)]">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <div
          aria-label={lines.join(" ")}
          role="img"
          className="w-full -rotate-1 rounded-md bg-card p-[clamp(28px,4vw,44px)] text-left shadow-[0_2px_4px_rgba(60,40,20,0.06),0_24px_50px_rgba(60,40,20,0.12)]"
          style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 37px, #EFE4D2 38px)" }}
        >
          <div aria-hidden="true" className="font-hand text-[clamp(28px,3vw,34px)] leading-[38px] text-[#2F3B5C]">
            {letter.map((l, i) => (
              <p key={i} className="min-h-[38px]">
                {l.text}
                <span className="ml-[3px] inline-block h-[26px] w-0.5 bg-[#2F3B5C] align-[-4px]" style={{ opacity: l.caret ? 1 : 0 }} />
              </p>
            ))}
          </div>
        </div>
        <h2 className="mt-14 font-serif text-[clamp(32px,4vw,52px)] leading-[1.1] font-medium">You care. Now they&apos;ll feel it, every day.</h2>
        <StartTrialButton className={`mt-8 ${ctaBig} px-8`}>
          Start {TRIAL_DAYS} day free trial <ArrowIcon sw={2} />
        </StartTrialButton>
        <p className="mt-3.5 text-[15px] text-muted">We&apos;re here for you, and for them. Set up in two minutes.</p>
      </div>
    </section>
  );
}
