# Prompts for Claude Code, one phase at a time

Paste one phase. Check it works on the Vercel preview. Then the next.

## Phase 1: Landing page
Read CLAUDE.md. Set up Next.js + TypeScript + Tailwind with the tokens from CLAUDE.md and the fonts Newsreader and Instrument Sans. Build / exactly like design/landing.dc.html, with the /brand logo, favicon and Open Graph tags. Photo slots stay as clean placeholders I can swap later (public/photos/). Invite code box and WhatsApp links work. Show me how to preview locally.

## Phase 2: Auth and onboarding
Read CLAUDE.md. Add Supabase with every table from the data model and Row Level Security. Build /login and onboarding steps 1 to 4 exactly like design/app.dc.html (screens login, onb1, onb2, onb3, onb4), saving to profiles and parents. Invite codes checked against invite_codes. Then the "first call booked" screen (screen first). Give me the Supabase setup steps and the env vars for Vercel.

## Phase 3: The app screens
Read CLAUDE.md. Build the logged in app exactly like design/app.dc.html: /app (home), /app/day/[id], /app/notes, /app/alerts, /app/parent, /app/plan. Sidebar on desktop, bottom tabs on mobile. Add a seed script with a month of realistic calls, summaries and one red alert so I can see every state.

## Phase 4: Real calls with Bolna
Read CLAUDE.md. Vercel Cron every 15 minutes finds parents due for a call and calls Bolna POST /call (from BOLNA_FROM_NUMBER, user_data with name, call_name, language, medicines, watch_for, topics, retry_config as in CLAUDE.md). /api/bolna/webhook saves the transcript and recording, generates the summary with the LLM, creates alerts. First call must ask consent and store consent_status. Build "Get a test call on my phone" (is_test calls, never billed, never shown in history). Tell me the keys I need.

## Phase 5: WhatsApp
Read CLAUDE.md. sendWhatsApp() on Meta Cloud API. Send welcome after onboarding, daily_summary after each completed call, urgent_alert immediately on red, no_answer after the last retry, trial_ending 1 day before. Send to the user and family_members. /api/whatsapp/webhook verifies with WHATSAPP_VERIFY_TOKEN and stores delivery status in messages. Only send if whatsapp_opt_in is true.

## Phase 6: Payments
Read CLAUDE.md. Razorpay subscriptions: 3 day trial, then ₹399 per month per parent, UPI first. Plan screen states as in design/app.dc.html (screen plan). Pause calls automatically when a subscription expires, and message the user.

## Legal pages
Read CLAUDE.md. Add /privacy, /terms, /refunds and /contact in the same design. Business: FIMO LABS, Udyam registered, Andhra Pradesh, India. Contact on WhatsApp +91 96293 81945. Cover call recording consent, data deletion and export, and that Checkin is not an emergency or medical service. Leave [ ] placeholders for anything I must confirm.
