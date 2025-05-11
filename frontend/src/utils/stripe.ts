import { loadStripe } from '@stripe/stripe-js';

// Stripe publishable key - should be from environment variable in production
// Using hardcoded key for immediate testing
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51PsLBi2KVdaqmKxct7QZNSm3sIDkRm6ct4d9ppFmgM3WAqmzPV0nEbFEY5XR8TZOPbSjYiEXkPqQugIo1ei1RPrJY00Y5PrMe3F';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default stripePromise;
