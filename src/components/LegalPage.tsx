import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function LegalPage({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[760px] px-[clamp(20px,4vw,32px)] pt-[clamp(24px,5vw,56px)] pb-[clamp(64px,9vw,112px)]">
        <h1 className="font-serif text-[clamp(40px,5.6vw,64px)] leading-[1.05] font-medium tracking-[-0.02em]">{title}</h1>
        {intro ? <p className="mt-3 text-[15px] text-muted">{intro}</p> : null}
        <div>{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-11">
      <h2 className="font-serif text-[clamp(24px,3vw,30px)] leading-[1.15] font-medium">{title}</h2>
      <div className="mt-3 space-y-3.5 text-ink-2">{children}</div>
    </section>
  );
}

export function Bullets({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-6 marker:text-line-strong">{children}</ul>;
}

export function Callout({ children }: { children: ReactNode }) {
  return <div className="mt-8 rounded-[18px] bg-terracotta-soft px-6 py-5 text-terracotta-text">{children}</div>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-green underline underline-offset-[3px] hover:text-green-hover">
      {children}
    </a>
  );
}
