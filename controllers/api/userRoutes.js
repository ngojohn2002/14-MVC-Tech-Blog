const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const router = express.Router();

// Create a new user
// This route handles the registration of new users, hashing their passwords for security
router.post("/", async (req, res) => {
  try {
    // Create a new user with the provided username and password
    const userData = await User.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10), // Hash the password before saving
    });

    // Set up user session upon signup
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: "Signup successful!" });
    });
  } catch (err) {
    // If there's an issue creating the user, send back a client error response
    res.status(400).json(err);
  }
});

// User login
// This route handles user login by checking provided credentials against the database
router.post("/login", async (req, res) => {
  try {
    // Look for a user with the provided username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // If no user is found, send a client error response
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Check if the provided password matches the stored hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Set user session details on successful login
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    // If there's an error during login, send a server error response
    res.status(500).json(err);
  }
});

// User logout
// This route handles user logout by destroying the session
router.post("/logout", (req, res) => {
  // Check if the user is currently logged in
  if (req.session.logged_in) {
    // Destroy the session to log out the user
    req.session.destroy(() => {
      res.status(204).end(); // Send a successful no-content response
    });
  } else {
    // If no user is logged in, send a client error response
    res.status(404).end();
  }
});

module.exports = router;
