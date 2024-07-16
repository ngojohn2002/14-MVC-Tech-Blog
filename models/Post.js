const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

// Define the Post model that extends Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with its schema definition
Post.init(
  {
    // Define the 'id' column as an integer, primary key, which auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'title' column which stores the title of the post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'content' column which stores the main text content of the post
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the 'user_id' column that establishes a foreign key relationship to the User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // Refers to the 'user' table
        key: "id", // Refers to the 'id' column in the 'user' table
      },
    },
  },
  {
    sequelize, // Pass the connection instance
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true, // Supports snake_case in the database naming conventions
    modelName: "post", // Explicitly define the model name
  }
);

module.exports = Post;
