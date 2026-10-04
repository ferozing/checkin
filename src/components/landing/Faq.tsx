"use client";

import { useState } from "react";

const qa = [
  ["Will my parent know Sona is an AI?", "Yes. Sona always introduces herself as a voice assistant calling on your behalf. We never pretend she is a person."],
  ["What if they don't pick up?", "Sona tries again twice, 15 minutes apart. If there is still no answer, you get a message so you can check in yourself."],
  ["Which phones and languages work?", "Any phone that takes a normal call, including basic phones and landlines. Sona speaks Hindi, English, Telugu, Tamil, Kannada, Marathi and Bengali."],
  ["Can I choose morning or evening?", "Yes. Most families pick after breakfast or after dinner. You can change the time anytime from your dashboard."],
  ["Who can see what my parent says?", "Only you. Summaries and transcripts live in your account, and you can delete them anytime."],
  ["Do I need to install an app?", "No. Your updates arrive on WhatsApp, and your parent just picks up a normal call. A simple dashboard is there in any browser when you want more detail."],
  ["Does Sona ever ask for money?", "Never. Sona will never ask for money, bank details or an OTP. Tell your parent this on day one."],
];

export function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <section aria-labelledby="faq" className="mx-auto max-w-[860px] px-[clamp(20px,4vw,32px)] pb-[clamp(64px,9vw,112px)]">
      <h2 id="faq" className="font-serif text-[clamp(30px,3.4vw,42px)] leading-[1.15] font-medium">Questions children ask us</h2>
      <div className="mt-7 flex flex-col gap-3">
        {qa.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="rounded-[20px] border border-line bg-card">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-[22px] py-4 text-left text-[18px] font-semibold text-ink"
              >
                {q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 250ms" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              {isOpen ? <p id={`faq-${i}`} className="px-[22px] pb-5 text-[17px] text-ink-2">{a}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
