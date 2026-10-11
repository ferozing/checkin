import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell, PageTitle } from "@/components/app/Shell";
import { handleAlert } from "@/lib/account";
import { clockTime, day, getAlerts, getSummaries, statusDot } from "@/lib/data";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Alerts" };

const levelCopy = {
  red: { label: "Please call now", pill: "bg-red text-white", card: "bg-red-bg", ink: "text-[#6E3424]", head: "text-[#5A2112]" },
  amber: { label: "Worth a call today", pill: "bg-amber-bg text-amber", card: "bg-amber-bg", ink: "text-amber", head: "text-amber" },
  missed: { label: "Didn't pick up", pill: "bg-missed-bg text-missed", card: "bg-missed-bg", ink: "text-missed", head: "text-missed" },
} as const;

export default async function Alerts() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const [profile, alerts, summaries] = await Promise.all([
    getProfile(), getAlerts(parent.id), getSummaries(parent.id, 60),
  ]);

  const callName = parent.call_name || parent.name;
  const byId = new Map(summaries.map((s) => [s.id, s]));
  const open = alerts.filter((a) => !a.handled_at);
  const earlier = alerts.filter((a) => a.handled_at);

  return (
    <AppShell parent={parent} userName={profile?.name ?? ""} active="/app/alerts" alerts={open.length}>
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <PageTitle>Alerts</PageTitle>

        {open.length === 0 ? (
          <div className="rounded-[20px] bg-good-bg px-5 py-[18px] text-[15px] text-good">
            Nothing needs you right now. We&apos;ll message you the moment something does.
          </div>
        ) : null}

        {open.map((a) => {
          const c = levelCopy[a.level];
          const s = a.summary_id ? byId.get(a.summary_id) : null;
          return (
            <div key={a.id} className={`flex flex-col gap-3 rounded-[20px] p-[22px] ${c.card}`}>
              <div className="flex flex-wrap justify-between gap-2">
                <span className={`rounded-full px-[11px] py-1.5 text-[13px] font-bold ${c.pill}`}>{c.label}</span>
                <span className={`text-[13px] ${c.ink}`}>{day(a.created_at)}, {clockTime(a.created_at)}</span>
              </div>
              <span className={`font-serif text-[24px] leading-[1.3] ${c.head}`}>
                {s?.headline ?? `${callName} needs a call.`}
              </span>
              {s?.ask_today ? (
                <span className={`text-[15px] leading-[1.55] ${c.ink}`}>{s.ask_today}</span>
              ) : null}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`tel:+91${parent.phone}`}
                  className="inline-flex min-h-11 items-center rounded-xl bg-red px-4 text-[15px] font-semibold text-white no-underline"
                >
                  Call {callName} now
                </a>
                <form action={handleAlert}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-white px-4 text-[15px] font-semibold text-ink">
                    I&apos;ve spoken to {callName}
                  </button>
                </form>
              </div>
              {a.level === "red" ? (
                <span className={`text-[13px] ${c.ink}`}>In an emergency, call 112.</span>
              ) : null}
            </div>
          );
        })}

        {earlier.length ? (
          <>
            <span className="mt-1.5 font-semibold">Earlier</span>
            <div className="flex flex-col border-t border-line">
              {earlier.map((a) => {
                const s = a.summary_id ? byId.get(a.summary_id) : null;
                return (
                  <div key={a.id} className="flex gap-3.5 border-b border-line py-4">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${statusDot[a.level]}`} />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold">{levelCopy[a.level].label}, {day(a.created_at)}</span>
                      <span className="text-[14px] text-muted">{s?.headline ?? "Handled."}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
