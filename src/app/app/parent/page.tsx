import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell, Card, PageTitle } from "@/components/app/Shell";
import { setPaused } from "@/lib/account";
import { COMPANY } from "@/config";
import { getAlerts, getFamily, prettyTime } from "@/lib/data";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Parent settings" };

const consentCopy = {
  pending: "Not asked yet. Sona asks on the first call.",
  given: "Given, on the first call.",
  declined: "Declined. Calls are stopped.",
} as const;

export default async function ParentSettings() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const [profile, alerts, family] = await Promise.all([
    getProfile(), getAlerts(parent.id), getFamily(parent.id),
  ]);

  const callName = parent.call_name || parent.name;
  const time = prettyTime((parent.call_time ?? "09:00").slice(0, 5));

  const rows: [string, string][] = [
    ["Daily call", parent.paused ? "Paused" : `${parent.call_slot === "evening" ? "Evening" : "Morning"}, ${time}`],
    ["Language", parent.language],
    ["Their number", `+91 ${parent.phone}`],
    ["Medicines", parent.medicines?.length
      ? parent.medicines.map((m) => `${m.name}${m.when ? ` (${m.when})` : ""}`).join(", ")
      : "None added"],
    ["Keep an eye on", parent.watch_for?.length ? parent.watch_for.join(", ") : "Nothing yet"],
    ["Loves talking about", parent.topics || "Not added"],
    ["Their consent", consentCopy[parent.consent_status]],
    ["Family getting notes", [profile?.name ?? "You", ...family.map((f) => f.name)].join(", ")],
  ];

  return (
    <AppShell parent={parent} userName={profile?.name ?? ""} active="/app/parent" alerts={alerts.filter((a) => !a.handled_at).length}>
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <div className="flex items-center gap-3.5">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F6E6DC] font-serif text-[26px] text-[#8E4220]">
            {callName[0]?.toUpperCase()}
          </span>
          <div className="flex flex-col">
            <PageTitle>{callName}</PageTitle>
            <span className="text-[14px] text-muted">
              {[parent.name, `+91 ${parent.phone}`, parent.city].filter(Boolean).join(" · ")}
            </span>
          </div>
        </div>

        {rows.map(([k, v]) => (
          <Card key={k} className="flex items-center justify-between gap-3.5 !rounded-2xl !px-[18px] !py-4">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[13px] text-muted">{k}</span>
              <span className="text-[16px] leading-[1.4] font-semibold">{v}</span>
            </div>
          </Card>
        ))}

        <Card className="flex items-center justify-between gap-3.5 !rounded-2xl !px-[18px] !py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-semibold">Pause calls</span>
            <span className="text-[13px] text-muted">For travel, a hospital stay or a family function</span>
          </div>
          <form action={setPaused}>
            <input type="hidden" name="parent_id" value={parent.id} />
            <input type="hidden" name="paused" value={parent.paused ? "false" : "true"} />
            <button
              type="submit"
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-xl px-4 text-[15px] font-semibold ${
                parent.paused ? "bg-primary text-white" : "border-[1.5px] border-ink text-ink"
              }`}
            >
              {parent.paused ? "Resume calls" : "Pause calls"}
            </button>
          </form>
        </Card>

        <p className="text-[14px] leading-[1.55] text-muted">
          To change any of this, or to delete {callName}&apos;s data, message us on WhatsApp at{" "}
          {COMPANY.phoneDisplay}. Editing from here is coming shortly.
        </p>
      </div>
    </AppShell>
  );
}
