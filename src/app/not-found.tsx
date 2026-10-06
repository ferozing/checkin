import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[640px] px-[clamp(20px,4vw,32px)] pt-[clamp(48px,8vw,96px)] pb-[clamp(64px,9vw,112px)]">
        <p className="text-[14px] font-bold tracking-[0.1em] text-terracotta uppercase">404</p>
        <h1 className="mt-3 font-serif text-[clamp(34px,5vw,52px)] leading-[1.05] font-medium tracking-[-0.02em]">
          That page isn&apos;t here.
        </h1>
        <p className="mt-4 text-ink-2">
          The link may be old, or we may have moved the page. Nothing is wrong with your account.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[60px] items-center rounded-full bg-green px-[30px] text-[19px] font-semibold text-card shadow-[0_10px_28px_rgba(31,77,58,0.25)] transition-colors hover:bg-green-hover"
        >
          Back to the home page
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
