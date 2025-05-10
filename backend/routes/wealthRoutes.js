const express = require('express');
const router = express.Router();
const {
  analyzePortfolio,
  getUserPortfolio,
  getMarketInsights
} = require('../controllers/wealthController');

/**
 * @swagger
 * /api/wealth/analyze:
 *   post:
 *     tags:
 *       - Wealth
 *     summary: Analyze portfolio
 *     description: Analyze user's portfolio and provide AI-powered insights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user
 *               analysisType:
 *                 type: string
 *                 description: Type of analysis to perform (risk, opportunity, performance, or comprehensive)
 *                 enum: [risk, opportunity, performance]
 *     responses:
 *       200:
 *         description: Analysis results
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/analyze', analyzePortfolio);

/**
 * @swagger
 * /api/wealth/portfolio/{userId}:
 *   get:
 *     tags:
 *       - Wealth
 *     summary: Get user portfolio
 *     description: Retrieve the portfolio data for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique identifier for the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's portfolio data
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: Server error
 */
router.get('/portfolio/:userId', getUserPortfolio);

/**
 * @swagger
 * /api/wealth/insights/{userId}:
 *   get:
 *     tags:
 *       - Wealth
 *     summary: Get market insights
 *     description: Retrieve AI-generated market insights for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique identifier for the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: analysisType
 *         required: false
 *         description: Type of analysis (risk, opportunity, performance, or comprehensive)
 *         schema:
 *           type: string
 *           enum: [risk, opportunity, performance]
 *     responses:
 *       200:
 *         description: Market insights
 *       404:
 *         description: Insights not found
 *       500:
 *         description: Server error
 */
router.get('/insights/:userId', getMarketInsights);

module.exports = router;