import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { AlertCircle, CheckCircle2, Info, Loader2, XCircle } from 'lucide-react';
import Button from './Button';
import StripeCheckout from './StripeCheckout';
import { stripeAppearance, stripePromise } from '../lib/stripe';
import { formatPeso } from '../lib/format';

// Keep MIN/MAX/FUNDS in sync with api/create-payment-intent.ts
const PRESETS = [100, 250, 500, 1000];
const MIN = 20;
const MAX = 100_000;
const FUNDS = [
  'Where it is needed most',
  'Food Assistance',
  'Education Support',
  'Family and Youth',
  'Community Outreach',
];

type Stage =
  | { name: 'details' }
  | { name: 'creating' }
  | { name: 'paying'; clientSecret: string }
  | { name: 'success'; processing: boolean }
  | { name: 'canceled' }
  | { name: 'failed'; message: string };

function ResultPanel({
  tone,
  icon,
  title,
  children,
}: {
  tone: 'success' | 'neutral' | 'error';
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={`result result-${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {icon}
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default function DonateForm() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [stage, setStage] = useState<Stage>({ name: 'details' });
  const [preset, setPreset] = useState<number | 'custom'>(250);
  const [custom, setCustom] = useState('');
  const [fund, setFund] = useState(FUNDS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);

  const amount = preset === 'custom' ? Number(custom) : preset;
  const donor = name.trim().split(' ')[0];

  // Some payment methods return the donor to the site after authentication.
  useEffect(() => {
    const secret = new URLSearchParams(search).get('payment_intent_client_secret');
    if (!secret || !stripePromise) return;
    let active = true;
    stripePromise
      .then((stripe) => stripe?.retrievePaymentIntent(secret))
      .then((result) => {
        if (!active || !result?.paymentIntent) return;
        const { status, amount: cents } = result.paymentIntent;
        setPaidAmount(cents / 100);
        if (status === 'succeeded') setStage({ name: 'success', processing: false });
        else if (status === 'processing') setStage({ name: 'success', processing: true });
        else setStage({ name: 'failed', message: 'The payment was not completed, so no money was taken. You can try again.' });
        navigate({ pathname: '/', hash: '#donate' }, { replace: true });
      });
    return () => {
      active = false;
    };
  }, [search, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!Number.isInteger(amount) || amount < MIN || amount > MAX) {
      setError(`Enter a whole-peso amount between ${formatPeso(MIN)} and ${formatPeso(MAX)}.`);
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('That email address does not look right. Fix it or leave it blank.');
      return;
    }
    setError('');
    setStage({ name: 'creating' });

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          fund,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.clientSecret) {
        throw new Error(
          data?.error ??
            (res.status === 404
              ? 'The payment server was not found. Run the site with "vercel dev" or deploy it to Vercel.'
              : 'We could not start the payment. Please try again.'),
        );
      }
      setPaidAmount(amount);
      setStage({ name: 'paying', clientSecret: data.clientSecret });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not start the payment. Please try again.');
      setStage({ name: 'details' });
    }
  }

  const reset = () => {
    setError('');
    setStage({ name: 'details' });
  };

  if (stage.name === 'success') {
    return (
      <div className="form-card">
        <ResultPanel
          tone="success"
          icon={<CheckCircle2 size={36} aria-hidden="true" />}
          title={donor ? `Thank you, ${donor}.` : 'Thank you.'}
        >
          <p>
            {stage.processing
              ? `Your test donation of ${formatPeso(paidAmount)} is still processing.`
              : `Your test donation of ${formatPeso(paidAmount)} went through.`}{' '}
            This is Stripe test mode, so no real money was charged.
          </p>
          <Button variant="outline" onClick={reset}>
            Make another test donation
          </Button>
        </ResultPanel>
      </div>
    );
  }

  if (stage.name === 'canceled') {
    return (
      <div className="form-card">
        <ResultPanel tone="neutral" icon={<XCircle size={36} aria-hidden="true" />} title="Payment canceled">
          <p>You were not charged. Your details are still here if you want to try again.</p>
          <Button onClick={reset}>Back to donation details</Button>
        </ResultPanel>
      </div>
    );
  }

  if (stage.name === 'failed') {
    return (
      <div className="form-card">
        <ResultPanel tone="error" icon={<AlertCircle size={36} aria-hidden="true" />} title="Payment not completed">
          <p>{stage.message}</p>
          <Button onClick={reset}>Try again</Button>
        </ResultPanel>
      </div>
    );
  }

  if (stage.name === 'paying' && stripePromise) {
    return (
      <div className="form-card">
        <div className="pay-summary">
          <p>
            <strong>{formatPeso(paidAmount)}</strong> to {fund}
          </p>
          <button type="button" className="text-button" onClick={reset}>
            Change
          </button>
        </div>
        <Elements stripe={stripePromise} options={{ clientSecret: stage.clientSecret, appearance: stripeAppearance }}>
          <StripeCheckout
            amount={paidAmount}
            onSuccess={(processing) => setStage({ name: 'success', processing })}
            onCancel={() => setStage({ name: 'canceled' })}
          />
        </Elements>
      </div>
    );
  }

  const busy = stage.name === 'creating';

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate aria-busy={busy}>
      <fieldset className="chips">
        <legend>Amount (PHP)</legend>
        {PRESETS.map((p) => (
          <label key={p}>
            <input type="radio" name="amount" checked={preset === p} onChange={() => setPreset(p)} />
            <span>{formatPeso(p)}</span>
          </label>
        ))}
        <label>
          <input type="radio" name="amount" checked={preset === 'custom'} onChange={() => setPreset('custom')} />
          <span>Custom</span>
        </label>
      </fieldset>

      {preset === 'custom' && (
        <div className="field">
          <label htmlFor="donate-custom">Your amount</label>
          <div className="input-prefix">
            <span aria-hidden="true">₱</span>
            <input
              id="donate-custom"
              type="number"
              inputMode="numeric"
              min={MIN}
              max={MAX}
              step={1}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              aria-describedby="donate-custom-hint"
            />
          </div>
          <p id="donate-custom-hint" className="field-hint">
            Whole pesos, from {formatPeso(MIN)} to {formatPeso(MAX)}.
          </p>
        </div>
      )}

      <div className="field">
        <label htmlFor="donate-fund">Direct my gift to</label>
        <select id="donate-fund" value={fund} onChange={(e) => setFund(e.target.value)}>
          {FUNDS.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="donate-name">Name (optional)</label>
          <input id="donate-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="donate-email">Email (optional)</label>
          <input id="donate-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {error && (
        <p className="form-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      {!stripePromise && (
        <p className="form-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>Payments are not set up yet. Add VITE_STRIPE_PUBLISHABLE_KEY to .env.local (see the README).</span>
        </p>
      )}

      <Button type="submit" variant="accent" block disabled={busy || !stripePromise}>
        {busy ? (
          <>
            <Loader2 size={18} className="spin" aria-hidden="true" /> Setting up secure payment
          </>
        ) : (
          'Continue to payment'
        )}
      </Button>

      <p className="form-note test-note">
        <Info size={16} aria-hidden="true" />
        <span>
          Stripe test mode: use card <strong>4242 4242 4242 4242</strong>, any future expiry, any CVC. No real money is charged.
        </span>
      </p>
    </form>
  );
}
