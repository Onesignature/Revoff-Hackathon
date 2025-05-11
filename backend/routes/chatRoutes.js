const express = require('express');
const router = express.Router();
const {
  sendChatMessage,
  streamChatMessage,
  getChatHistory,
  clearChatHistory,
  searchCarsWithAI
} = require('../controllers/chatController');

/**
 * @swagger
 * /api/chat/message:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Send a chat message
 *     description: Send a message to the AI and get a response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user
 *               message:
 *                 type: string
 *                 description: Message text to send to the AI
 *               model:
 *                 type: string
 *                 description: Optional AI model to use (defaults to Llama-4-Maverick)
 *               systemMessage:
 *                 type: string
 *                 description: Optional system message to provide context
 *     responses:
 *       200:
 *         description: AI response
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/message', sendChatMessage);

/**
 * @swagger
 * /api/chat/stream:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Send a message with streaming response
 *     description: Send a message to the AI and get a streamed response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user
 *               message:
 *                 type: string
 *                 description: Message text to send to the AI
 *               model:
 *                 type: string
 *                 description: Optional AI model to use
 *               systemMessage:
 *                 type: string
 *                 description: Optional system message to provide context
 *     responses:
 *       200:
 *         description: Stream of text fragments as event-stream
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/stream', streamChatMessage);

/**
 * @swagger
 * /api/chat/history/{userId}:
 *   get:
 *     tags:
 *       - Chat
 *     summary: Get chat history
 *     description: Retrieve the chat history for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique identifier for the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's chat history
 *       404:
 *         description: Chat session not found
 *       500:
 *         description: Server error
 */
router.get('/history/:userId', getChatHistory);

/**
 * @swagger
 * /api/chat/history/{userId}:
 *   delete:
 *     tags:
 *       - Chat
 *     summary: Clear chat history
 *     description: Delete the chat history for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique identifier for the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History cleared successfully
 *       404:
 *         description: Chat session not found
 *       500:
 *         description: Server error
 */
router.delete('/history/:userId', clearChatHistory);

/**
 * @swagger
 * /api/chat/car-search:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Search for cars using AI
 *     description: Send a car search query to the AI and get matching cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - query
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user
 *               query:
 *                 type: string
 *                 description: Car search query (budget, brand, features, etc.)
 *               model:
 *                 type: string
 *                 description: Optional AI model to use
 *               systemMessage:
 *                 type: string
 *                 description: Optional system message to provide additional context
 *     responses:
 *       200:
 *         description: JSON response with matching cars
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/car-search', searchCarsWithAI);

module.exports = router;
