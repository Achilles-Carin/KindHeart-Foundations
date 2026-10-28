import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Keep these in sync with src/components/DonateForm.tsx
const MIN_PESOS = 20;
const MAX_PESOS = 100_000;
const FUNDS = [
  'Where it is needed most',
  'Food Assistance',
  'Education Support',
  'Family and Youth',
  'Community Outreach',
];

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(503).json({
      error: 'Payments are not configured yet. Add STRIPE_SECRET_KEY to the server environment.',
    });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const { amount, fund, name, email } = (body ?? {}) as {
    amount?: unknown;
    fund?: unknown;
    name?: unknown;
    email?: unknown;
  };

  // Never trust the client: re-validate everything here.
  if (typeof amount !== 'number' || !Number.isInteger(amount) || amount < MIN_PESOS || amount > MAX_PESOS) {
    return res.status(400).json({
      error: `Please choose a whole-peso amount between ₱${MIN_PESOS} and ₱${MAX_PESOS.toLocaleString('en-PH')}.`,
    });
  }
  if (typeof fund !== 'string' || !FUNDS.includes(fund)) {
    return res.status(400).json({ error: 'Please choose a valid fund.' });
  }
  const donorName = typeof name === 'string' ? name.trim().slice(0, 80) : '';
  const donorEmail = typeof email === 'string' ? email.trim() : '';
  if (donorEmail && !EMAIL_RE.test(donorEmail)) {
    return res.status(400).json({ error: 'That email address does not look right.' });
  }

  try {
    const stripe = new Stripe(secretKey);
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100, // PHP is a two-decimal currency: pesos -> centavos
      currency: 'php',
      allowed_payment_method_types: ['card'],
      description: `KindHeart Foundation test donation (${fund})`,
      receipt_email: donorEmail || undefined,
      metadata: { fund, donor_name: donorName },
    });
    return res.status(200).json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    const message = err instanceof Stripe.errors.StripeError ? err.message : 'Could not start the payment.';
    return res.status(502).json({ error: message });
  }
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
