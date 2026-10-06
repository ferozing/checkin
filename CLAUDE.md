# Parent Check In (working name) · by Fimo Labs

Read this file fully before any task. It is the source of truth for product, design and stack.

## Product
Sona, a warm AI voice companion, calls a user's elderly parent once a day on a normal phone (any phone, even a basic keypad phone or landline). After each call the user (the adult child, 25 to 45, often in another city or abroad) gets a short WhatsApp note:
- Status: All good / Worth a call today / Please call now
- Medicines taken or not, mood, food and sleep
- One or two things to ask their parent when they call

Parents need no app. The child pays: 3 day free trial, then ₹499 per month per parent (UPI or card).
Launch is invite only. People without a code message the founder on WhatsApp: +91 96293 81945 (wa.me/919629381945).
The product name may change, so keep it in ONE config value (APP_NAME), never hardcode it in components.

## Live URLs
- Parent company site: fimolabs.com
- This product: checkin.fimolabs.com (Vercel project, deployed from GitHub on every push to main)

## Phase 2 status
Supabase auth, the schema and onboarding are built. See `supabase/SETUP.md` for
the one time project setup and the env vars. Until `NEXT_PUBLIC_SUPABASE_URL`
and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, the app degrades on purpose: invite
codes fall back to `FALLBACK_INVITE_CODES` in config, and `/signup` hands off to
WhatsApp instead of showing the sign up form. Onboarding ends on a done screen,
not `/dashboard`, because that arrives in Phase 3.

## Landing page redesign (current)
The landing page was redesigned and no longer follows the tokens below, which still describe the
app screens. It lives in `src/components/checkin/` (one component per section, copy in `data.ts`,
styles in `landing.css` scoped under `.ci`) and uses a warmer palette: white hero, orange accent
#E8743F, peach #FFE6D2, green #B4E4AA, navy close #1B2340. It carries its own header and footer,
so it does not use SiteHeader / SiteFooter. `design/Main.dc.html` is the older landing prototype.

## Design (the "first design", must match)
Visual reference lives in /design as HTML prototypes (one file per screen). They use a prototype template syntax ({{ }}, sc-for, sc-if, x-dc). Treat them as pixel reference only: copy layout, copy, spacing, colours and animations, and rebuild them as real React components. Do not ship those files.

Screen map:
- design/Main.dc.html: landing page (desktop and mobile, includes the animated call screen hero, WhatsApp notification animation, morning/evening toggle, week view, FAQ)
- design/SignUp.dc.html: sign up (Google, or email magic link)
- design/Onboard1..4.dc.html: onboarding steps 1 to 4
- design/Dashboard.dc.html: dashboard with 5 status states (good, amber, red, waiting, missed)
- design/DayView.dc.html: one day's full summary and call transcript
- design/AlertAmber.dc.html and AlertRed.dc.html: alert states
- design/Message.dc.html: the WhatsApp summary message format
- design/Plan.dc.html: plan page (trial, active, expired)

Tokens:
- Background cream #FBF6EC, card #FFFDF8, sand #F3ECDF, lines #ECE3D3 / #DCD0BC
- Ink #2A2420, secondary text #5E544D, muted #6B6058
- Primary deep green #1F4D3A (hover #173B2C), soft green #E6EFE7
- Accent terracotta #B4532A, text on soft terracotta #8E4220, soft terracotta #F6E6DC
- Status: good #2D6A45 on #E6F1E8 (dot #3E8E5C); amber #85560A on #FBF0D9 (dot #D69A2D); red #9A3A24 on #F9E6DF (dot #C4553A); waiting #3F4B55 on #ECEEEC; missed #6B5440 on #F2ECE4
- Fonts: Fraunces (headings, serif), Figtree (body), Caveat (handwritten notes, sparingly)
- Rounded cards (18 to 28px), soft shadows, pill buttons, line icons (no emoji)
- Large readable sizes, tap targets at least 44px, one main action per screen
- Every screen stays calm, even red alerts: clear, never scary

Copy rules:
- Warm, simple English with small Indian touches (Ammi, Papa, Amma, khana, chai)
- No hyphens or dashes in UI copy
- Religion neutral greetings ("Hello", "Take care")

## Stack
- Next.js (App Router, TypeScript) on Vercel
- Tailwind CSS with the tokens above as theme values
- Supabase: Auth (Google + email magic link), Postgres, Row Level Security on every table
- Calls: Bolna (outbound voice calls, Indian numbers), webhook back to /api/bolna/webhook
- Summaries: an LLM turns each transcript into the structured summary below
- WhatsApp delivery: WhatsApp Business API provider (Meta Cloud API, Interakt or Gupshup; decide later, keep it behind one sendWhatsApp() function)
- Payments: Razorpay subscriptions
- Scheduling: Vercel Cron every 15 minutes picks parents whose call time is due

Secrets only in .env.local and Vercel env vars, never committed. Keep an .env.example.

## Data model (Supabase)
- profiles: id (auth user), name, whatsapp, created_at
- invite_codes: code, max_uses, used_count, active
- waitlist: name, whatsapp, parent_city, language, invite_code, created_at
- parents: id, user_id, name, call_name (what the child calls them, free text), phone, language, call_slot (morning/evening), call_time, medicines, watch_for, consent_at, paused, created_at
- calls: id, parent_id, scheduled_at, started_at, ended_at, duration_sec, status (scheduled/ringing/completed/no_answer/failed), attempt, bolna_call_id, transcript (json), language
- summaries: id, call_id, parent_id, status (good/amber/red), bullets (json), medicines, mood, food_sleep, watch_for_update, ask_today, parent_message, created_at
- subscriptions: user_id, status (trial/active/expired/cancelled), trial_ends_at, razorpay_subscription_id, current_period_end

## Rules for the summary
- Red only for possible emergencies (chest pain, fall, breathlessness, confusion, says they feel very unwell). Red sends the WhatsApp alert immediately and tells the parent to rest and that their child will call.
- Amber for missed medicine, tiredness, low mood, mild pain.
- Otherwise good. Always produce one "ask_today" question from something the parent actually said.
- No answer: retry twice, 15 minutes apart, then mark missed and message the child.
- Sona always introduces herself as a voice assistant calling on the child's behalf. Never asks for money, bank details or OTP.

## Working rules
- Small, reviewable changes. Show the diff before committing.
- Never redesign screens; match /design.
- Mobile first. Test at 390px and 1440px.
- Commit with clear messages and push to main only when I say "ship it".
