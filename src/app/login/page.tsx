import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/app/LoginForm";
import { Mark } from "@/components/app/Mark";
import { APP_NAME, founderWhatsAppUrl } from "@/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { code } = await searchParams;
  const invite = typeof code === "string" ? code.trim().toUpperCase() : "";

  if (isSupabaseConfigured && (await getUser())) redirect("/onboarding/you");

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-sand px-[18px] py-8">
      <div className="flex w-full max-w-[420px] flex-col gap-[18px] rounded-[22px] border border-line bg-paper px-[26px] py-8">
        <Mark size={30} />
        <h1 className="mt-1 font-serif text-[34px] leading-[1.1] font-normal">Welcome back</h1>
        <p className="text-[16px] leading-[1.55] text-body">
          Sign in to see how your parent is doing.
        </p>

        {isSupabaseConfigured ? (
          <LoginForm code={invite} />
        ) : (
          <p className="rounded-[14px] bg-amber-bg px-5 py-4 text-[15px] leading-[1.5] text-amber">
            Sign in is not switched on yet. Message us on WhatsApp and we&apos;ll set your family up
            by hand.
          </p>
        )}

        <span className="text-[14px] leading-[1.5] text-muted">
          New to {APP_NAME}? You&apos;ll need an invite code after signing in. No code?{" "}
          <a href={founderWhatsAppUrl()} target="_blank" rel="noopener" className="font-semibold text-ink">
            WhatsApp us
          </a>
        </span>
      </div>
    </main>
  );
}
