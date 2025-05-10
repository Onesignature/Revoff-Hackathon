const express = require('express');
const { getStatus, getEnvironment, getServerInfo } = require('../controllers/serverController');

const router = express.Router();

/**
 * @swagger
 * /api/server/health:
 *   get:
 *     tags:
 *       - Server
 *     summary: Get server health status
 *     description: Returns basic health check information
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/health', getStatus);

/**
 * @swagger
 * /api/server/env:
 *   get:
 *     tags:
 *       - Server
 *     summary: Get environment information
 *     description: Returns server environment details
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/env', getEnvironment);

/**
 * @swagger
 * /api/server/info:
 *   get:
 *     tags:
 *       - Server
 *     summary: Get detailed server information
 *     description: Returns uptime, memory usage, and other server stats
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Server error
 */
router.get('/info', getServerInfo);

module.exports = router;
