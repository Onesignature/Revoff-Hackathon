/**
 * Chat model for interaction with Together AI's API
 * This module manages the chat interactions, including message history and responses
 */

/**
 * Chat session schema
 * @typedef {Object} ChatSession
 * @property {string} userId - ID of the user
 * @property {Array<Message>} messages - Array of messages
 * @property {string} model - Model being used for chat
 * @property {Date} createdAt - When the session was created
 * @property {Date} updatedAt - When the session was last updated
 */

/**
 * Message schema
 * @typedef {Object} Message
 * @property {string} role - Role of the message sender (user, assistant, system)
 * @property {string} content - Content of the message
 * @property {Date} timestamp - When the message was sent
 */

/**
 * Simple in-memory storage for chat sessions
 * In a production environment, this would be replaced with a database
 */
const chatSessions = new Map();

/**
 * Create a new chat session
 * @param {string} userId - ID of the user
 * @param {string} model - Model to use for chat
 * @param {string} systemMessage - Optional system message to set context
 * @returns {ChatSession} The created chat session
 */
const createChatSession = (userId, model = "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", systemMessage = "") => {
  const session = {
    userId,
    messages: [],
    model,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Add system message if provided
  if (systemMessage) {
    session.messages.push({
      role: "system",
      content: systemMessage,
      timestamp: new Date()
    });
  }

  chatSessions.set(userId, session);
  return session;
};

/**
 * Get a chat session by user ID
 * @param {string} userId - ID of the user
 * @returns {ChatSession|null} The chat session or null if not found
 */
const getChatSession = (userId) => {
  return chatSessions.get(userId) || null;
};

/**
 * Add a message to a chat session
 * @param {string} userId - ID of the user
 * @param {string} role - Role of the message sender (user, assistant, system)
 * @param {string} content - Content of the message
 * @returns {ChatSession|null} Updated chat session or null if session not found
 */
const addMessageToChatSession = (userId, role, content) => {
  const session = chatSessions.get(userId);
  if (!session) return null;

  session.messages.push({
    role,
    content,
    timestamp: new Date()
  });

  session.updatedAt = new Date();
  chatSessions.set(userId, session);
  return session;
};

/**
 * Format chat session messages for the Together API
 * @param {ChatSession} session - The chat session
 * @returns {Array<Object>} Formatted messages for the API
 */
const formatMessagesForAPI = (session) => {
  return session.messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

/**
 * Clear a chat session
 * @param {string} userId - ID of the user
 * @returns {boolean} True if session was cleared, false if not found
 */
const clearChatSession = (userId) => {
  if (!chatSessions.has(userId)) return false;
  return chatSessions.delete(userId);
};

module.exports = {
  createChatSession,
  getChatSession,
  addMessageToChatSession,
  formatMessagesForAPI,
  clearChatSession
};
