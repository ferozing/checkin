/**
 * Fills one parent with a month of realistic calls, notes and one red alert,
 * so every status state can be seen before real calls exist.
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs <parent_id>
 *
 * Needs the service role key, so run it locally and never from the browser.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const parentId = process.argv[2];

if (!url || !key || !parentId) {
  console.error("usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs <parent_id>");
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

const { data: parent, error: perr } = await db
  .from("parents").select("id, user_id, name, call_name, language, call_time").eq("id", parentId).maybeSingle();
if (perr || !parent) {
  console.error("parent not found:", perr?.message ?? parentId);
  process.exit(1);
}
const who = parent.call_name || parent.name;

// A month of days, newest last. A few amber, one red, a couple missed.
const script = [
  ["good", "Walked with Lakshmi aunty and came back hungry.", "Did aunty's grandson get his results?"],
  ["good", "A quiet day. Watched her serial and called your cousin.", "What happened in the serial?"],
  ["missed", "No answer at 9:00, 9:15 and 9:30.", "Give her a quick call yourself."],
  ["good", "Back to herself. Slept well and made upma.", "Did the tomato plants flower?"],
  ["amber", "Knee hurting again, and last night's tablet was missed.", "Ask about the knee, and the evening tablet."],
  ["good", "Cheerful. The knee is better after the warm oil.", "Was the warm oil her idea?"],
  ["good", "Excited about the wedding next month.", "Which saree did she choose?"],
  ["red", "Mentioned chest discomfort since last night.", "Call her now. Sona asked her to sit and rest."],
  ["good", "Much better today. Rested all morning as asked.", "Did she see the doctor?"],
  ["good", "Proud of the new blouse from the tailor.", "Ask her to send a photo."],
];

const rows = (status) => [
  { k: "How she sounded", v: status === "good" ? "Cheerful and chatty." : status === "amber" ? "A little low." : "Tired." },
  { k: "Medicines", v: status === "amber" ? "Missed the evening tablet." : "Both taken." },
  { k: "Food and sleep", v: "Upma and filter coffee. Slept through the night." },
];

const transcript = [
  { who: "Sona", text: "Good morning! Tiffin ayyinda?", tr: "Good morning! Had breakfast?" },
  { who, text: "Ayyindi, upma chesanu.", tr: "Yes, I made upma." },
  { who: "Sona", text: "Mee mokalu noppi ela undi?", tr: "How is your knee?" },
  { who, text: "Chala nayam.", tr: "Much better." },
];

let made = 0;
for (let i = 0; i < script.length; i++) {
  const [status, headline, ask] = script[i];
  const at = new Date();
  at.setDate(at.getDate() - (script.length - 1 - i));
  const [h, m] = (parent.call_time ?? "09:00").split(":").map(Number);
  at.setHours(h, m, 0, 0);

  const missed = status === "missed";
  const { data: call } = await db.from("calls").insert({
    parent_id: parent.id,
    scheduled_at: at.toISOString(),
    started_at: missed ? null : at.toISOString(),
    ended_at: missed ? null : new Date(at.getTime() + 372_000).toISOString(),
    duration_sec: missed ? null : 372,
    status: missed ? "no_answer" : "completed",
    attempt: missed ? 3 : 1,
    language: parent.language,
    transcript: missed ? null : transcript,
  }).select("id").single();

  const { data: summary } = await db.from("summaries").insert({
    call_id: call?.id ?? null,
    parent_id: parent.id,
    status,
    headline: `${who} ${headline[0].toLowerCase()}${headline.slice(1)}`,
    rows: rows(status),
    medicines: [
      { name: "BP tablet", taken: status !== "amber" },
      { name: "Sugar tablet", taken: true },
    ],
    mood: status === "good" ? "Cheerful" : status === "amber" ? "A little low" : "Not reached",
    food_sleep: missed ? "Not known" : "Ate well, slept well",
    ask_today: ask,
    created_at: new Date(at.getTime() + 480_000).toISOString(),
  }).select("id").single();

  if (status !== "good" && summary) {
    await db.from("alerts").insert({
      parent_id: parent.id,
      summary_id: summary.id,
      level: status === "red" ? "red" : status === "amber" ? "amber" : "missed",
      // Everything except the most recent one is already dealt with.
      handled_at: i < script.length - 3 ? new Date(at.getTime() + 3_600_000).toISOString() : null,
      created_at: new Date(at.getTime() + 480_000).toISOString(),
    });
  }
  made++;
}

console.log(`seeded ${made} days for ${who} (${parent.id})`);
