# KindHeart Foundation

A student-built nonprofit website concept (React 19 + TypeScript + Vite) with a real Stripe card checkout running in **test mode**. No real money is ever charged.

## Stack
- React 19, React Router 7, TypeScript, Vite
- `@stripe/react-stripe-js` + `@stripe/stripe-js` (Payment Element)
- `stripe` (Node SDK) inside a Vercel serverless function: `api/create-payment-intent.ts`
- `lucide-react` icons, Bricolage Grotesque + Figtree (Google Fonts)

## 1. Get Stripe test keys (free)
1. Create an account at https://dashboard.stripe.com and stay in **Test mode**.
2. Developers -> API keys -> copy the **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`).

## 2. Run locally
```bash
npm install
cp .env.example .env.local      # paste both keys into .env.local
npm i -g vercel                 # once
vercel dev                      # runs the site AND /api together
```
Plain `npm run dev` shows the site, but `/api/create-payment-intent` only exists under `vercel dev` or on Vercel.

## 3. Deploy to Vercel
1. Push the repo to GitHub.
2. Vercel -> Add New Project -> import the repo (preset: Vite).
3. Settings -> Environment Variables: add `VITE_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` (Production + Preview).
4. Deploy. `vercel.json` makes `/about` work on refresh.

## Test cards
| Result | Card number |
|---|---|
| Success | 4242 4242 4242 4242 |
| Declined | 4000 0000 0000 0002 |
| 3-D Secure | 4000 0025 0000 3155 |

Use any future expiry and any 3-digit CVC.

## Photos
Put real photos in `src/assets/photos/` named `hero`, `food`, `education`, `outreach`, `family`, `about` (`.jpg`, `.png`, or `.webp`). Missing files fall back to drawn illustrations. Update the `alt` text in `src/pages/Home.tsx` and `About.tsx` to describe your actual photos.

## Notes
- The secret key lives only on the server. Never prefix it with `VITE_`.
- The server re-validates amount (whole pesos, PHP 20 to 100,000), fund, and email.
- Stripe does not officially support Philippine business accounts. Test mode works for demos; real PH payouts would need a supported account or another provider (e.g. PayMongo).
- The volunteer form is a front-end demo: nothing is sent or stored.
