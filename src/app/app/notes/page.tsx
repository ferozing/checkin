import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card, PageTitle } from "@/components/app/Shell";
import {
  getAlerts, getSummaries, statusLabel, statusTile, type Status,
} from "@/lib/data";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "All notes" };

export default async function Notes() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const [profile, summaries, alerts] = await Promise.all([
    getProfile(), getSummaries(parent.id, 60), getAlerts(parent.id),
  ]);

  const callName = parent.call_name || parent.name;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleDateString("en-IN", { month: "long" });

  // One note per day of this month, keyed by day number.
  const byDay = new Map<number, { id: string; status: Status }>();
  for (const s of summaries) {
    const d = new Date(s.created_at);
    if (d.getFullYear() === year && d.getMonth() === month) {
      if (!byDay.has(d.getDate())) byDay.set(d.getDate(), { id: s.id, status: s.status });
    }
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday first, as in the design.
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const counts = {
    answered: summaries.filter((s) => s.status !== "missed").length,
    good: summaries.filter((s) => s.status === "good").length,
    alerts: alerts.length,
  };
  const medsTaken = summaries.flatMap((s) => s.medicines ?? []);
  const medsPct = medsTaken.length
    ? Math.round((medsTaken.filter((m) => m.taken).length / medsTaken.length) * 100)
    : null;

  const stat = (label: string, value: string) => (
    <Card key={label} className="flex flex-col gap-1 !rounded-2xl !p-4">
      <span className="text-[13px] text-muted">{label}</span>
      <span className="font-serif text-[32px]">{value}</span>
    </Card>
  );

  return (
    <AppShell parent={parent} userName={profile?.name ?? ""} active="/app/notes" alerts={alerts.filter((a) => !a.handled_at).length}>
      <div className="flex flex-col gap-[22px]">
        <PageTitle>{callName}&apos;s month</PageTitle>

        {summaries.length === 0 ? (
          <Card>
            <p className="text-[16px] leading-[1.55] text-body">
              No notes yet. They start appearing here after {callName}&apos;s first call.
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
              {stat("Calls answered", `${counts.answered} of ${summaries.length}`)}
              {stat("Medicines taken", medsPct === null ? "-" : `${medsPct}%`)}
              {stat("Good days", String(counts.good))}
              {stat("Alerts", String(counts.alerts))}
            </div>

            <Card className="flex flex-col gap-3">
              <span className="font-semibold">{monthName}</span>
              <div className="grid grid-cols-7 gap-1.5 text-center text-[12px] text-muted">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {cells.map((d, i) => {
                  if (d === null) return <span key={`x${i}`} />;
                  const hit = byDay.get(d);
                  const base = "flex aspect-square items-center justify-center rounded-[10px] text-[13px] font-semibold";
                  if (!hit) {
                    return <span key={d} className={`${base} bg-panel text-[#B8AC9C]`}>{d}</span>;
                  }
                  return (
                    <Link key={d} href={`/app/day/${hit.id}`} className={`${base} ${statusTile[hit.status]} text-ink no-underline`}>
                      {d}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3.5 text-[13px] text-body">
                {(["good", "amber", "red", "missed"] as Status[]).map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-[3px] ${statusTile[s]}`} />
                    {statusLabel[s].replace(" today", "")}
                  </span>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
}
