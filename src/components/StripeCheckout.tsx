import { useState, type FormEvent } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AlertCircle, Loader2, Lock } from 'lucide-react';
import Button from './Button';
import { formatPeso } from '../lib/format';

type Props = {
  amount: number;
  onSuccess: (processing: boolean) => void;
  onCancel: () => void;
};

export default function StripeCheckout({ amount, onSuccess, onCancel }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || busy) return;
    setBusy(true);
    setError('');

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/` },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message ?? 'The payment did not go through. Please check your card and try again.');
      setBusy(false);
      return;
    }
    if (paymentIntent?.status === 'succeeded') {
      onSuccess(false);
    } else if (paymentIntent?.status === 'processing') {
      onSuccess(true);
    } else {
      setError('The payment is not complete yet. Please try again.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {!ready && <div className="stripe-skeleton" aria-hidden="true" />}
      <PaymentElement
        options={{ layout: 'tabs' }}
        onReady={() => setReady(true)}
        onLoadError={() => setError('The secure card form could not load. Check your connection and try again.')}
      />

      {error && (
        <p className="form-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      <div className="form-actions">
        <Button type="submit" variant="accent" block disabled={!stripe || !ready || busy}>
          {busy ? (
            <>
              <Loader2 size={18} className="spin" aria-hidden="true" /> Processing payment
            </>
          ) : (
            <>Pay {formatPeso(amount)}</>
          )}
        </Button>
        <Button variant="outline" block onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
      </div>
      <p className="form-note">
        <Lock size={14} aria-hidden="true" /> Card details go straight to Stripe. KindHeart never sees or stores them.
      </p>
    </form>
  );
}
