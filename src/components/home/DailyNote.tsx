import { WaAvatar, h2, pad, wrap } from "./ui";

const rows = [
  {
    title: "How they really are",
    body: "Not just “I’m fine”. Mood, sleep, food, and anything that sounded off.",
  },
  {
    title: "Medicines, checked gently",
    body: "Only the ones you add. If one is missed, you’ll know that day.",
  },
  {
    title: "One thing to ask them",
    body: "Taken from what they actually said, so your call starts with something real.",
  },
  {
    title: "An alert only when it matters",
    body: "If they mention chest pain, a fall or feeling very unwell, you get a message the moment the call ends. If they don’t pick up after three tries, you hear that too.",
  },
];

const stamp = "self-center rounded-[7px] bg-white px-2.5 py-1 text-[11.5px] text-[#54656F]";
const incoming =
  "flex max-w-[88%] flex-col gap-[3px] self-start rounded-[0_9px_9px_9px] bg-white px-2.5 pt-2 pb-1";
const time = "self-end text-[11px] text-wa-meta";

function Dot({ className }: { className: string }) {
  return <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${className}`} />;
}

export function DailyNote() {
  return (
    <section id="note" className={`${pad} py-[clamp(72px,9vw,128px)]`}>
      <div className={`${wrap} flex flex-wrap items-center gap-[clamp(36px,6vw,96px)]`}>
        <div className="flex min-w-0 flex-[1_1_380px] justify-center">
          {/* A real WhatsApp thread, in WhatsApp's own colours. */}
          <div className="w-[360px] max-w-full rounded-[34px] bg-ink p-[9px] shadow-[0_30px_60px_rgba(25,23,20,0.16)]">
            <div className="flex h-[640px] flex-col overflow-hidden rounded-[26px] bg-wa-chat">
              <div className="flex items-center gap-2.5 bg-wa-header px-3.5 pt-8 pb-3 text-white">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M11 3L5 9l6 6" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <WaAvatar />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold">Checkin</span>
                  <span className="text-[12px] opacity-85">Business account</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-end gap-2 px-2.5 py-3 text-[13.5px] leading-[1.45] text-wa-ink">
                <span className={stamp}>TUESDAY</span>
                <div className={incoming}>
                  <span className="flex items-start gap-1.5">
                    <Dot className="mt-1 bg-good-dot" />
                    <span><strong>All good.</strong> Walked with Lakshmi aunty, all tablets taken.</span>
                  </span>
                  <span><strong>Ask her:</strong> did aunty&apos;s grandson get his results?</span>
                  <span className={time}>9:07 am</span>
                </div>

                <span className={stamp}>WEDNESDAY</span>
                <div className={incoming}>
                  <span className="flex items-start gap-1.5">
                    <Dot className="mt-1 bg-amber-dot" />
                    <span>
                      <strong>Worth a call today.</strong> Knee is hurting again and she skipped last
                      night&apos;s BP tablet.
                    </span>
                  </span>
                  <span><strong>Ask her:</strong> about the knee, and gently remind her about the tablet.</span>
                  <span className={time}>9:09 am</span>
                </div>

                <div className="flex max-w-[70%] flex-col gap-[3px] self-end rounded-[9px_0_9px_9px] bg-wa-sent px-2.5 pt-2 pb-1">
                  <span>Called her. Doctor visit on Friday</span>
                  <span className={time}>1:22 pm</span>
                </div>

                <span className={stamp}>TODAY</span>
                <div className={incoming}>
                  <span className="flex items-start gap-1.5">
                    <Dot className="mt-1 bg-good-dot" />
                    <span>
                      <strong>All good.</strong> Knee is better after the warm oil. Tablets taken,
                      slept well.
                    </span>
                  </span>
                  <span><strong>Ask her tonight:</strong> did the tomato plants finally flower?</span>
                  <span className={time}>9:08 am</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 pt-2 pb-3.5">
                <span className="flex-1 rounded-[22px] bg-white px-3.5 py-2.5 text-[14px] text-[#8696A0]">Message</span>
                <span className="h-10 w-10 rounded-full bg-[#00A884]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-7">
          <h2 className={h2}>
            One short message a day. <em className="text-primary">Right where you already are.</em>
          </h2>
          <div className="flex flex-col border-t border-line">
            {rows.map((r) => (
              <div key={r.title} className="flex flex-col gap-1 border-b border-line py-[18px]">
                <span className="text-[17px] font-semibold">{r.title}</span>
                <span className="text-[16px] leading-[1.55] text-body">{r.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
