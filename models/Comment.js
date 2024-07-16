const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

// Define the Comment model that extends Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with its schema definition
Comment.init(
  {
    // Define the 'id' column as an integer, primary key, which auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'comment_text' column which stores the text of the comment
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Validation to ensure the comment is not empty
      },
    },
    // Define the 'user_id' column that establishes a foreign key relationship to the User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // Refers to the 'user' table
        key: "id", // Refers to the 'id' column in the 'user' table
      },
    },
    // Define the 'post_id' column that establishes a foreign key relationship to the Post model
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post", // Refers to the 'post' table
        key: "id", // Refers to the 'id' column in the 'post' table
      },
    },
  },
  {
    sequelize, // Pass the connection instance
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true, // Supports snake_case in the database naming conventions
    modelName: "comment", // Explicitly define the model name
  }
);

module.exports = Comment;
