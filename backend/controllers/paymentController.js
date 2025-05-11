const Stripe = require('stripe');
const path = require('path');
const dotenv = require('dotenv');

// Ensure environment variables are loaded
dotenv.config();

// Get the Stripe key and hardcode it here for immediate testing
// IMPORTANT: Replace this with environment variable in production
const apiKey = 'sk_test_51PsLBi2KVdaqmKxc6lriVW9pWF4sUfOAV07RnIpOLfCg9JmujHGRIsFpKl7uIOXMbuHCA7VMuvIdrj0tXug2Lu6000n3dqIE5R';

console.log("Using hardcoded Stripe key for testing");

// Initialize Stripe with your secret key
const stripe = Stripe(apiKey);

/**
 * Create a Stripe Checkout Session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !items.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide items to checkout' 
      });
    }
    
    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'aed',
        product_data: {
          name: item.name || 'Car Rental',
          // Skip images as they are relative paths and not full URLs
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: 1,
    }));

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/app/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/app/cart`,
    });

    res.json({ 
      success: true, 
      checkoutSessionClientSecret: session.client_secret,
      sessionId: session.id,
      checkoutUrl: session.url
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating checkout session',
      error: error.message 
    });
  }
};

/**
 * Verify a Stripe payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Payment was successful
      return res.status(200).json({
        success: true,
        message: 'Payment was successful',
        session
      });
    } else {
      // Payment was not successful
      return res.status(400).json({
        success: false,
        message: 'Payment was not successful',
        session
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};
