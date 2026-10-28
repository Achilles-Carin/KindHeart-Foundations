import { loadStripe, type Appearance } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

// null when the key is missing, so the page still renders and shows a friendly notice.
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export const stripeAppearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#1f5a40',
    colorText: '#13241b',
    colorDanger: '#b3261e',
    fontFamily: 'Figtree, system-ui, sans-serif',
    borderRadius: '8px',
    spacingUnit: '4px',
  },
};
