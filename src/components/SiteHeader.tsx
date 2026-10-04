import Link from "next/link";
import type { ReactNode } from "react";
import { APP_NAME } from "@/config";

export function SiteHeader({ nav }: { nav?: ReactNode }) {
  return (
    <header className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-[clamp(20px,4vw,32px)] py-5">
      <Link href="/" className="flex min-h-11 items-center gap-3 text-ink no-underline">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green text-cream">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
          </svg>
        </span>
        <span className="font-serif text-[21px] font-semibold">{APP_NAME}</span>
      </Link>
      {nav}
    </header>
  );
}
