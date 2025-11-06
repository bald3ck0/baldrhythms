import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface CheckoutOptions {
  priceId: string;
  userId?: string;
  vaultTier: 'Royal' | 'Imperial';
}

export async function redirectToCheckout({ priceId, userId, vaultTier }: CheckoutOptions) {
  const stripe = await stripePromise;

  if (!stripe) {
    console.error('Stripe failed to load');
    return;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const apiUrl = `${supabaseUrl}/functions/v1/create-checkout-session`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      metadata: {
        user_id: userId || 'guest',
        vault_tier: vaultTier,
      },
    }),
  });

  const session = await response.json();

  if (session.error) {
    console.error('Error creating checkout session:', session.error);
    return;
  }

  const result = await stripe.redirectToCheckout({
    sessionId: session.sessionId,
  });

  if (result.error) {
    console.error('Error redirecting to checkout:', result.error);
  }
}
