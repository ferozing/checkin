import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "@/components/app/Mark";
import { signOut } from "@/lib/account";
import type { Parent } from "@/lib/session";

const NAV = [
  { href: "/app", label: "Today", short: "Today" },
  { href: "/app/notes", label: "All notes", short: "Notes" },
  { href: "/app/alerts", label: "Alerts", short: "Alerts" },
  { href: "/app/parent", label: "settings", short: "Parent" },
  { href: "/app/plan", label: "Plan and billing", short: "Plan" },
];

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/**
 * Sidebar on desktop, sticky tabs under 820px, as in the design.
 * `active` is the nav href that should look current.
 */
export function AppShell({
  parent,
  userName,
  active,
  alerts,
  children,
}: {
  parent: Parent;
  userName: string;
  active: string;
  alerts: number;
  children: ReactNode;
}) {
  const callName = parent.call_name || parent.name;
  const items = NAV.map((n) => ({
    ...n,
    label: n.href === "/app/parent" ? `${callName}'s settings` : n.label,
    short: n.href === "/app/parent" ? callName : n.short,
    on: n.href === active,
    badge: n.href === "/app/alerts" ? alerts : 0,
  }));

  return (
    <div className="flex min-h-screen flex-1">
      {/* desktop sidebar */}
      <aside className="hidden w-[248px] shrink-0 flex-col gap-1 border-r border-line bg-panel p-[14px_14px_20px] md:flex">
        <div className="px-2 pt-1.5 pb-[18px]">
          <Mark size={26} />
        </div>

        <div className="mb-3 flex items-center gap-2.5 rounded-[14px] border border-line bg-paper px-3 py-2.5">
          <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F6E6DC] font-serif text-[17px] text-[#8E4220]">
            {callName[0]?.toUpperCase()}
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[15px] font-semibold">{callName}</span>
            <span className="truncate text-[12px] text-muted">
              {[parent.city, parent.language].filter(Boolean).join(" · ")}
            </span>
          </div>
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${parent.paused ? "bg-missed-dot" : "bg-good-dot"}`} />
        </div>

        {items.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-[15px] text-ink no-underline ${
              n.on ? "bg-[#F1E6D6] font-bold" : "font-medium hover:bg-sand"
            }`}
          >
            <span className={`h-2 w-2 shrink-0 rounded-full ${n.on ? "bg-primary" : "bg-line-strong"}`} />
            <span className="truncate">{n.label}</span>
            {n.badge ? <span className="ml-auto text-[12px] font-bold text-red">{n.badge}</span> : null}
          </Link>
        ))}

        <div className="mt-auto flex items-center gap-2.5 border-t border-line px-2 pt-3">
          <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
            {initials(userName || "You")}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[14px] font-semibold">{userName || "You"}</span>
            <form action={signOut}>
              <button type="submit" className="cursor-pointer bg-transparent p-0 text-[12px] text-muted">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        {/* mobile header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper px-4 py-3 md:hidden">
          <Mark />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-[14px] font-semibold">
            <span className={`h-2 w-2 rounded-full ${parent.paused ? "bg-missed-dot" : "bg-good-dot"}`} />
            {callName}
          </span>
        </div>

        <div className="mx-auto w-full max-w-[1080px] flex-1 px-[clamp(16px,3vw,40px)] pt-7 pb-[110px] md:pb-10">
          {children}
        </div>

        {/* mobile tabs */}
        <nav
          aria-label="App"
          className="sticky bottom-0 z-10 flex justify-around border-t border-line bg-paper px-1 pt-1.5 pb-2.5 md:hidden"
        >
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex min-w-[56px] flex-col items-center gap-1 px-1 py-1.5 text-[11.5px] no-underline ${
                n.on ? "font-bold text-ink" : "font-medium text-faint"
              }`}
            >
              <span className={`relative h-[22px] w-[22px] rounded-[7px] ${n.on ? "bg-primary" : "bg-[#E6DCCD]"}`}>
                {n.badge ? (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red" />
                ) : null}
              </span>
              <span className="truncate">{n.short}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-normal">{children}</h1>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-line bg-white p-[clamp(18px,2.4vw,26px)] ${className}`}>
      {children}
    </div>
  );
}
