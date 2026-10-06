"use client";

import { useState } from "react";
import { field, hint, label, primary } from "@/components/onboarding/Shell";
import { saveParent } from "@/lib/onboarding";

const RELATIONS = ["Ammi", "Papa", "Amma", "Mummy", "Nanaji"];
const LANGUAGES = ["Hindi", "English", "Telugu", "Tamil", "Kannada", "Marathi", "Bengali"];
const SLOTS = [
  { key: "morning", label: "Morning", time: "9:30 AM", hint: "After breakfast", value: "09:30" },
  { key: "evening", label: "Evening", time: "8:00 PM", hint: "After dinner", value: "20:00" },
] as const;

export type ParentValues = {
  name: string;
  call_name: string;
  phone: string;
  language: string;
  call_slot: "morning" | "evening";
  call_time: string;
  medicines: string;
  watch_for: string;
};

const chip = (on: boolean) =>
  `cursor-pointer rounded-full border-[1.5px] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
    on ? "border-green bg-green text-card" : "border-line-strong bg-card text-ink hover:bg-sand"
  }`;

export function ParentForm({ parent }: { parent: ParentValues | null }) {
  const [callName, setCallName] = useState(parent?.call_name ?? "Ammi");
  const [language, setLanguage] = useState(parent?.language ?? "Hindi");
  const [slot, setSlot] = useState<"morning" | "evening">(parent?.call_slot ?? "morning");
  const [time, setTime] = useState(parent?.call_time ?? "09:30");

  const pickSlot = (s: (typeof SLOTS)[number]) => {
    setSlot(s.key);
    setTime(s.value);
  };

  return (
    <form action={saveParent} className="mt-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={label}>Their name</label>
        <input id="name" name="name" required defaultValue={parent?.name ?? ""} className={field} />
      </div>

      <div className="flex flex-col gap-2">
        <span className={label}>What do you call them?</span>
        <div className="flex flex-wrap gap-2">
          {RELATIONS.map((r) => (
            <button key={r} type="button" onClick={() => setCallName(r)} className={chip(callName === r)} aria-pressed={callName === r}>
              {r}
            </button>
          ))}
        </div>
        <input
          aria-label="What you call them"
          name="call_name"
          value={callName}
          onChange={(e) => setCallName(e.target.value)}
          className={`${field} mt-1`}
        />
        <p className={hint}>Sona will use this name on every call, just like you do.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={label}>Their phone number</label>
        <div className="flex items-center gap-2">
          <span className="flex h-[52px] items-center rounded-[14px] border-[1.5px] border-line-strong bg-sand px-4 text-[17px] text-ink-2">+91</span>
          <input id="phone" name="phone" required inputMode="tel" defaultValue={parent?.phone ?? ""} className={field} />
        </div>
        <p className={hint}>A basic phone or landline works fine.</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className={label}>Language they speak</span>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button key={l} type="button" onClick={() => setLanguage(l)} className={chip(language === l)} aria-pressed={language === l}>
              {l}
            </button>
          ))}
        </div>
        <input type="hidden" name="language" value={language} />
      </div>

      <div className="flex flex-col gap-2">
        <span className={label}>When should Sona call?</span>
        <div className="flex flex-wrap gap-2">
          {SLOTS.map((s) => (
            <button key={s.key} type="button" onClick={() => pickSlot(s)} className={`${chip(slot === s.key)} flex flex-col items-start`} aria-pressed={slot === s.key}>
              <span>{s.label} · {s.time}</span>
              <span className="text-[13px] font-normal opacity-80">{s.hint}</span>
            </button>
          ))}
        </div>
        <input type="hidden" name="call_slot" value={slot} />
        <label htmlFor="call_time" className={`${label} mt-2`}>Exact time</label>
        <input id="call_time" name="call_time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className={field} />
        <p className={hint}>Pick when they&apos;re relaxed and near the phone. Sona changes her questions to match.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="medicines" className={label}>
          Medicines and timing <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="medicines" name="medicines" defaultValue={parent?.medicines ?? ""} placeholder="BP tablet in the morning, evening tablet after dinner" className={field} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="watch_for" className={label}>
          Anything Sona should check on? <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="watch_for" name="watch_for" defaultValue={parent?.watch_for ?? ""} className={field} />
      </div>

      <button type="submit" className={primary}>Continue</button>
    </form>
  );
}
