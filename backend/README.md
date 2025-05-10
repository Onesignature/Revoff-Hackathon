# Revoff API Documentation

This repository contains the API documentation for the Revoff Hackathon project.

## API Overview

The API provides endpoints for:

- **Chat**: AI chat interactions with streaming and non-streaming options
- **Products**: Product catalog management 
- **Server**: Status and environment information

## Using the API Documentation

### Swagger UI

The API documentation is available through Swagger UI when the server is running:

1. Start the server with `npm run dev` or `npm start`
2. Open a browser and navigate to [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
3. Use the Swagger UI to explore and test the available endpoints

### API Endpoints

#### Server Endpoints

- `GET /api/server/health` - Get server health status
- `GET /api/server/env` - Get server environment information
- `GET /api/server/info` - Get detailed server information

#### Product Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product

#### Chat Endpoints

- `POST /api/chat/message` - Send a chat message and get a response
- `POST /api/chat/stream` - Send a chat message and get a streaming response
- `GET /api/chat/history/:userId` - Get chat history for a user
- `DELETE /api/chat/history/:userId` - Clear chat history for a user

## Examples

### Example: Sending a Chat Message

```javascript
// Example using fetch to send a chat message
fetch('http://localhost:5000/api/chat/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user123',
    message: 'Hello, can you help me with my investment portfolio?',
    model: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
    systemMessage: 'You are a helpful AI financial advisor.'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Example: Getting Product Details

```javascript
// Example using fetch to get product details
fetch('http://localhost:5000/api/products/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Development

### Installing Dependencies

```bash
npm install
```

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Environment Variables

The server uses the following environment variables:

- `PORT` - Port to run the server on (default: 5000)
- `NODE_ENV` - Environment (development, production)
- `TOGETHER_API_KEY` - API key for Together AI service
