# Supabase setup

Once, about ten minutes. Until it is done the site still works: the landing page
is fully live, and `/login` says sign in is not switched on yet rather than
showing a form that cannot work.

## 1. Create the project

Create a project at supabase.com in the **Singapore** region, the closest to
users in India. Keep the database password somewhere safe; the app does not use
it, but migrations do.

## 2. Create the tables

**SQL Editor > New query**, paste the whole of `supabase/schema.sql`, run it.

In **Table Editor** you should then see `profiles`, `invite_codes`, `parents`,
`family_members`, `calls`, `summaries`, `alerts`, `messages` and
`subscriptions`, each marked "RLS enabled".

The three launch invite codes are inserted for you. To add more:

```sql
insert into public.invite_codes (code, max_uses) values ('NEWCODE', 25);
```

## 3. Turn on the two sign in methods

**Email links** are on by default. Check **Authentication > Sign In / Providers
> Email** that "Email OTP" is enabled.

**Google:**

1. In Google Cloud Console create an OAuth 2.0 Client ID (Web application).
2. Add the authorised redirect URI shown on Supabase's Google provider page:
   `https://<project-ref>.supabase.co/auth/v1/callback`
3. Paste the Client ID and Secret into that page and enable it.

## 4. Allow our URLs back

**Authentication > URL Configuration**:

- **Site URL:** `https://checkin.fimolabs.com`
- **Redirect URLs:** add both
  - `https://checkin.fimolabs.com/auth/callback`
  - `http://localhost:3000/auth/callback`

Without these, sign in links come back to an error.

## 5. Env vars

From **Project Settings > API** copy the Project URL and the `anon` public key.

`.env.local` for development:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
```

In Vercel, add the same two under **Settings > Environment Variables** for
Production, Preview and Development, then redeploy. The sign in form appears by
itself once they are set.

The anon key is meant to be public; Row Level Security is what protects the
data. Never put the `service_role` key in a `NEXT_PUBLIC_` variable.

## 6. Check it

1. Open `/`, enter an invite code, you land on `/login` with the code carried.
2. Sign in with an email link or Google.
3. You land on `/onboarding/you` with the code prefilled, and walk the four steps.
4. In **Table Editor**: `profiles` has your row, `parents` has your parent with
   medicines and watch_for filled, and `subscriptions` has a `trial` row.
5. `invite_codes.used_count` for your code has gone up by one.
