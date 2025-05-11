const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

/**
 * @route   POST /api/payment/create-checkout-session
 * @desc    Create a Stripe checkout session
 * @access  Public
 */
router.post('/create-checkout-session', paymentController.createCheckoutSession);

/**
 * @route   GET /api/payment/verify
 * @desc    Verify a Stripe payment
 * @access  Public
 */
router.get('/verify', paymentController.verifyPayment);

module.exports = router;
