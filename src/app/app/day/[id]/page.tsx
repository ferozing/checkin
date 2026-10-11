import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Transcript } from "@/components/app/Transcript";
import { AppShell, Card, PageTitle } from "@/components/app/Shell";
import {
  clockTime, day, getAlerts, getCall, getSummary, statusLabel, statusPill,
} from "@/lib/data";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "The note" };

const mmss = (s: number | null) =>
  s == null ? null : `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`;

export default async function DayNote({ params }: PageProps<"/app/day/[id]">) {
  await requireUser();
  const { id } = await params;
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");

  const summary = await getSummary(parent.id, id);
  if (!summary) notFound();

  const [profile, alerts, call] = await Promise.all([
    getProfile(),
    getAlerts(parent.id),
    summary.call_id ? getCall(summary.call_id) : Promise.resolve(null),
  ]);

  const callName = parent.call_name || parent.name;
  const open = alerts.filter((a) => !a.handled_at).length;

  return (
    <AppShell parent={parent} userName={profile?.name ?? ""} active="/app" alerts={open}>
      <div className="flex max-w-[760px] flex-col gap-5">
        <Link href="/app" className="self-start py-1.5 text-[14px] font-semibold text-muted no-underline">
          Back
        </Link>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-muted">
            {day(summary.created_at)} · {clockTime(summary.created_at)}
            {call?.duration_sec ? ` · ${mmss(call.duration_sec)}` : ""}
          </span>
          <PageTitle>{callName}&apos;s note</PageTitle>
        </div>

        <span className={`self-start rounded-full px-[11px] py-1.5 text-[13px] font-bold ${statusPill[summary.status]}`}>
          {statusLabel[summary.status]}
        </span>

        {summary.headline ? (
          <p className="font-serif text-[22px] leading-[1.35]">{summary.headline}</p>
        ) : null}

        {summary.rows?.length ? (
          <div className="flex flex-col border-t border-line">
            {summary.rows.map((r) => (
              <div key={r.k} className="flex flex-wrap gap-x-[18px] gap-y-1 border-b border-line py-[15px]">
                <span className="w-[140px] text-[15px] font-semibold text-muted">{r.k}</span>
                <span className="flex-[1_1_260px] text-[16px] leading-[1.55]">{r.v}</span>
              </div>
            ))}
          </div>
        ) : null}

        {summary.ask_today ? (
          <div className="flex flex-col gap-0.5 rounded-[14px] bg-[#F6E6DC] px-4 py-3.5 text-[#8E4220]">
            <span className="text-[12px] font-bold tracking-[0.06em] uppercase">Ask {callName} tonight</span>
            <span className="text-[17px] font-semibold">{summary.ask_today}</span>
          </div>
        ) : null}

        {call?.recording_url ? (
          <Card className="flex items-center gap-3.5 !rounded-2xl !p-4">
            <audio controls src={call.recording_url} className="w-full" />
          </Card>
        ) : (
          <p className="text-[14px] text-muted">
            {parent.recording_consent
              ? "No recording for this call."
              : `No recording: ${callName} did not agree to being recorded, so we keep only the transcript.`}
          </p>
        )}

        {call?.transcript?.length ? <Transcript lines={call.transcript} /> : null}
      </div>
    </AppShell>
  );
}
