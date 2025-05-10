const { Together } = require('together-ai');
const chatModel = require('../models/chatModel');

// Get API key from environment variables or use the hardcoded key as fallback
const apiKey = process.env.TOGETHER_API_KEY || 'ff8e705333943065084a798f10fa65f1f71a1447d9f2fd86c0b7df5d76dba8df';

// Log API key status (not the actual key for security)
console.log('In chatController - API Key status:', apiKey ? 'Found' : 'Not found');

// Initialize Together client with API key
const togetherClient = new Together({
  apiKey: apiKey
});

/**
 * Handle a single chat message
 * @route POST /api/chat/message
 * @access Public
 */
const sendChatMessage = async (req, res) => {
  try {
    const { userId, message, model, systemMessage } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: 'userId and message are required' });
    }

    // Get or create session
    let session = chatModel.getChatSession(userId);
    if (!session) {
      session = chatModel.createChatSession(
        userId, 
        model || "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", 
        systemMessage || ""
      );
    }

    // Add user message to session
    chatModel.addMessageToChatSession(userId, "user", message);

    // Format messages for API
    const messages = chatModel.formatMessagesForAPI(session);

    // Send request to Together AI
    const response = await togetherClient.chat.completions.create({
      model: session.model,
      messages: messages,
    });

    // Store assistant response in session
    const assistantResponse = response.choices[0].message.content;
    chatModel.addMessageToChatSession(userId, "assistant", assistantResponse);

    // Return the response
    res.json({
      message: assistantResponse,
      conversationId: userId,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Error processing chat request', details: error.message });
  }
};

/**
 * Handle a streaming chat message
 * @route POST /api/chat/stream
 * @access Public
 */
const streamChatMessage = async (req, res) => {
  try {
    const { userId, message, model, systemMessage } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: 'userId and message are required' });
    }

    // Get or create session
    let session = chatModel.getChatSession(userId);
    if (!session) {
      session = chatModel.createChatSession(
        userId,
        model || "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        systemMessage || ""
      );
    }

    // Add user message to session
    chatModel.addMessageToChatSession(userId, "user", message);

    // Format messages for API
    const messages = chatModel.formatMessagesForAPI(session);

    // Set up streaming response headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Variable to collect the entire response
    let fullResponse = '';

    // Create streaming request to Together AI
    const stream = await togetherClient.chat.completions.create({
      model: session.model,
      messages: messages,
      stream: true,
    });

    // Handle the streaming response
    for await (const chunk of stream) {
      const content = chunk.choices[0].delta.content || '';
      fullResponse += content;
      
      // Send the chunk to the client
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }

    // Store the complete response in the session
    chatModel.addMessageToChatSession(userId, "assistant", fullResponse);

    // End the response
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Chat streaming error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
};

/**
 * Get chat history for a user
 * @route GET /api/chat/history/:userId
 * @access Public
 */
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const session = chatModel.getChatSession(userId);
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({
      userId: session.userId,
      messages: session.messages,
      model: session.model,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Error retrieving chat history', details: error.message });
  }
};

/**
 * Clear chat history for a user
 * @route DELETE /api/chat/history/:userId
 * @access Public
 */
const clearChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const success = chatModel.clearChatSession(userId);
    if (!success) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({ error: 'Error clearing chat history', details: error.message });
  }
};

module.exports = {
  sendChatMessage,
  streamChatMessage,
  getChatHistory,
  clearChatHistory
};
