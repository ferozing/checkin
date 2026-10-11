import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_NAME } from "@/config";

/** Shared measurements, so every band lines up. */
export const wrap = "mx-auto w-full max-w-[1180px]";
export const pad = "px-[clamp(18px,4.5vw,56px)]";
export const h2 =
  "font-serif text-[clamp(36px,4.2vw,56px)] leading-[1.06] font-normal tracking-[-0.02em]";
export const primaryBtn =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-6 text-[16px] font-semibold text-white transition-colors hover:bg-primary-hover";

export function Brand({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/svg/checkin-logo.svg"
      alt={APP_NAME}
      width={457}
      height={100}
      priority
      className={className}
    />
  );
}

/**
 * A place for a real photograph. Kept as a clean, labelled block so it reads as
 * deliberate until the real picture is dropped into public/photos.
 */
export function PhotoSlot({
  label,
  note,
  className = "",
}: {
  label: string;
  note: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={`flex flex-col justify-end overflow-hidden rounded-[18px] border border-[#DCCFBB] bg-[#E8DDCC] p-[18px] ${className}`}
    >
      <div className="flex items-center gap-2.5 text-[13px] leading-[1.4] text-[#6B5F50] sm:text-[14px]">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
          <rect x="2" y="5" width="18" height="13" rx="3" fill="none" stroke="#6B5F50" strokeWidth="1.6" />
          <circle cx="11" cy="11.5" r="3.6" fill="none" stroke="#6B5F50" strokeWidth="1.6" />
          <path d="M7.5 5l1.5 -2h4l1.5 2" fill="none" stroke="#6B5F50" strokeWidth="1.6" />
        </svg>
        <span>{note}</span>
      </div>
    </div>
  );
}

/** The small round Checkin avatar used inside the WhatsApp mockups. */
export function WaAvatar({ size = 34 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-white"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 100 100" aria-hidden="true">
        <path d="M64.5 34 A24 24 0 1 0 64.5 66" fill="none" stroke="#191714" strokeWidth="13" strokeLinecap="round" />
        <path d="M75 43 A9 9 0 0 1 75 57" fill="none" stroke="#E8743F" strokeWidth="8" strokeLinecap="round" />
        <path d="M84 35 A19 19 0 0 1 84 65" fill="none" stroke="#E8743F" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const className = "font-semibold text-ink underline underline-offset-[3px]";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener" className={className}>{children}</a>
  );
}
