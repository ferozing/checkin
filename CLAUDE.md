# Checkin · by Fimo Labs

Read this file fully before any task. It is the source of truth for product, design, brand and stack.

## Product
Checkin makes a short, warm daily call to an adult's elderly parent on their normal phone (keypad phone or landline is fine). The caller is Sona, a voice assistant. After each call the adult child gets a short WhatsApp note:
- Status: All good / Worth a call today / Please call now / Didn't pick up
- Medicines taken or missed, mood, food, sleep
- One thing to ask the parent tonight, taken from what the parent actually said

Positioning: Checkin does NOT replace the child's call. It makes the child's own call better. Never write copy that suggests "you don't need to call anymore".

Users: only the adult child logs in (for now). Parents never install anything.
Price: 3 day free trial, then ₹399 per month per parent (UPI or card).
Launch is invite only. No code: WhatsApp the team at +91 96293 81945 (wa.me/919629381945).
The product name lives in ONE config value (APP_NAME = "Checkin"). Never hardcode it in components.

## URLs
- Product: checkin.fimolabs.com (this repo, Vercel, deploys from main)
- Parent company: fimolabs.com (separate repo, do not touch)

## Brand
Logo: "the c that speaks". Use files in /brand only, never redraw the logo.
- Header on light: brand/svg/checkin-logo.svg
- On dark: brand/svg/checkin-logo-on-dark.svg
- Favicon: brand/favicon.ico + brand/svg/checkin-favicon.svg
- Apple touch: brand/png/apple-touch-icon-180.png, PWA icons: brand/png/checkin-icon-192.png and 512
- WhatsApp profile photo: brand/png/whatsapp-profile-photo-640.png
The design files still show an older round tick logo. Always replace it with the /brand logo.

The kit lives under `public/brand`, so the paths above are also the public URLs
(`/brand/svg/checkin-logo.svg`).

## Design (must match)
Reference prototypes in /design (pixel reference only, never ship them; they use a template syntax with {{ }}, sc-for, sc-if, x-dc):
- design/landing.dc.html: marketing page at /
- design/app.dc.html: the whole logged in app, every screen in one file (switch by the `screen` value: login, onb1 to onb4, first, home, day, history, alerts, parent, plan)

Look and feel: "trust first". Calm, editorial, human. It must never look AI generated.
- Colours: paper #FFFDF9, sand #F6F0E6, soft panel #FBF7F0, line #ECE4D8, ink #191714, body text #4A443D, muted #6B6359
- Brand: ink #191714, cream #FFFDF9, orange #E8743F (logo). Primary buttons: #C2501D with white text
- Status: good #2D6A45 on #E6F1E8 (dot #3E8E5C); amber #85560A on #FBF0D9 (dot #D69A2D); red #9A3A24 on #F9E6DF; missed #6B5440 on #F2ECE4 (dot #9C8B78)
- WhatsApp mockups use real WhatsApp colours: header #008069, chat #EFEAE2, sent bubble #D9FDD3
- Fonts: Newsreader (headings, serif), Instrument Sans (everything else). Google Fonts via next/font
- Left aligned layouts, thin rules, radius 10 to 22px, very little animation, no gradients, no emoji in UI chrome, line icons only
- Tap targets at least 44px. Mobile first. Test at 390px and 1440px
- App layout: sidebar on desktop, sticky bottom tabs under 820px

Copy rules:
- Warm, simple English with small Indian touches (Amma, Papa, tiffin)
- No hyphens or dashes in any UI copy
- Religion neutral greetings
- Never claim things we can't prove (no fake numbers, no fake testimonials)

## Trust rules (product behaviour, not just copy)
- Sona always says she is a voice assistant calling on the child's behalf
- First call asks the parent's permission. If they say no, calls stop and the child is told
- Parent can stop calls any day by saying so
- Sona never asks for money, bank details or OTP, never gives medical advice
- Red alert (chest pain, fall, breathlessness, confusion, feeling very unwell): tell the parent to rest and that their child will call, send the WhatsApp alert the moment the call ends (not on the cron)
- Emergency line in UI: "In an emergency, call 112"
- Call recordings only if the parent agreed on the first call. Otherwise store transcript only

## Stack
- Next.js (App Router, TypeScript), Tailwind with the tokens above
- Supabase: Auth (Google + email magic link), Postgres, Row Level Security on every table
- Calls: Bolna, using our Vobiz number (env BOLNA_FROM_NUMBER). POST /call with agent_id, recipient_phone_number, from_phone_number, user_data, retry_config { enabled: true, max_retries: 2, retry_intervals_minutes: [15, 15] }. Webhook: /api/bolna/webhook
- Summaries: an LLM turns each transcript into the structured summary below (JSON output, validated)
- WhatsApp: Meta WhatsApp Cloud API behind one sendWhatsApp(to, template, params). Templates (utility, en): welcome, daily_summary, urgent_alert, no_answer, trial_ending. Webhook: /api/whatsapp/webhook
- Payments: Razorpay subscriptions
- Scheduling: Vercel Cron every 15 minutes picks parents whose call time is due
- Secrets only in .env.local and Vercel env vars. Keep .env.example updated

## Data model (Supabase)
- profiles: id (auth user), name, whatsapp, whatsapp_opt_in, created_at
- invite_codes: code, max_uses, used_count, active
- parents: id, user_id, name, call_name, phone, language, city, call_slot (morning/evening), call_time, first_call_at, medicines (json: name, when), watch_for (text[]), topics (text), consent_status (pending/given/declined), recording_consent (bool), paused, created_at
- family_members: id, parent_id, name, whatsapp, receives_alerts (max 2 per parent for now)
- calls: id, parent_id, scheduled_at, started_at, ended_at, duration_sec, status (scheduled/ringing/completed/no_answer/failed), attempt, is_test (bool), bolna_call_id, transcript (json), recording_url, language
- summaries: id, call_id, parent_id, status (good/amber/red/missed), headline, rows (json), medicines (json), mood, food_sleep, ask_today, accurate (bool, child feedback), created_at
- alerts: id, parent_id, summary_id, level (red/amber/missed), handled_at
- messages: id, user_id, template, status (sent/delivered/read/failed), wa_message_id, created_at
- subscriptions: user_id, parent_id, status (trial/active/expired/cancelled), trial_ends_at, razorpay_subscription_id, current_period_end

## Working rules
- Small, reviewable changes. Show me the diff before committing
- Never redesign screens. Match /design, but use the /brand logo
- Commit with clear messages. Push to main only when I say "ship it"
