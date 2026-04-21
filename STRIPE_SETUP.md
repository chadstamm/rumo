# RUMO Stripe Setup — Checklist

Code is built. Follow these steps once in Stripe Sandbox (Test mode), then again when flipping to Live.

## Progress (2026-04-21)

- [x] **1a. Product created** — `RUMO Annual` / $49 USD / Yearly
- [x] **STRIPE_PRICE_ID** = `price_1TOefHG88VrgK92M5Jpb3imw`
- [ ] 1b. API keys
- [ ] 1c. Webhook endpoint + signing secret
- [ ] 2. Supabase service_role key
- [ ] 3. Vercel env vars
- [ ] 4. Local `.env.local`
- [ ] 5. E2E test with 4242 4242 4242 4242
- [ ] 6. Flip to Live Mode

## 1. Stripe Dashboard — Sandbox (Test Mode)

Go to **https://dashboard.stripe.com** and make sure the toggle at top-left says **"Test mode"** / **"Sandbox"** (yellow banner).

### 1a. Create the product ✅ DONE

1. **Products** → **Add product**
2. Name: `RUMO Annual`
3. Description: `All six Context Anchors + Chart Your Course guided session + vault access. Renews annually.`
4. Pricing model: **Recurring**
5. Price: `$49.00 USD`
6. Billing period: **Yearly**
7. Save.
8. After save, **copy the Price ID** (starts with `price_...`). This is `STRIPE_PRICE_ID`.

**Captured:** `price_1TOefHG88VrgK92M5Jpb3imw`

### 1b. Get API keys

1. **Developers** → **API keys**
2. Copy the **Publishable key** (`pk_test_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy the **Secret key** (`sk_test_...`) → `STRIPE_SECRET_KEY`

### 1c. Set up the webhook endpoint (AFTER deploying code)

Wait until the new code is deployed to Vercel (already pushed — should be live in ~40s). Then:

1. **Developers** → **Webhooks** → **Add endpoint**
2. URL: `https://withrumo.com/api/stripe/webhook`
3. Events to send (click **Select events**):
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Click **Add endpoint**.
5. On the endpoint page, click **Reveal** next to Signing secret. Copy (`whsec_...`) → `STRIPE_WEBHOOK_SECRET`

## 2. Supabase Service Role Key

Needed so the webhook can write to `profiles` and `subscriptions` tables (bypassing RLS).

1. Supabase Dashboard → **Project Settings** → **API**
2. Scroll to **Project API keys**
3. Copy the **`service_role`** key (warning: this is a secret — never expose to client)
4. → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Env Vars — add to Vercel

Go to **https://vercel.com/chad-stamms-projects/rumo/settings/environment-variables** and add each as **Production** (and Preview if you want test mode on preview deploys):

| Key | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_...` (or `sk_live_...` when flipping to prod) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (or `pk_live_...`) |
| `STRIPE_PRICE_ID` | `price_...` from step 1a |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` from step 1c |
| `SUPABASE_SERVICE_ROLE_KEY` | from step 2 |
| `NEXT_PUBLIC_SITE_URL` | `https://withrumo.com` |

**Redeploy** after adding them (Vercel → Deployments → `...` menu → Redeploy) so they're picked up.

## 4. Local `.env.local` (for dev)

Add the same keys to `/Users/chadstamm/Desktop/Claude Code Projects/rumo/.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For local webhook testing, install the Stripe CLI:

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The CLI prints a `whsec_...` secret — use that as `STRIPE_WEBHOOK_SECRET` for local dev only.

## 5. Test the full flow (Test Mode)

1. Visit `https://withrumo.com/pricing`
2. Click **Chart Your Course · $49/year**
3. If not signed in → redirected to `/login`. Create an account or sign in.
4. Click the button again — you'll be redirected to Stripe Hosted Checkout.
5. Pay with **test card: `4242 4242 4242 4242`** + any future expiry + any CVV + any ZIP.
6. Submit. Stripe redirects to `https://withrumo.com/success`.
7. Verify:
   - Supabase `profiles` row has `subscription_status = 'active'`
   - Supabase `subscriptions` row was inserted with `status = 'active'`
   - Visit `/anchors/codex` or another paid anchor — should load instead of hitting the paywall.

### Other test cards for edge cases

| Scenario | Card |
|---|---|
| Requires 3D Secure | `4000 0025 0000 3155` |
| Declined | `4000 0000 0000 0002` |
| Insufficient funds | `4000 0000 0000 9995` |

## 6. Flip to Live Mode

When ready for real payments:

1. Create the product + price in **Live mode** (repeat step 1a in live)
2. Get **live** API keys (step 1b, but `sk_live_` / `pk_live_`)
3. Create the webhook endpoint in **live mode** (step 1c, same URL, new signing secret)
4. Update the six Stripe env vars in Vercel with live values
5. Redeploy
6. Make a real $49 purchase on yourself as the final smoke test. Refund from dashboard if you want the money back (or keep it — it's $49).

## Known limits / post-launch

- No billing portal yet (users can't cancel from inside Rumo). They can cancel via the Stripe-emailed invoice or by contacting support. Add the portal post-launch via `/api/stripe/portal`.
- No proration or plan switching (single price).
- Refund handling is webhook-capable via `customer.subscription.deleted` (marks profile expired) but there's no UX for partial refunds.
- Upgrade button is only on `/pricing` — consider adding it on the Vault page next to any locked Pro anchor.
