import Link from "next/link";
import { APP_NAME } from "@/config";

const links = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refunds", label: "Refunds" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#EAE0CF]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-4 px-[clamp(20px,4vw,32px)] pt-7 pb-10 text-[15px] text-muted">
        <span className="font-serif text-[19px] text-ink">{APP_NAME}</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center text-nav underline underline-offset-[3px]">
              {l.label}
            </Link>
          ))}
        </nav>
        <span>Made with care in India</span>
      </div>
    </footer>
  );
}
