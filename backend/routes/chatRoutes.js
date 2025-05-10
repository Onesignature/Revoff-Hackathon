const express = require('express');
const router = express.Router();
const {
  sendChatMessage,
  streamChatMessage,
  getChatHistory,
  clearChatHistory
} = require('../controllers/chatController');

/**
 * Chat routes
 */

// Send a single message and get a response
router.post('/message', sendChatMessage);

// Send a message and get a streaming response
router.post('/stream', streamChatMessage);

// Get chat history for a user
router.get('/history/:userId', getChatHistory);

// Clear chat history for a user
router.delete('/history/:userId', clearChatHistory);

module.exports = router;
