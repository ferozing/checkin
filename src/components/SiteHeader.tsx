import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_NAME } from "@/config";

export function SiteHeader({ nav }: { nav?: ReactNode }) {
  return (
    <header className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-[clamp(20px,4vw,32px)] py-5">
      <Link href="/" className="flex min-h-11 items-center gap-3 text-ink no-underline">
        <Image src="/brand/svg/checkin-logo.svg" alt={APP_NAME} width={183} height={40} priority className="h-10 w-auto" />
      </Link>
      {nav}
    </header>
  );
}
