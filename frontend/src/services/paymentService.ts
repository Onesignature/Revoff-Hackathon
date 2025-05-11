/**
 * API service for payment-related operations
 */

// Backend API URL - adjust this to match your backend server's address and port
const API_URL = 'http://localhost:5000';

interface CheckoutSessionResponse {
  success: boolean;
  message?: string;
  checkoutSessionClientSecret?: string;
  sessionId?: string;
  checkoutUrl?: string;
}

/**
 * Creates a checkout session with Stripe
 * @param items - The items to checkout
 * @returns The checkout session response
 */
export const createCheckoutSession = async (items: any[]): Promise<CheckoutSessionResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items })
      // Removed credentials and mode options to simplify
    });

    const data = await response.json();
    
    if (!data.success) {
      console.error('Server returned error:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      message: 'Failed to create checkout session',
    };
  }
};

/**
 * Verifies a payment session
 * @param sessionId - The ID of the session to verify
 * @returns The verification response
 */
export const verifyPayment = async (sessionId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/payment/verify?sessionId=${sessionId}`);
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Payment verification failed:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      message: 'Failed to verify payment',
    };
  }
};
