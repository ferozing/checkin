import { createClient } from "@/lib/supabase/server";
import type { Parent } from "@/lib/session";

export type Status = "good" | "amber" | "red" | "missed";

export type Summary = {
  id: string;
  call_id: string | null;
  status: Status;
  headline: string | null;
  rows: { k: string; v: string }[] | null;
  medicines: { name: string; taken: boolean }[] | null;
  mood: string | null;
  food_sleep: string | null;
  ask_today: string | null;
  accurate: boolean | null;
  created_at: string;
};

export type Call = {
  id: string;
  scheduled_at: string | null;
  started_at: string | null;
  duration_sec: number | null;
  status: string;
  transcript: { who: string; text: string; tr?: string }[] | null;
  recording_url: string | null;
};

export type Alert = {
  id: string;
  level: "red" | "amber" | "missed";
  handled_at: string | null;
  created_at: string;
  summary_id: string | null;
};

export type Subscription = {
  status: "trial" | "active" | "expired" | "cancelled";
  trial_ends_at: string | null;
  current_period_end: string | null;
};

/** The notes for a parent, newest first. */
export async function getSummaries(parentId: string, limit = 40): Promise<Summary[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("summaries")
    .select("id, call_id, status, headline, rows, medicines, mood, food_sleep, ask_today, accurate, created_at")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Summary[] | null) ?? [];
}

export async function getSummary(parentId: string, id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("summaries")
    .select("id, call_id, status, headline, rows, medicines, mood, food_sleep, ask_today, accurate, created_at")
    .eq("parent_id", parentId)
    .eq("id", id)
    .maybeSingle();
  return (data as Summary | null) ?? null;
}

export async function getCall(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("calls")
    .select("id, scheduled_at, started_at, duration_sec, status, transcript, recording_url")
    .eq("id", id)
    .maybeSingle();
  return (data as Call | null) ?? null;
}

export async function getAlerts(parentId: string): Promise<Alert[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("alerts")
    .select("id, level, handled_at, created_at, summary_id")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false })
    .limit(30);
  return (data as Alert[] | null) ?? [];
}

export async function getSubscription(parentId: string): Promise<Subscription | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("status, trial_ends_at, current_period_end")
    .eq("parent_id", parentId)
    .maybeSingle();
  return (data as Subscription | null) ?? null;
}

export async function getFamily(parentId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("family_members")
    .select("id, name, whatsapp, receives_alerts")
    .eq("parent_id", parentId)
    .order("created_at");
  return data ?? [];
}

/* ---------- small shared helpers ---------- */

export const statusLabel: Record<Status, string> = {
  good: "All good today",
  amber: "Worth a call today",
  red: "Please call now",
  missed: "Didn't pick up",
};

export const statusPill: Record<Status, string> = {
  good: "bg-good-bg text-good",
  amber: "bg-amber-bg text-amber",
  red: "bg-red text-white",
  missed: "bg-missed-bg text-missed",
};

export const statusDot: Record<Status, string> = {
  good: "bg-good-dot",
  amber: "bg-amber-dot",
  red: "bg-red",
  missed: "bg-missed-dot",
};

/** Calendar tile colours, as in the design's month grid. */
export const statusTile: Record<Status, string> = {
  good: "bg-[#CFE6D5]",
  amber: "bg-[#F7DFAE]",
  red: "bg-[#F3C5B6]",
  missed: "bg-[#E4DCD1]",
};

export const day = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

export const shortDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { weekday: "short" });

export const clockTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

export const prettyTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
};

/** "2 days left", for the trial line. */
export function daysLeft(iso: string | null) {
  if (!iso) return null;
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export type { Parent };
