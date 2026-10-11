import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card, PageTitle } from "@/components/app/Shell";
import { COMPANY, PRICE_PER_MONTH } from "@/config";
import {
  clockTime, daysLeft, getAlerts, getSubscription, getSummaries,
  prettyTime, shortDay, statusDot, statusLabel, statusPill,
} from "@/lib/data";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Today" };

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default async function Today() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const [profile, summaries, alerts, sub] = await Promise.all([
    getProfile(), getSummaries(parent.id, 14), getAlerts(parent.id), getSubscription(parent.id),
  ]);

  const callName = parent.call_name || parent.name;
  const open = alerts.filter((a) => !a.handled_at);
  const latest = summaries[0] ?? null;
  const week = summaries.slice(0, 7).reverse();
  const left = daysLeft(sub?.trial_ends_at ?? null);
  const nextCall = parent.paused
    ? "Paused"
    : `Tomorrow, ${prettyTime((parent.call_time ?? "09:00").slice(0, 5))}`;

  return (
    <AppShell parent={parent} userName={profile?.name ?? ""} active="/app" alerts={open.length}>
      <div className="flex flex-col gap-[22px]">
        <div className="flex flex-wrap items-end justify-between gap-2.5">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] text-muted">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </span>
            <PageTitle>{greeting()}, {profile?.name?.split(" ")[0] || "there"}</PageTitle>
          </div>
          {sub?.status === "trial" && left !== null ? (
            <span className="text-[14px] text-muted">
              Trial: {left} {left === 1 ? "day" : "days"} left ·{" "}
              <Link href="/app/plan" className="font-semibold text-primary">Choose plan</Link>
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-start gap-[18px]">
          <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-[18px]">
            {latest ? (
              <Card className="flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`rounded-full px-[11px] py-1.5 text-[13px] font-bold ${statusPill[latest.status]}`}>
                    {statusLabel[latest.status]}
                  </span>
                  <span className="text-[13px] text-muted">Note sent {clockTime(latest.created_at)}</span>
                </div>
                {latest.headline ? (
                  <p className="font-serif text-[clamp(21px,2vw,25px)] leading-[1.35]">{latest.headline}</p>
                ) : null}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
                  {[
                    ["Medicines", latest.medicines?.length
                      ? `${latest.medicines.filter((m) => m.taken).length} of ${latest.medicines.length} taken`
                      : "Not asked"],
                    ["Mood", latest.mood || "Not noted"],
                    ["Food and sleep", latest.food_sleep || "Not noted"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5 rounded-xl bg-sand p-3">
                      <span className="text-[12px] text-muted">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                {latest.ask_today ? (
                  <div className="flex flex-col gap-0.5 rounded-[14px] bg-[#F6E6DC] px-4 py-3.5 text-[#8E4220]">
                    <span className="text-[12px] font-bold tracking-[0.06em] uppercase">Ask {callName} tonight</span>
                    <span className="text-[17px] leading-[1.4] font-semibold">{latest.ask_today}</span>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`tel:+91${parent.phone}`}
                    className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-[15px] font-semibold text-white no-underline"
                  >
                    Call {callName}
                  </a>
                  <Link
                    href={`/app/day/${latest.id}`}
                    className="inline-flex min-h-11 items-center rounded-xl border-[1.5px] border-ink px-4 text-[15px] font-semibold text-ink no-underline"
                  >
                    Full note and recording
                  </Link>
                </div>
              </Card>
            ) : (
              <Card className="flex flex-col gap-3">
                <span className="font-serif text-[22px]">No notes yet.</span>
                <p className="text-[16px] leading-[1.55] text-body">
                  {parent.first_call_at
                    ? `Sona calls ${callName} for the first time on ${new Date(parent.first_call_at).toLocaleString("en-IN", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true })}. Your first note lands here, and on WhatsApp, right after.`
                    : `Once ${callName}'s first call happens, the note will appear here and on your WhatsApp.`}
                </p>
              </Card>
            )}

            {week.length ? (
              <Card className="flex flex-col gap-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-semibold">This week</span>
                  <Link href="/app/notes" className="py-1.5 text-[14px] font-semibold text-primary no-underline">
                    See all notes
                  </Link>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {week.map((s) => (
                    <Link
                      key={s.id}
                      href={`/app/day/${s.id}`}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-white py-2.5 text-ink no-underline"
                    >
                      <span className="text-[12px] font-semibold">{shortDay(s.created_at)}</span>
                      <span className={`h-3 w-3 rounded-full ${statusDot[s.status]}`} />
                    </Link>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-[18px]">
            <Card className="flex flex-col gap-2.5">
              <span className="text-[13px] text-muted">Next call</span>
              <span className="font-serif text-[26px]">{nextCall}</span>
              <span className="text-[14px] text-muted">
                From {COMPANY.callerDisplay} · in {parent.language}
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                <Link href="/app/parent" className="rounded-[10px] bg-sand px-3.5 py-2.5 text-[14px] font-semibold text-ink no-underline">
                  Change time
                </Link>
              </div>
            </Card>

            {open.length ? (
              <Card className="flex flex-col gap-2.5 border-red bg-red-bg">
                <span className="font-semibold text-red">
                  {open.length} {open.length === 1 ? "alert needs" : "alerts need"} you
                </span>
                <Link href="/app/alerts" className="text-[15px] font-semibold text-ink underline underline-offset-[3px]">
                  Open alerts
                </Link>
              </Card>
            ) : null}

            <Card className="flex flex-col gap-2.5">
              <span className="font-semibold">Plan</span>
              <span className="text-[14px] text-body">
                {sub?.status === "trial" && left !== null
                  ? `Free trial, ${left} ${left === 1 ? "day" : "days"} left. Then ${PRICE_PER_MONTH} a month.`
                  : `${PRICE_PER_MONTH} a month for ${callName}.`}
              </span>
              <Link href="/app/plan" className="py-1 text-[14px] font-semibold text-primary no-underline">
                See plan
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
