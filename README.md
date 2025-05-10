# Revoff Hackathon Project

This is the main repository for the Revoff Hackathon project, which includes both frontend and backend components.

## Project Structure

- **Frontend**: React/TypeScript application with a modern UI
- **Backend**: Express.js API server with AI integration

## Backend API

The backend provides a RESTful API with Swagger documentation. Detailed information is available in two formats:

1. **Interactive Swagger Documentation**: Available at `/api-docs` when the server is running
2. **Markdown Documentation**: See [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) for detailed API reference

### Starting the Backend

```bash
cd backend
npm install
npm run dev
```

Once running, access the Swagger documentation at: http://localhost:5000/api-docs

### API Endpoints Overview

- **Server**: Health checks and environment information
- **Products**: Product catalog management
- **Chat**: AI chat interactions with streaming capabilities

## Frontend Application

The frontend is a React/TypeScript application with Tailwind CSS for styling.

### Starting the Frontend

```bash
cd frontend
npm install
npm run dev
```

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setup

1. Clone this repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
TOGETHER_API_KEY=your_api_key_here
NODE_ENV=development
PORT=5000
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
