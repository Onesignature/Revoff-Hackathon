# Car Search AI API

This API provides functionality to search for cars using natural language queries processed by AI.

## Endpoint

### POST /api/chat/car-search

Search for cars that match a user's requirements using AI.

#### Request Body

```json
{
  "userId": "user123",
  "query": "Find a Mercedes under AED 400,000",
  "model": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",  // Optional
  "systemMessage": "Custom system message"  // Optional
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | Unique identifier for the user |
| query | string | Yes | Natural language search query describing the cars the user is looking for |
| model | string | No | AI model to use (defaults to Llama-4-Maverick) |
| systemMessage | string | No | Optional system message to provide additional context |

#### Response

The API returns up to 10 matching cars based on the search criteria.

```json
{
  "matches": [
    {
      "id": "v007",
      "name": "Mercedes-Benz CLE",
      "type": "Luxury Coupe",
      "price": 310000,
      "imageUrl": "mercedes/cle.jpg",
      "description": "The Mercedes-Benz CLE combines sleek coupe styling with advanced technology and refined comfort for a sophisticated driving experience."
    },
    {
      "id": "v005",
      "name": "Mercedes-AMG C63",
      "type": "Sports Sedan",
      "price": 380000,
      "imageUrl": "mercedes/c63.webp",
      "description": "The Mercedes-AMG C63 delivers supercar performance in a practical sedan package, with its handcrafted engine and race-derived technology."
    }
  ],
  "reasoning": "Based on your request for a Mercedes vehicle under AED 400,000, I've found two excellent options that match your criteria. The Mercedes-Benz CLE is a luxury coupe priced at AED 310,000, while the Mercedes-AMG C63 is a sports sedan priced at AED 380,000. Both vehicles offer premium features and performance within your budget."
}
```

| Property | Type | Description |
|----------|------|-------------|
| matches | array | Array of car objects that match the search criteria |
| matches[].id | string | Unique identifier for the car |
| matches[].name | string | Name of the car |
| matches[].type | string | Type of the car (e.g. "Luxury Coupe", "Sports Sedan") |
| matches[].price/basePrice | number | Price of the car in AED |
| matches[].imageUrl | string | URL to an image of the car |
| matches[].description | string | Description of the car |
| reasoning | string | Explanation of why these cars match the search criteria |

## Example Usage

### Frontend Implementation

```javascript
const searchCars = async (query) => {
  try {
    const response = await fetch('/api/chat/car-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'user123',
        query: query,
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching for cars:', error);
    return null;
  }
};

// Example usage
const results = await searchCars('Find a Mercedes under AED 400,000 with good mileage');
```

## Integration Testing

You can run the test suite for this API using:

```bash
cd backend
npm test test/car-search-test.js
```
