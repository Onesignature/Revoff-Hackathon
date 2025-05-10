const express = require('express');
const { getStatus, getEnvironment, getServerInfo } = require('../controllers/serverController');

const router = express.Router();

// Server status routes
router.get('/health', getStatus);
router.get('/env', getEnvironment);
router.get('/info', getServerInfo);

module.exports = router;
