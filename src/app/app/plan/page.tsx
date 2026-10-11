import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell, Card, PageTitle } from "@/components/app/Shell";
import { COMPANY, PRICE_PER_MONTH, TRIAL_DAYS, founderWhatsAppUrl } from "@/config";
import { daysLeft, getAlerts, getSubscription } from "@/lib/data";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Plan and billing" };

export default async function Plan() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const [profile, alerts, sub] = await Promise.all([
    getProfile(), getAlerts(parent.id), getSubscription(parent.id),
  ]);

  const callName = parent.call_name || parent.name;
  const left = daysLeft(sub?.trial_ends_at ?? null);
  const ends = sub?.trial_ends_at
    ? new Date(sub.trial_ends_at).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })
    : null;

  const badge =
    sub?.status === "trial"
      ? { text: `Free trial · ${left} ${left === 1 ? "day" : "days"} left`, cls: "bg-amber-bg text-amber" }
      : sub?.status === "active"
        ? { text: "Active", cls: "bg-good-bg text-good" }
        : sub?.status === "expired"
          ? { text: "Expired", cls: "bg-red-bg text-red" }
          : { text: "Cancelled", cls: "bg-missed-bg text-missed" };

  return (
    <AppShell parent={parent} userName={profile?.name ?? ""} active="/app/plan" alerts={alerts.filter((a) => !a.handled_at).length}>
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <PageTitle>Plan</PageTitle>

        <Card className="flex flex-col gap-3 !border-[1.5px] !border-ink">
          <div className="flex flex-wrap justify-between gap-2">
            <span className={`rounded-full px-[11px] py-1.5 text-[13px] font-bold ${badge.cls}`}>{badge.text}</span>
            {ends && sub?.status === "trial" ? (
              <span className="text-[14px] text-muted">Ends {ends}</span>
            ) : null}
          </div>
          <span className="font-serif text-[46px] leading-none">
            {PRICE_PER_MONTH}
            <span className="font-sans text-[16px] text-muted"> a month for {callName}</span>
          </span>
          <span className="text-[15px] leading-[1.55] text-body">
            Daily call, daily note, alerts and the call recording. Cancel any time.
          </span>
          {/* Razorpay arrives with Phase 6. Until then this is handled by hand. */}
          <a
            href={founderWhatsAppUrl()}
            target="_blank"
            rel="noopener"
            className="mt-1 inline-flex min-h-[52px] items-center justify-center self-start rounded-xl bg-primary px-5 text-[16px] font-semibold text-white no-underline"
          >
            Set up payment on WhatsApp
          </a>
          <span className="text-[13px] text-muted">
            Card and UPI payment from inside the app is coming shortly. Until then we set it up with
            you on WhatsApp at {COMPANY.phoneDisplay}.
          </span>
        </Card>

        <div className="flex flex-col border-t border-line">
          {[
            ["Invoices", "None yet"],
            ["Add another parent", `${PRICE_PER_MONTH} a month each`],
            ["Free trial", `${TRIAL_DAYS} days, then ${PRICE_PER_MONTH} a month`],
            ["Cancel", "Calls stop at the end of the period"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-line py-[15px] text-[15px]">
              <span>{k}</span>
              <span className="text-right text-muted">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
