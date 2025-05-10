const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Revoff API Documentation',
      version: '1.0.0',
      description: 'API documentation for Revoff Hackathon project',
      contact: {
        name: 'API Support',
        email: 'support@revoff.example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Server',
        description: 'Server status and information endpoints'
      },
      {
        name: 'Products',
        description: 'Product management endpoints'
      },
      {
        name: 'Chat',
        description: 'AI chat interaction endpoints'
      }
    ],
    components: {
      schemas: {
        // Server schemas
        ServerStatus: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'Server is healthy'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-10T14:00:00Z'
            }
          }
        },
        Environment: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              example: 'development'
            },
            serverName: {
              type: 'string',
              example: 'Revoff API Server'
            }
          }
        },
        ServerInfo: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            uptime: {
              type: 'number',
              example: 3600
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-10T14:00:00Z'
            },
            nodeVersion: {
              type: 'string',
              example: 'v20.0.0'
            },
            memory: {
              type: 'object',
              example: {
                rss: 53252096,
                heapTotal: 34537472,
                heapUsed: 23753400,
                external: 1950973
              }
            }
          }
        },
        
        // Product schemas
        Product: {
          type: 'object',
          required: ['id', 'name', 'price'],
          properties: {
            id: {
              type: 'string',
              example: '1'
            },
            name: {
              type: 'string',
              example: 'Smart Car'
            },
            price: {
              type: 'number',
              example: 35000
            },
            description: {
              type: 'string',
              example: 'Electric smart car with AI features'
            },
            image: {
              type: 'string',
              example: '/Smart.png'
            }
          }
        },
        NewProduct: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string',
              example: 'New Car Model'
            },
            price: {
              type: 'number',
              example: 45000
            },
            description: {
              type: 'string',
              example: 'Latest model with advanced features'
            },
            image: {
              type: 'string',
              example: '/new-model.png'
            }
          }
        },
        
        // Chat schemas
        ChatMessage: {
          type: 'object',
          required: ['userId', 'message'],
          properties: {
            userId: {
              type: 'string',
              example: 'user123'
            },
            message: {
              type: 'string',
              example: 'Hello, can you help me with my investment portfolio?'
            },
            model: {
              type: 'string',
              example: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8'
            },
            systemMessage: {
              type: 'string',
              example: 'You are a helpful AI financial advisor.'
            }
          }
        },
        ChatResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Of course, I can help with your investment portfolio. What specific questions do you have?'
            },
            conversationId: {
              type: 'string',
              example: 'user123'
            }
          }
        },
        ChatStreamChunk: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              example: 'Of course'
            }
          }
        },
        ChatStreamEnd: {
          type: 'object',
          properties: {
            done: {
              type: 'boolean',
              example: true
            }
          }
        },
        ChatHistory: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              example: 'user123'
            },
            messages: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  role: {
                    type: 'string',
                    example: 'user'
                  },
                  content: {
                    type: 'string',
                    example: 'Hello, can you help me with my investment portfolio?'
                  },
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2025-05-10T14:00:00Z'
                  }
                }
              }
            },
            model: {
              type: 'string',
              example: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-10T14:00:00Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-10T14:05:00Z'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'An error occurred'
            },
            details: {
              type: 'string',
              example: 'Error details'
            }
          }
        },
        ClearChatResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Chat history cleared'
            }
          }
        }
      }
    },
    paths: {
      // Server routes
      '/api/server/health': {
        get: {
          tags: ['Server'],
          summary: 'Get server health status',
          description: 'Returns basic health check information about the server',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ServerStatus'
                  }
                }
              }
            }
          }
        }
      },
      '/api/server/env': {
        get: {
          tags: ['Server'],
          summary: 'Get server environment information',
          description: 'Returns information about the server environment',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Environment'
                  }
                }
              }
            }
          }
        }
      },
      '/api/server/info': {
        get: {
          tags: ['Server'],
          summary: 'Get detailed server information',
          description: 'Returns detailed information about the server including uptime and resource usage',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ServerInfo'
                  }
                }
              }
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      
      // Product routes
      '/api/products': {
        get: {
          tags: ['Products'],
          summary: 'Get all products',
          description: 'Returns a list of all available products',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Products'],
          summary: 'Create a new product',
          description: 'Add a new product to the inventory',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NewProduct'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Product created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      '/api/products/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Get product by ID',
          description: 'Returns a single product by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the product to get',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            },
            '404': {
              description: 'Product not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      
      // Chat routes
      '/api/chat/message': {
        post: {
          tags: ['Chat'],
          summary: 'Send a chat message',
          description: 'Send a message to the AI and get a response',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChatMessage'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ChatResponse'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      '/api/chat/stream': {
        post: {
          tags: ['Chat'],
          summary: 'Send a chat message with streaming response',
          description: 'Send a message to the AI and get a streaming response',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChatMessage'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Successful operation with streaming response',
              content: {
                'text/event-stream': {
                  schema: {
                    oneOf: [
                      {
                        $ref: '#/components/schemas/ChatStreamChunk'
                      },
                      {
                        $ref: '#/components/schemas/ChatStreamEnd'
                      }
                    ]
                  }
                }
              }
            },
            '400': {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            '500': {
              description: 'Server error',
              content: {
                'text/event-stream': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      '/api/chat/history/{userId}': {
        get: {
          tags: ['Chat'],
          summary: 'Get chat history',
          description: 'Retrieve the chat history for a specific user',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'ID of the user to get chat history for',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ChatHistory'
                  }
                }
              }
            },
            '404': {
              description: 'Chat session not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Chat'],
          summary: 'Clear chat history',
          description: 'Delete the chat history for a specific user',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'ID of the user to clear chat history for',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ClearChatResponse'
                  }
                }
              }
            },
            '404': {
              description: 'Chat session not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};
