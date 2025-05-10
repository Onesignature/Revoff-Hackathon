const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { swaggerUi, swaggerDocs } = require('./swagger');

// Import routes
const serverRoutes = require('./routes/serverRoutes');
const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Load environment variables from .env file in root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Debug environment variables
console.log('Environment variables loaded:');
console.log('TOGETHER_API_KEY:', process.env.TOGETHER_API_KEY ? 'Set (hidden for security)' : 'Not set');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Revoff Backend API',
    status: 'Server is running',
    version: '1.0.0'
  });
});

// Use routes
app.use('/api/server', serverRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

// For backward compatibility
app.get('/api/health', (req, res) => {
  res.redirect('/api/server/health');
});

app.get('/api/env-test', (req, res) => {
  res.redirect('/api/server/env');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET / - Welcome message');  
  console.log('- GET /api/server/health - Health check');
  console.log('- GET /api/server/env - Environment variables');
  console.log('- GET /api/server/info - Server information');
  console.log('- GET /api/products - Get all products');
  console.log('- GET /api/products/:id - Get product by ID');
  console.log('- POST /api/products - Create a new product');
  console.log('- POST /api/chat/message - Send a message to AI');
  console.log('- POST /api/chat/stream - Send a message with streaming response');
  console.log('- GET /api/chat/history/:userId - Get chat history');
  console.log('- DELETE /api/chat/history/:userId - Clear chat history');
  console.log('- GET /api-docs - Swagger API documentation');
});

