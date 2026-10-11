import { TRIAL_DAYS, founderWhatsAppUrl } from "@/config";
import { Brand, pad, wrap } from "./ui";

const link = "px-3 py-3 text-[15px] text-body no-underline hover:text-ink";

export function Nav() {
  return (
    <header className={`border-b border-line ${pad}`}>
      <nav aria-label="Main" className={`${wrap} flex flex-wrap items-center justify-between gap-3 py-4`}>
        <a href="#top" className="flex min-h-11 items-center">
          <Brand className="h-7 w-auto" />
        </a>
        <div className="flex flex-wrap items-center gap-0.5 text-[15px]">
          <a href="#note" className={link}>How it works</a>
          <a href="#promise" className={link}>Our promise</a>
          <a href="#pricing" className={link}>Pricing</a>
          <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className={link}>
            WhatsApp us
          </a>
          <a
            href="#start"
            className="ml-1.5 inline-flex min-h-11 items-center rounded-[10px] bg-ink px-[18px] text-[15px] font-semibold text-paper no-underline"
          >
            Try {TRIAL_DAYS} days free
          </a>
        </div>
      </nav>
    </header>
  );
}
