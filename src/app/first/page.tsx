import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mark } from "@/components/app/Mark";
import { ghost } from "@/components/app/form";
import { COMPANY, founderWhatsAppUrl } from "@/config";
import { getParent, getProfile, requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "First call booked" };

const when = (iso: string | null) => {
  if (!iso) return "soon";
  const d = new Date(iso);
  const time = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  return sameDay ? `today, ${time}` : `tomorrow, ${time}`;
};

export default async function FirstCall() {
  await requireUser();
  const parent = await getParent();
  if (!parent) redirect("/onboarding/parent");
  const profile = await getProfile();

  const callName = parent.call_name || parent.name;
  const booked = when(parent.first_call_at);

  const steps = [
    {
      title: "Account and WhatsApp set up",
      sub: profile?.whatsapp ? `Updates will come to +91 ${profile.whatsapp}` : "Updates will come to your WhatsApp",
      done: true,
    },
    {
      title: `${callName}'s first call: ${booked}`,
      sub: "Sona will ask permission before anything else",
      done: false,
    },
    {
      title: "Sona chats for 5 to 8 minutes",
      sub: `In ${parent.language}, warm and unhurried`,
      done: false,
    },
    {
      title: "Your first note arrives on WhatsApp",
      sub: "Usually within 2 minutes of the call",
      done: false,
    },
  ];

  return (
    <main className="flex min-h-screen flex-1 justify-center bg-sand px-[18px] py-10">
      <div className="flex w-full max-w-[560px] flex-col gap-5">
        <Mark />
        <h1 className="font-serif text-[clamp(30px,4vw,36px)] leading-[1.1] font-normal">
          You&apos;re all set. {callName}&apos;s first call is booked.
        </h1>
        <p className="text-[16px] leading-[1.55] text-body">
          Here is what happens next. We will message you on WhatsApp at every step.
        </p>

        <div className="rounded-[18px] border border-line bg-paper px-5 py-2">
          {steps.map((s) => (
            <div key={s.title} className="flex items-start gap-3.5 border-b border-[#F1E9DA] py-3.5 last:border-b-0">
              <span
                className={`inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                  s.done ? "border-good bg-good" : "border-line-strong bg-white"
                }`}
              >
                {s.done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M3 7.5l2.5 2.5L11 4.5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : null}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold">{s.title}</span>
                <span className="text-[14px] text-muted">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[15px] leading-[1.55] text-body">
          Sona calls from {COMPANY.callerDisplay}. Ask {callName} to save it, so they know to pick up.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/app"
            className="inline-flex min-h-[52px] items-center rounded-xl bg-primary px-5 text-[16px] font-semibold text-white no-underline"
          >
            Go to my dashboard
          </Link>
          <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className={ghost}>
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
