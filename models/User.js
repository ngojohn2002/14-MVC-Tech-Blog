const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/config");

// Create our User model extending from Sequelize's Model class
class User extends Model {
  // Set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    // Use bcrypt's compareSync to check submitted password against the hashed password in the database
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize User model with schema definition
User.init(
  {
    // Define an 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a 'username' column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure usernames are unique to prevent duplicate entries
    },
    // Define a 'password' column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], // Validate that the password must be at least four characters long
      },
    },
  },
  {
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable Sequelize's automatic timestamping
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Support for the snake_case naming convention
    modelName: "user", // Explicit definition of the model name in the database

    // Set up beforeCreate lifecycle "hook" functionality
    hooks: {
      // Before saving a new user, automatically hash their password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before updating an existing user, re-hash their password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
  }
);

module.exports = User; // Export the model for use elsewhere in the application
