"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { founderWhatsAppUrl } from "@/config";
import { checkInviteCode } from "@/lib/invite";

const InviteContext = createContext<() => void>(() => {});

export function InviteProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");

  const open = useCallback(() => {
    setError(false);
    ref.current?.showModal();
  }, []);
  const close = () => ref.current?.close();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (await checkInviteCode(c)) {
      close();
      router.push(`/signup?code=${encodeURIComponent(c)}`);
    } else {
      setError(true);
    }
  };

  return (
    <InviteContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="invite-title"
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[min(440px,calc(100vw-32px))] rounded-[28px] bg-cream p-0 text-ink shadow-[0_40px_100px_rgba(42,36,32,0.3)] backdrop:bg-[rgba(42,36,32,0.45)]"
      >
        <div className="relative flex flex-col gap-3 px-7 pt-9 pb-7">
          <button type="button" onClick={close} aria-label="Close" className="absolute top-3.5 right-3.5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-2 hover:bg-sand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <p className="self-start rounded-full bg-terracotta-soft px-3.5 py-1.5 text-[14px] font-semibold text-terracotta-text">Invite only</p>
          <h3 id="invite-title" className="mt-1.5 font-serif text-[30px] leading-[1.1] font-medium">Have an invite code?</h3>
          <p className="text-ink-2">We&apos;re starting with a small group of families so every first call goes well.</p>
          <form onSubmit={submit} noValidate className="mt-2 flex flex-col gap-2">
            <label htmlFor="invite-code" className="mt-1.5 text-[15px] font-semibold">Invite code</label>
            <input
              id="invite-code"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              autoComplete="off"
              autoCapitalize="characters"
              placeholder="e.g. FAMILY2026"
              className="h-[52px] rounded-[14px] border-[1.5px] border-line-strong bg-card px-4 text-[17px] text-ink outline-none focus-visible:border-green"
            />
            {error ? (
              <p role="alert" className="text-[15px] text-red">That code didn&apos;t work. Message the founder and we&apos;ll sort it out.</p>
            ) : null}
            <button type="submit" className="mt-2.5 flex min-h-[52px] cursor-pointer items-center justify-center rounded-full bg-green text-[17px] font-semibold text-card hover:bg-green-hover">
              Continue
            </button>
          </form>
          <div className="my-1 flex items-center gap-3 text-[14px] text-muted before:h-px before:flex-1 before:bg-line-strong after:h-px after:flex-1 after:bg-line-strong">No code?</div>
          <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border-[1.5px] border-green text-[17px] font-semibold text-green hover:bg-green-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Message the founder on WhatsApp
          </a>
        </div>
      </dialog>
    </InviteContext.Provider>
  );
}

export function StartTrialButton({ className, children }: { className: string; children: ReactNode }) {
  const open = useContext(InviteContext);
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
