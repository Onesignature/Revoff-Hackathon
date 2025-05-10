/**
 * Test script to check if environment variables are loaded correctly
 */

// Import dotenv and path
const dotenv = require('dotenv');
const path = require('path');

console.log('Current directory:', __dirname);
console.log('Root directory:', path.resolve(__dirname, '../..'));
console.log('Expected .env path:', path.resolve(__dirname, '../../.env'));

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Check if environment variables are loaded
console.log('TOGETHER_API_KEY:', process.env.TOGETHER_API_KEY ? 'Found (not showing for security)' : 'Not found');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Try requiring Together client
try {
  const { Together } = require('together-ai');
  console.log('Successfully imported Together client');
  
  // Test creating client
  try {
    const client = new Together({
      apiKey: process.env.TOGETHER_API_KEY
    });
    console.log('Successfully created Together client');
  } catch (error) {
    console.error('Error creating Together client:', error.message);
  }
} catch (error) {
  console.error('Error importing Together client:', error.message);
}
