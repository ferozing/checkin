"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { APP_NAME, COMPANY, founderWhatsAppUrl } from "@/config";
import { checkInviteCode } from "@/lib/invite";
import { Chat } from "./icons";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refunds", label: "Refunds" },
  { href: "/contact", label: "Contact" },
];

export function FinalCta() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [checking, startChecking] = useTransition();

  // The code is checked on the server, so the code list never reaches the browser.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const entered = code.trim().toUpperCase();
    if (!entered) return;
    startChecking(async () => {
      if (await checkInviteCode(entered)) {
        router.push(`/signup?code=${encodeURIComponent(entered)}`);
      } else {
        setError(true);
      }
    });
  };

  return (
    <section id="start" className="final">
      <div className="final-inner">
        <h2>
          You can&apos;t be there every morning. <span className="em">Now someone is.</span>
        </h2>
        <p className="final-lead">
          <b>{APP_NAME}</b> is invite only while we grow carefully. Have a code? Start your free
          trial now.
        </p>
        <form className="codebox" onSubmit={submit} noValidate>
          <label htmlFor="invite-code" className="sr-only">Invite code</label>
          <input
            id="invite-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="Enter invite code"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
          />
          <button type="submit" disabled={checking}>{checking ? "Checking\u2026" : "Start free trial"}</button>
        </form>
        {error ? (
          <p role="alert" className="code-error">
            That code didn&apos;t work. Message us and we&apos;ll sort it out.
          </p>
        ) : null}
        <a className="wa-link" href={founderWhatsAppUrl()} target="_blank" rel="noopener">
          <Chat stroke="#F6C8A8" />
          <span>No code? Message our team on WhatsApp</span>
        </a>
      </div>
      <footer className="foot">
        <span>
          {APP_NAME} · a{" "}
          <a href="https://fimolabs.com" target="_blank" rel="noopener">
            {COMPANY.name}
          </a>{" "}
          product
        </span>
        <span className="foot-links">
          {legal.map((l, i) => (
            <span key={l.href}>
              {i > 0 ? " · " : ""}
              <Link href={l.href}>{l.label}</Link>
            </span>
          ))}
        </span>
      </footer>
    </section>
  );
}
