"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { TRIAL_DAYS } from "@/config";
import { checkInviteCode } from "@/lib/invite";

/** The code is checked on the server, so the list never reaches the browser. */
export function InviteBox() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [checking, start] = useTransition();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const entered = code.trim().toUpperCase();
    if (!entered) return;
    start(async () => {
      if (await checkInviteCode(entered)) {
        router.push(`/signup?code=${encodeURIComponent(entered)}`);
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className="flex max-w-[560px] flex-col gap-2">
      <form onSubmit={submit} noValidate className="flex flex-wrap gap-2.5">
        <label htmlFor="invite-code" className="sr-only">Invite code</label>
        <input
          id="invite-code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          placeholder="Invite code"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="min-h-[52px] min-w-0 flex-[1_1_220px] rounded-xl border-[1.5px] border-ink bg-white px-4 text-[16px] text-ink uppercase outline-none placeholder:normal-case placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={checking}
          className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl bg-primary px-[22px] text-[16px] font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-70"
        >
          {checking ? "Checking…" : `Start ${TRIAL_DAYS} day free trial`}
        </button>
      </form>
      {error ? (
        <p role="alert" className="text-[15px] font-semibold text-red">
          That code didn&apos;t work. Message us and we&apos;ll sort it out.
        </p>
      ) : null}
    </div>
  );
}
