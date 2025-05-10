// Get server status
const getStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
};

// Get environment information
const getEnvironment = (req, res) => {
  res.status(200).json({
    environment: process.env.NODE_ENV || 'development',
    serverName: process.env.SERVER_NAME || 'Revoff API Server'
  });
};

// Example of an async controller with error handling
const getServerInfo = async (req, res) => {
  try {
    const serverInfo = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memory: process.memoryUsage()
    };
    res.status(200).json(serverInfo);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch server information');
  }
};

module.exports = {
  getStatus,
  getEnvironment,
  getServerInfo
};
