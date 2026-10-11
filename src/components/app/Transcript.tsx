"use client";

import { useState } from "react";

export function Transcript({ lines }: { lines: { who: string; text: string; tr?: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer self-start bg-transparent py-1.5 text-[15px] font-semibold text-ink underline underline-offset-[3px]"
      >
        {open ? "Hide transcript" : "Read the full transcript"}
      </button>
      {open ? (
        <div className="flex flex-col gap-3 rounded-[14px] bg-panel p-4">
          {lines.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-[52px] shrink-0 text-[14px] font-semibold text-muted">{l.who}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px]">{l.text}</span>
                {l.tr ? <span className="text-[13px] text-muted">{l.tr}</span> : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
