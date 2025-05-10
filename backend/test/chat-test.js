/**
 * Test script for the chat endpoints
 * Run this script with Node.js to test the chat functionality
 */

const { createReadStream } = require('fs');
const readline = require('readline');

// Modern import for node-fetch
const fetchModule = import('node-fetch').then(module => module.default);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// User ID for testing
const TEST_USER_ID = 'test-user-' + Date.now();

/**
 * Test the regular chat endpoint
 */
async function testRegularChat() {
  try {
    const fetch = await fetchModule;
    rl.question('Enter your message: ', async (message) => {
      console.log('\nSending to regular chat endpoint...');
      
      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: TEST_USER_ID,
          message: message,
        }),
      });

      const data = await response.json();
      console.log('\nResponse from AI:');
      console.log(data.message);
      
      rl.question('\nDo you want to test streaming chat? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          testStreamingChat();
        } else {
          rl.close();
        }
      });
    });
  } catch (error) {
    console.error('Error testing regular chat:', error);
    rl.close();
  }
}

/**
 * Test the streaming chat endpoint
 */
async function testStreamingChat() {
  try {
    const fetch = await fetchModule;
    rl.question('Enter your message for streaming: ', async (message) => {
      console.log('\nSending to streaming chat endpoint...');
      console.log('Response from AI (streaming):');
      
      const response = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: TEST_USER_ID,
          message: message,
        }),
      });

      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        // Process the SSE chunk
        const lines = chunk.split('\n\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.substring(6));
              if (jsonData.done) {
                console.log('\nStreaming complete.');
              } else if (jsonData.error) {
                console.error('\nError:', jsonData.error);
              } else if (jsonData.content) {
                process.stdout.write(jsonData.content);
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
      
      console.log('\n\nDo you want to see the chat history? (y/n):');
      rl.question('', async (answer) => {
        if (answer.toLowerCase() === 'y') {
          await testGetHistory();
        } else {
          rl.close();
        }
      });
    });
  } catch (error) {
    console.error('Error testing streaming chat:', error);
    rl.close();
  }
}

/**
 * Test getting chat history
 */
async function testGetHistory() {
  try {
    const fetch = await fetchModule;
    console.log(`\nGetting chat history for user ${TEST_USER_ID}...`);
    
    const response = await fetch(`${API_URL}/chat/history/${TEST_USER_ID}`);
    const data = await response.json();
    
    console.log('\nChat History:');
    data.messages.forEach((msg) => {
      console.log(`[${msg.role}]: ${msg.content}`);
      console.log(`Timestamp: ${new Date(msg.timestamp).toLocaleString()}`);
      console.log('---');
    });
    
    rl.question('\nDo you want to clear the chat history? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        await testClearHistory();
      } else {
        rl.close();
      }
    });
  } catch (error) {
    console.error('Error getting chat history:', error);
    rl.close();
  }
}

/**
 * Test clearing chat history
 */
async function testClearHistory() {
  try {
    const fetch = await fetchModule;
    console.log(`\nClearing chat history for user ${TEST_USER_ID}...`);
    
    const response = await fetch(`${API_URL}/chat/history/${TEST_USER_ID}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    
    console.log('Result:', data);
    rl.close();
  } catch (error) {
    console.error('Error clearing chat history:', error);
    rl.close();
  }
}

// Start the test
console.log('Chat API Test');
console.log('--------------');
testRegularChat();
