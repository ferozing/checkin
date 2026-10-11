"use client";

import { useState } from "react";
import { CardChoice, Chip, Field, SubmitButton, field } from "@/components/app/form";
import { StepNav } from "@/components/app/OnboardingShell";
import { saveCall } from "@/lib/onboarding";
import type { Parent } from "@/lib/session";

const SLOTS = [
  { key: "morning", label: "Morning", sub: "After breakfast", times: ["08:30", "09:00", "09:30", "10:00"] },
  { key: "evening", label: "Evening", sub: "Before dinner", times: ["17:30", "18:00", "18:30", "19:00"] },
] as const;

const WATCH = ["Knee pain", "Sleep", "BP", "Sugar", "Feeling lonely", "Breathing"];

/** "09:00" to "9:00 am", the way the design shows it. */
const pretty = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${suffix}`;
};

type Medicine = { name: string; when: string };

export function StepCall({ parent }: { parent: Parent }) {
  const startSlot = parent.call_slot === "evening" ? SLOTS[1] : SLOTS[0];
  const [slot, setSlot] = useState<(typeof SLOTS)[number]>(startSlot);
  const [time, setTime] = useState((parent.call_time ?? "09:00").slice(0, 5));
  const [meds, setMeds] = useState<Medicine[]>(
    parent.medicines?.length ? parent.medicines : [{ name: "", when: "" }],
  );
  const [watching, setWatching] = useState<string[]>(parent.watch_for ?? ["Knee pain", "Sleep"]);

  const pickSlot = (s: (typeof SLOTS)[number]) => {
    setSlot(s);
    setTime(s.times[1]);
  };

  const setMed = (i: number, patch: Partial<Medicine>) =>
    setMeds((list) => list.map((m, j) => (j === i ? { ...m, ...patch } : m)));

  const toggleWatch = (w: string) =>
    setWatching((list) => (list.includes(w) ? list.filter((x) => x !== w) : [...list, w]));

  return (
    <form action={saveCall} className="flex flex-col gap-6">
      <Field label="When should Sona call?">
        <div className="grid grid-cols-2 gap-2">
          {SLOTS.map((s) => (
            <CardChoice key={s.key} label={s.label} sub={s.sub} on={slot.key === s.key} onClick={() => pickSlot(s)} />
          ))}
        </div>
        <input type="hidden" name="call_slot" value={slot.key} />
        <div className="mt-2 flex flex-wrap gap-2">
          {slot.times.map((t) => (
            <Chip key={t} label={pretty(t)} on={time === t} onClick={() => setTime(t)} />
          ))}
        </div>
        <input type="hidden" name="call_time" value={time} />
      </Field>

      <Field label="Medicines Sona should ask about">
        <div className="flex flex-col gap-2">
          {meds.map((m, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-line p-3 sm:flex-row">
              <input
                aria-label={`Medicine ${i + 1} name`}
                value={m.name}
                onChange={(e) => setMed(i, { name: e.target.value })}
                placeholder="BP tablet"
                className={field}
              />
              <input
                aria-label={`Medicine ${i + 1} timing`}
                value={m.when}
                onChange={(e) => setMed(i, { when: e.target.value })}
                placeholder="Every morning, after breakfast"
                className={field}
              />
              {/* One field per medicine, so the action can read them all. */}
              <input type="hidden" name="medicine" value={m.name.trim() ? `${m.name}|${m.when}` : ""} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setMeds((l) => [...l, { name: "", when: "" }])}
          className="mt-1 inline-flex min-h-11 cursor-pointer items-center self-start rounded-xl border-[1.5px] border-dashed border-[#C9BBA6] px-4 text-[15px] font-semibold text-ink"
        >
          + Add medicine
        </button>
      </Field>

      <Field label="Keep an eye on">
        <div className="flex flex-wrap gap-2">
          {WATCH.map((w) => (
            <Chip key={w} label={w} on={watching.includes(w)} onClick={() => toggleWatch(w)} />
          ))}
        </div>
        {watching.map((w) => (
          <input key={w} type="hidden" name="watch_for" value={w} />
        ))}
      </Field>

      <Field
        id="topics"
        label={`Things ${parent.call_name || parent.name} loves to talk about`}
        hint="This makes the first call feel familiar, not like a survey."
      >
        <input
          id="topics"
          name="topics"
          defaultValue={parent.topics ?? ""}
          placeholder="Her garden, cooking, the grandkids, old Telugu songs"
          className={field}
        />
      </Field>

      <StepNav back="/onboarding/parent">
        <SubmitButton>Continue</SubmitButton>
      </StepNav>
    </form>
  );
}
