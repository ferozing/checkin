# Supabase setup

Ten minutes, once. Until these steps are done the site still works: the invite
box falls back to the launch codes and `/signup` hands off to WhatsApp instead
of showing the sign up form.

## 1. Create the project

1. Go to supabase.com and create a project. Pick the **Singapore** region, it is
   the closest to users in India.
2. Save the database password somewhere safe. You will not need it for the app.

## 2. Create the tables

1. In the Supabase dashboard open **SQL Editor > New query**.
2. Paste the whole of `supabase/schema.sql` and run it.
3. Check **Table Editor**: you should see `profiles`, `invite_codes`, `waitlist`,
   `parents`, `calls`, `summaries` and `subscriptions`. Every one shows "RLS enabled".

The three launch invite codes (FAMILY2026, AMURA, FIRST50) are inserted for you.
To add more later:

```sql
insert into public.invite_codes (code, max_uses) values ('NEWCODE', 25);
```

## 3. Turn on the two sign in methods

**Email login links** are on by default. Check under
**Authentication > Sign In / Providers > Email** that "Email OTP" is enabled.

**Google:**

1. In Google Cloud Console create an OAuth 2.0 Client ID (type: Web application).
2. Add this authorised redirect URI, taking the value from Supabase
   **Authentication > Sign In / Providers > Google**:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. Paste the Client ID and Client Secret into that Supabase Google provider page
   and enable it.

## 4. Set the URLs Supabase is allowed to return to

Under **Authentication > URL Configuration**:

- **Site URL:** `https://checkin.fimolabs.com`
- **Redirect URLs:** add both
  - `https://checkin.fimolabs.com/auth/callback`
  - `http://localhost:3000/auth/callback`

Without these, login links and Google sign in come back to an error.

## 5. Add the env vars

From **Project Settings > API** copy the Project URL and the `anon` public key.

Locally, put them in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<the anon public key>
```

In Vercel, add the same two under **Settings > Environment Variables** for
**Production, Preview and Development**, then redeploy. The sign up form
appears automatically once they are set.

## 6. Check it works

1. Open `/` and enter an invite code. You should reach `/signup`.
2. Sign in with an email link or Google.
3. You land on `/onboarding/you` and walk through the four steps.
4. In Supabase **Table Editor**, `profiles` and `parents` have your rows, and
   `subscriptions` has a `trial` row.
