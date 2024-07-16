const router = require("express").Router();

// Import specific routers for different data models and functional routes
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

// Route grouping to handle different types of API requests
// Each sub-route is prefixed with its specific endpoint for clarity and organization

// User routes handle requests related to user operations (e.g., login, logout, create user)
router.use("/users", userRoutes);

// Post routes handle requests related to blog posts (e.g., create, delete, update posts)
router.use("/posts", postRoutes);

// Comment routes handle requests related to comments on blog posts (e.g., add, delete comments)
router.use("/comments", commentRoutes);

// Export the main router which now includes all sub-routers for API routes
module.exports = router;
