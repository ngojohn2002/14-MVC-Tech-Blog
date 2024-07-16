const sequelize = require("../config/config"); // Import sequelize configuration
const { User, Post, Comment } = require("../models"); // Import models

// Data for seeding Users
const userData = [
  {
    username: "alice123",
    password: "password123", // Note: In production, ensure these are hashed
  },
  {
    username: "bob456",
    password: "password456", // Note: In production, ensure these are hashed
  },
];

// Data for seeding Posts
const postData = [
  {
    title: "Welcome to the Tech Blog!",
    content:
      "This is the first post on the tech blog, discussing various tech topics.",
    user_id: 1, // Associating this post with the first user
  },
  {
    title: "Second Post",
    content: "More insights into the latest tech trends discussed here.",
    user_id: 2, // Associating this post with the second user
  },
];

// Data for seeding Comments
const commentData = [
  {
    comment_text: "Great post!",
    user_id: 2, // Comment made by second user
    post_id: 1, // Comment on the first post
  },
  {
    comment_text: "Thanks for the insights.",
    user_id: 1, // Comment made by first user
    post_id: 2, // Comment on the second post
  },
];

// Function to seed all data
const seedAll = async () => {
  await sequelize.sync({ force: true }); // Drops database and re-creates it
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(userData, { individualHooks: true, returning: true });
  console.log("\n----- USERS SEEDED -----\n");

  await Post.bulkCreate(postData);
  console.log("\n----- POSTS SEEDED -----\n");

  await Comment.bulkCreate(commentData);
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0); // Exit the process after seeding
};

// Execute the seeding function
seedAll();
