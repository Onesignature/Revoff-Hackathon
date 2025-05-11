/**
 * Test file for car search functionality with AI
 */

const request = require('supertest');
const app = require('../server'); // Adjust this path if needed to correctly import your Express app

describe('Car Search with AI', () => {
  // Test the car search endpoint
  it('should search for cars based on user query', async () => {
    const userId = 'test-user';
    const searchQuery = 'Find a Mercedes under AED 400,000';

    const response = await request(app)
      .post('/api/chat/car-search')
      .send({
        userId,
        query: searchQuery
      });

    // Check if response is valid
    expect(response.status).toBe(200);
    
    // If the response contains the expected car data
    if (response.body.matches) {
      // Should have at least one match
      expect(response.body.matches.length).toBeGreaterThan(0);
      
      // Each car should have required fields
      const firstCar = response.body.matches[0];
      expect(firstCar).toHaveProperty('id');
      expect(firstCar).toHaveProperty('name');
      expect(firstCar).toHaveProperty('type');
      expect(firstCar).toHaveProperty('basePrice');
      expect(firstCar).toHaveProperty('imageUrl');
      expect(firstCar).toHaveProperty('description');
      
      // Should have a reasoning for the matches
      expect(response.body).toHaveProperty('reasoning');
    }
  }, 15000); // Longer timeout for AI response

  // Test handling of invalid request
  it('should handle missing required parameters', async () => {
    const response = await request(app)
      .post('/api/chat/car-search')
      .send({
        query: 'Find a Mercedes'
        // Missing userId
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
