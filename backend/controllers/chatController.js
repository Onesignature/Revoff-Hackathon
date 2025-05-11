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

/**
 * Handle car search queries
 * @route POST /api/chat/car-search
 * @access Public
 */
const searchCarsWithAI = async (req, res) => {
  try {
    const { userId, query, model, systemMessage } = req.body;

    if (!userId || !query) {
      return res.status(400).json({ error: 'userId and query are required' });
    }

    // Import wealth model to get car data
    const wealthModel = require('../models/wealthModel');
    const carData = wealthModel.getAllVehicles();

    // Get or create session
    let session = chatModel.getChatSession(userId);
    if (!session) {
      session = chatModel.createChatSession(
        userId,
        model || "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        systemMessage || ""
      );
    }

    // Create a system message with car data and instructions
    const enhancedSystemMessage = `
You are a car search assistant. Help the user find cars that match their requirements.
Below is the car data available in our system. Use this data to find the best matches.
${JSON.stringify(carData)}

IMPORTANT INSTRUCTIONS:
1. Analyze the user's query and find the best matching cars from the data provided.
2. Return a JSON response with matched cars, including id, name, type, basePrice, imageUrl, and description.
3. Include a reasoning field explaining why these cars match the user's criteria.
4. Format your entire response as valid JSON without any additional text.
5. Limit results to a maximum of 3 cars.
6. The response must be in the following structure:
{
  "matches": [
    {
      "id": "car_id",
      "name": "Car Name",
      "type": "Car Type",
      "price": price_number,
      "imageUrl": "image_url",
      "description": "car description"
    }
  ],
  "reasoning": "Why these cars match the search criteria"
}
`;

    // Add user query to session
    chatModel.addMessageToChatSession(userId, "user", query);
    
    // Add one-time system message with car data
    const enhancedMessages = [
      { role: "system", content: enhancedSystemMessage },
      { role: "user", content: query }
    ];

    // Send request to Together AI
    const response = await togetherClient.chat.completions.create({
      model: session.model,
      messages: enhancedMessages,
      temperature: 0.2, // Lower temperature for more precise, deterministic results
    });

    // Get the AI response
    const aiResponse = response.choices[0].message.content;
    
    // Store assistant response in session
    chatModel.addMessageToChatSession(userId, "assistant", aiResponse);    try {
      // Parse the response as JSON
      const jsonResponse = JSON.parse(aiResponse);
      
      // Ensure all car objects have the required fields
      if (jsonResponse.matches && Array.isArray(jsonResponse.matches)) {
        jsonResponse.matches = jsonResponse.matches.map(car => ({
          id: car.id || `car-${Math.random().toString(36).substring(2, 9)}`,
          name: car.name || 'Unknown Model',
          type: car.type || 'Vehicle',
          basePrice: car.basePrice || car.price || 300000,
          price: car.price || car.basePrice || 300000,
          imageUrl: car.imageUrl || 'mercedes/cle.jpg',
          description: car.description || 'No description available',
          monthlyRent: car.monthlyRent || Math.round((car.price || car.basePrice || 300000) * 0.03)
        }));
      }
      
      res.json(jsonResponse);
    } catch (jsonError) {
      console.error('Error parsing AI response as JSON:', jsonError);
      res.json({ 
        error: "Failed to format response as JSON",
        rawResponse: aiResponse 
      });
    }
  } catch (error) {
    console.error('Car search error:', error);
    res.status(500).json({ error: 'Error processing car search request', details: error.message });
  }
};

module.exports = {
  sendChatMessage,
  streamChatMessage,
  getChatHistory,
  clearChatHistory,
  searchCarsWithAI
};
