const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Define model associations to create relational links between different tables

// User-Post Association
// One User can have many Posts, establishing a one-to-many relationship
User.hasMany(Post, {
  foreignKey: "user_id", // ForeignKey in the Post table that references User
  onDelete: "CASCADE", // Ensures that all posts related to a user are deleted when the user is deleted
});

// Post-User Association
// A Post belongs to a single User, establishing a many-to-one relationship
Post.belongsTo(User, {
  foreignKey: "user_id", // ForeignKey in the Post table that connects back to User
});

// User-Comment Association
// One User can have many Comments, establishing a one-to-many relationship
User.hasMany(Comment, {
  foreignKey: "user_id", // ForeignKey in the Comment table that references User
  onDelete: "CASCADE", // Ensures that all comments related to a user are deleted when the user is deleted
});

// Comment-User Association
// A Comment belongs to a single User, indicating that each comment is made by one user
Comment.belongsTo(User, {
  foreignKey: "user_id", // ForeignKey in the Comment table that connects back to User
});

// Post-Comment Association
// One Post can have many Comments, establishing a one-to-many relationship
Post.hasMany(Comment, {
  foreignKey: "post_id", // ForeignKey in the Comment table that references Post
  onDelete: "CASCADE", // Ensures that all comments related to a post are deleted when the post is deleted
});

// Comment-Post Association
// A Comment belongs to a single Post, indicating that each comment is associated with one post
Comment.belongsTo(Post, {
  foreignKey: "post_id", // ForeignKey in the Comment table that connects back to Post
});

// Export models for use in other parts of the application
module.exports = { User, Post, Comment };
