# Revoff API Documentation

This document provides detailed information about the Revoff API endpoints, request/response formats, and examples.

## API Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-production-url.com/api` (Replace with your actual production URL)

## Server Endpoints

### Get Server Health

Checks if the server is running properly.

- **URL**: `/server/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Server is healthy",
    "timestamp": "2025-05-10T14:00:00Z"
  }
  ```

### Get Server Environment

Returns information about the server environment.

- **URL**: `/server/env`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "environment": "development",
    "serverName": "Revoff API Server"
  }
  ```

### Get Server Information

Returns detailed information about the server including uptime and resource usage.

- **URL**: `/server/info`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "ok",
    "uptime": 3600,
    "timestamp": "2025-05-10T14:00:00Z",
    "nodeVersion": "v20.0.0",
    "memory": {
      "rss": 53252096,
      "heapTotal": 34537472,
      "heapUsed": 23753400,
      "external": 1950973
    }
  }
  ```

## Product Endpoints

### Get All Products

Returns a list of all available products.

- **URL**: `/products`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": "1",
      "name": "Smart Car",
      "price": 35000,
      "description": "Electric smart car with AI features",
      "image": "/Smart.png"
    },
    {
      "id": "2",
      "name": "Lamborghini",
      "price": 250000,
      "description": "High-performance luxury sports car",
      "image": "/lambo.png"
    }
  ]
  ```

### Get Product by ID

Returns a single product by its ID.

- **URL**: `/products/:id`
- **Method**: `GET`
- **URL Parameters**: `id=[string]` (required)
- **Response Success**:
  ```json
  {
    "id": "1",
    "name": "Smart Car",
    "price": 35000,
    "description": "Electric smart car with AI features",
    "image": "/Smart.png"
  }
  ```
- **Response Error** (404):
  ```json
  {
    "error": "Product not found"
  }
  ```

### Create Product

Creates a new product.

- **URL**: `/products`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "New Car Model",
    "price": 45000,
    "description": "Latest model with advanced features",
    "image": "/new-model.png"
  }
  ```
- **Required Fields**: `name`, `price`
- **Response Success** (201):
  ```json
  {
    "id": "4",
    "name": "New Car Model",
    "price": 45000,
    "description": "Latest model with advanced features",
    "image": "/new-model.png"
  }
  ```
- **Response Error** (400):
  ```json
  {
    "error": "Please provide name and price"
  }
  ```

## Chat Endpoints

### Send Chat Message

Sends a message to the AI and gets a complete response.

- **URL**: `/chat/message`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "userId": "user123",
    "message": "Hello, can you help me with my investment portfolio?",
    "model": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", // optional
    "systemMessage": "You are a helpful AI financial advisor." // optional
  }
  ```
- **Required Fields**: `userId`, `message`
- **Response Success**:
  ```json
  {
    "message": "Of course, I can help with your investment portfolio. What specific questions do you have?",
    "conversationId": "user123"
  }
  ```
- **Response Error** (400):
  ```json
  {
    "error": "userId and message are required"
  }
  ```

### Send Chat Message with Streaming

Sends a message to the AI and gets a streamed response.

- **URL**: `/chat/stream`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "userId": "user123",
    "message": "Hello, can you help me with my investment portfolio?",
    "model": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", // optional
    "systemMessage": "You are a helpful AI financial advisor." // optional
  }
  ```
- **Required Fields**: `userId`, `message`
- **Response**: Server-Sent Events (SSE) with the following format:
  ```
  data: {"content":"Of course"}
  data: {"content":", I can help"}
  data: {"content":" with your investment portfolio"}
  ...
  data: {"done":true}
  ```

### Get Chat History

Retrieves the chat history for a specific user.

- **URL**: `/chat/history/:userId`
- **Method**: `GET`
- **URL Parameters**: `userId=[string]` (required)
- **Response Success**:
  ```json
  {
    "userId": "user123",
    "messages": [
      {
        "role": "user",
        "content": "Hello, can you help me with my investment portfolio?",
        "timestamp": "2025-05-10T14:00:00Z"
      },
      {
        "role": "assistant",
        "content": "Of course, I can help with your investment portfolio. What specific questions do you have?",
        "timestamp": "2025-05-10T14:00:10Z"
      }
    ],
    "model": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
    "createdAt": "2025-05-10T14:00:00Z",
    "updatedAt": "2025-05-10T14:00:10Z"
  }
  ```
- **Response Error** (404):
  ```json
  {
    "error": "Chat session not found"
  }
  ```

### Clear Chat History

Deletes the chat history for a specific user.

- **URL**: `/chat/history/:userId`
- **Method**: `DELETE`
- **URL Parameters**: `userId=[string]` (required)
- **Response Success**:
  ```json
  {
    "success": true,
    "message": "Chat history cleared"
  }
  ```
- **Response Error** (404):
  ```json
  {
    "error": "Chat session not found"
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST requests that create resources)
- `400` - Bad Request (missing required fields or invalid input)
- `404` - Not Found (resource not found)
- `500` - Server Error (unexpected errors)

Error responses have the following format:

```json
{
  "error": "Error message",
  "details": "Additional error details (only in development mode)"
}
```

## Authentication

Currently, the API does not require authentication. In a production environment, it is recommended to implement proper authentication and authorization mechanisms.

## Rate Limiting

There are currently no rate limits implemented. In a production environment, consider adding rate limiting to prevent abuse.

## CORS

Cross-Origin Resource Sharing (CORS) is enabled for all origins in development. In production, you may want to restrict this to specific domains.

## API Versioning

The current API version is v1, which is implied in the base URL. Future versions may use explicit versioning like `/api/v2/`.

## Need Help?

For questions or support, please contact the API support team.
