// Copy and content for the landing page, kept out of the components so the
// markup stays readable. Product name and price live in @/config, never here.

export type Line = { who: "sona" | "parent"; text: string; tr: string };

export type Scene = {
  lang: string;
  home: string;
  childCity: string;
  /** Minutes the child's clock is offset from the parent's. */
  off: number;
  name: string;
  he: string;
  his: string;
  him: string;
  banner: string;
  meds: string;
  mood: string;
  food: string;
  askLabel: string;
  ask: string;
  convo: Line[];
};

export const scenes: Scene[] = [
  {
    lang: "Hindi", home: "Bareilly", childCity: "Pune", off: 0,
    name: "Papa", he: "he", his: "his", him: "him",
    banner: "Papa is doing well today. Tap to read your note.",
    meds: "sugar tablet taken after breakfast", mood: "chatty, slept well", food: "poha and chai",
    askLabel: "Ask him tonight", ask: "who won carrom with Sharma uncle?",
    convo: [
      { who: "sona", text: "Good morning Papa! Nashta ho gaya?", tr: "Good morning Papa! Had breakfast?" },
      { who: "parent", text: "Haan, poha khaya. Sugar ki goli bhi le li.", tr: "Yes, had poha. Took my sugar tablet too." },
      { who: "sona", text: "Badhiya! Kal carrom mein kaun jeeta?", tr: "Nice! Who won carrom yesterday?" },
      { who: "parent", text: "Sharma ji kehte hain woh, par main jeeta tha!", tr: "Sharma ji says he did, but I won!" },
    ],
  },
  {
    lang: "Telugu", home: "Tenali", childCity: "Bengaluru", off: 0,
    name: "Amma", he: "she", his: "her", him: "her",
    banner: "Amma is doing well today. Tap to read your note.",
    meds: "BP tablet taken after breakfast", mood: "cheerful, slept well", food: "upma and filter coffee",
    askLabel: "Ask her tonight", ask: "did the tomato plants finally flower?",
    convo: [
      { who: "sona", text: "Good morning Amma! Tiffin ayyinda?", tr: "Good morning Amma! Had breakfast?" },
      { who: "parent", text: "Ayyindi, upma chesanu. BP tablet kooda vesukunna.", tr: "Yes, made upma. Took my BP tablet too." },
      { who: "sona", text: "Super! Mee tomato mokkalu ela unnayi?", tr: "Lovely! How are your tomato plants?" },
      { who: "parent", text: "Inka poovulu raaledu. Repu choodali!", tr: "No flowers yet. Let us see tomorrow!" },
    ],
  },
  {
    lang: "Tamil", home: "Karaikudi", childCity: "Dubai", off: -90,
    name: "Amma", he: "she", his: "her", him: "her",
    banner: "Amma is doing well today. Tap to read your note.",
    meds: "thyroid tablet taken on time", mood: "happy, a little busy", food: "idli and sambar",
    askLabel: "Ask her tonight", ask: "how did the neighbour kid’s birthday go?",
    convo: [
      { who: "sona", text: "Good morning Amma! Saapteengala?", tr: "Good morning Amma! Have you eaten?" },
      { who: "parent", text: "Saapten, idli. Maathirai pottachu.", tr: "Yes, idli. Took my tablet." },
      { who: "sona", text: "Nalladhu! Inniku enna plan?", tr: "Good! What is the plan today?" },
      { who: "parent", text: "Pakkathu veetu paapa birthday. Kesari panren!", tr: "Neighbour kid’s birthday. Making kesari!" },
    ],
  },
  {
    lang: "Bengali", home: "Bardhaman", childCity: "Gurugram", off: 0,
    name: "Ma", he: "she", his: "her", him: "her",
    banner: "Ma is doing well today. Tap to read your note.",
    meds: "all morning tablets taken", mood: "relaxed, slept well", food: "luchi and tea",
    askLabel: "Ask her tonight", ask: "which old songs did she listen to today?",
    convo: [
      { who: "sona", text: "Good morning Ma! Kheyecho?", tr: "Good morning Ma! Have you eaten?" },
      { who: "parent", text: "Haan, luchi kheyechi. Oshudh o kheyechi.", tr: "Yes, had luchi. Took my medicines too." },
      { who: "sona", text: "Darun! Aaj ki korbe?", tr: "Lovely! What will you do today?" },
      { who: "parent", text: "Puron gaan shunbo, aar ektu ghumabo!", tr: "Listen to old songs, and nap a little!" },
    ],
  },
  {
    lang: "English", home: "Kottayam", childCity: "Mumbai", off: 0,
    name: "Dad", he: "he", his: "his", him: "him",
    banner: "Dad is doing well today. Tap to read your note.",
    meds: "BP and sugar tablets taken", mood: "upbeat, walked 30 minutes", food: "puttu and banana",
    askLabel: "Ask him tonight", ask: "did the new reading glasses help?",
    convo: [
      { who: "sona", text: "Morning Dad! How did you sleep?", tr: "In plain English, at his pace." },
      { who: "parent", text: "Very well. Already had my tablets.", tr: "All on time today." },
      { who: "sona", text: "Wonderful. Did the new glasses arrive?", tr: "Sona remembers yesterday." },
      { who: "parent", text: "Yes! I can read the paper again.", tr: "Something to talk about tonight." },
    ],
  },
];

export type DayType = "good" | "amber" | "missed";

export type Day = {
  short: string;
  full: string;
  type: DayType;
  time: string;
  headline: string;
  rows: [string, string][];
  ask: string;
};

export const week: Day[] = [
  { short: "Mon", full: "Monday", type: "good", time: "9:07 am",
    headline: "Amma went for her walk with Lakshmi aunty and came back hungry.",
    rows: [["Medicines", "All taken, morning and night"], ["Mood", "Chatty, in good spirits"], ["Sleep", "Slept well, up at 6"]],
    ask: "Did Lakshmi aunty’s grandson get his results?" },
  { short: "Tue", full: "Tuesday", type: "good", time: "9:06 am",
    headline: "A quiet day. She watched her serial and called your cousin.",
    rows: [["Medicines", "All taken"], ["Mood", "Calm"], ["Food", "Pesarattu for breakfast"]],
    ask: "What happened in her serial yesterday?" },
  { short: "Wed", full: "Wednesday", type: "amber", time: "9:09 am",
    headline: "Her knee is hurting again, and she skipped last night’s tablet.",
    rows: [["Medicines", "Missed the evening BP tablet"], ["Mood", "A little low"], ["Sleep", "Woke up twice from knee pain"]],
    ask: "Call her today. Ask about the knee and remind her gently about the tablet." },
  { short: "Thu", full: "Thursday", type: "good", time: "9:08 am",
    headline: "Back to herself. Knee is better after the warm oil.",
    rows: [["Medicines", "BP tablet taken after breakfast"], ["Mood", "Cheerful, slept well"], ["Food", "Upma and filter coffee"]],
    ask: "Did the tomato plants finally flower?" },
  { short: "Fri", full: "Friday", type: "good", time: "9:07 am",
    headline: "Excited about the wedding in the family next month.",
    rows: [["Medicines", "All taken"], ["Mood", "Happy, a bit busy"], ["Plans", "Tailor visit on Saturday"]],
    ask: "Which saree did she finally choose for the wedding?" },
  { short: "Sat", full: "Saturday", type: "missed", time: "9:30 am",
    headline: "No answer at 9:00, 9:15 and 9:30.",
    rows: [["What we did", "Tried three times, 15 minutes apart"], ["Likely", "She mentioned the tailor visit yesterday"], ["Next", "Sona calls again tomorrow"]],
    ask: "You may want to give her a quick call yourself." },
  { short: "Sun", full: "Sunday", type: "good", time: "9:08 am",
    headline: "Showed Sona the new blouse. Very proud of the tailor.",
    rows: [["Medicines", "All taken"], ["Mood", "Bright"], ["Food", "Biryani at your uncle’s"]],
    ask: "Ask her to send you a photo of the blouse." },
];

export const dayStyle: Record<DayType, { status: string; suffix: string; askLabel: string }> = {
  good: { status: "All good today", suffix: "", askLabel: "Ask her tonight" },
  amber: { status: "Worth a call today", suffix: "is-amber", askLabel: "What to do" },
  missed: { status: "Didn’t pick up", suffix: "is-missed", askLabel: "What to do" },
};

export const greets = [
  { name: "Telugu", line: "Good morning Amma! Tiffin ayyinda?", tr: "Good morning Amma! Had your breakfast?" },
  { name: "Hindi", line: "Good morning Papa! Nashta ho gaya?", tr: "Good morning Papa! Had breakfast?" },
  { name: "Tamil", line: "Amma, saapteengala? Thookam nalla irundhucha?", tr: "Amma, have you eaten? Did you sleep well?" },
  { name: "Kannada", line: "Appa, oota aayta? Walk ge hogidra?", tr: "Appa, had your meal? Did you go for your walk?" },
  { name: "Bengali", line: "Ma, kheyecho? Aaj sharir kemon?", tr: "Ma, have you eaten? How are you feeling today?" },
  { name: "English", line: "Morning Dad! Did you take your sugar tablet?", tr: "Plain English, at their pace." },
];
