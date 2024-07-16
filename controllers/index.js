const router = require("express").Router();

// Import routers from other controller files to manage specific routes for the application
const apiRoutes = require("./api"); // Handles all API routes under the /api path
const homeRoutes = require("./homeRoutes"); // Handles top-level routes for rendering views

// Use API routes under the '/api' namespace
// This setup delegates all API-related requests to the apiRoutes module
router.use("/api", apiRoutes);

// Use Home routes for the base path
// This setup handles routes for rendering the main website views like home and dashboard
router.use("/", homeRoutes);

// Export the configured router to be mounted by the main server setup
module.exports = router;
