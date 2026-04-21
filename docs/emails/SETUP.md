# Supabase Email Template Setup

After each email template change, the Supabase dashboard needs the new HTML pasted in. Supabase stores its own copy — the repo file is the source of truth for version control, but the dashboard is what actually goes out.

## Steps

1. **Generate/update a branded PNG** (if logo changes)
   ```bash
   node scripts/svg-to-email-png.mjs
   ```
   Writes `public/rumo-logo-email.png`. Push to deploy so the email can load the image from `https://www.withrumo.com/rumo-logo-email.png`.

2. **Supabase Dashboard → Authentication → URL Configuration**
   - **Site URL:** `https://www.withrumo.com`
   - **Redirect URLs:** add both (if not already present):
     - `https://www.withrumo.com/auth/callback`
     - `https://www.withrumo.com/auth/callback?*` (allows query params)

3. **Supabase Dashboard → Authentication → Email Templates → Magic Link**
   - Paste the full contents of `docs/emails/magic-link.html` into the **Message (HTML)** field
   - **Subject:** `Your link to RUMO`
   - Save

4. **Also update "Confirm Signup" template** to the same HTML
   Supabase sends this template (not "Magic Link") when someone enters a new email at `/auth/login`. For our UX, both should look identical — we only use magic links, no passwords.

## Why we use token-hash URL (not `{{ .ConfirmationURL }}`)

The default `{{ .ConfirmationURL }}` uses Supabase's PKCE flow — it stores a verifier cookie in the browser that initiated the sign-in. If the user clicks the email link in a different browser (e.g., paid on desktop, checks email on phone), the verifier isn't present and the sign-in fails.

Our template builds the URL manually:
```
{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=magiclink&next=/vault
```

This uses `verifyOtp` in the callback — no cookie dependency, works cross-device.

## Testing

After updating the template:

1. Open an incognito window → `/auth/login`
2. Enter a test email
3. In a **different browser** (or your phone), open the inbox
4. Click the link
5. Should land at `/vault` authenticated

If it fails: check the URL bar. `?error=auth` = callback couldn't verify. Most common cause: token already consumed (click only once) or Supabase template still pointing at `{{ .ConfirmationURL }}`.
