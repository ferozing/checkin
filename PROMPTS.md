# Prompts to paste into Claude Code, one phase at a time

Wait for each phase to work before starting the next.

## Phase 1: Project and landing page
Read CLAUDE.md. Set up a Next.js + TypeScript + Tailwind project in this repo with the design tokens from CLAUDE.md. Build the landing page at / matching design/Main.dc.html exactly, including all animations. Every "Start free trial" button opens an invite code dialog: valid code goes to /signup, no code shows a "Message the founder on WhatsApp" button (wa.me/919629381945 with a prefilled message). Use a temporary hardcoded code list for now. Run it locally and tell me how to preview it.

## Phase 2: Supabase, sign up and onboarding
Read CLAUDE.md. Add Supabase. Create the tables from the data model with Row Level Security. Move invite codes to the invite_codes table. Build /signup (Google and email magic link) matching design/SignUp.dc.html, then onboarding steps 1 to 4 matching design/Onboard1..4.dc.html, saving to profiles and parents. Give me the exact steps to create the Supabase project and the env vars I need to add in Vercel.

## Phase 3: Dashboard, day view and plan
Read CLAUDE.md. Build /dashboard, /day/[id] and /plan matching the design files, reading from Supabase. Add a seed script with a week of realistic sample calls and summaries so I can see every status state.

## Phase 4: Real calls with Bolna
Read CLAUDE.md. Integrate Bolna: a Vercel Cron route every 15 minutes finds parents due for a call and starts an outbound call with a prompt built from their name, call_name, language, medicines and watch_for. Add /api/bolna/webhook to save the transcript, then generate the summary with the rules in CLAUDE.md. Add retries for no answer. Add a "Call now (test)" button on the dashboard. Tell me which keys I need from Bolna.

## Phase 5: WhatsApp delivery
Read CLAUDE.md. Add sendWhatsApp() and send the summary in the format of design/Message.dc.html after every call, and immediately for red. Start with a provider I can get approved fastest in India, and tell me the approval steps and message templates I need to submit.

## Phase 6: Payments
Read CLAUDE.md. Add Razorpay subscriptions: 3 day trial, then ₹499 per month. Plan page states as in design/Plan.dc.html. Pause calls automatically when a subscription expires.
