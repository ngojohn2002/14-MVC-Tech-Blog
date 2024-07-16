const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render the homepage
// Displays posts along with comments and the authors' usernames
router.get("/", async (req, res) => {
  try {
    // Retrieve all posts including related users and comments
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    // Normalize the data for templating
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'homepage' template, passing the posts and login status
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle errors with a server error response
    res.status(500).json(err);
  }
});

// Route to render the dashboard
// This route displays user-specific content, requiring authentication
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Retrieve user data and associated posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    // Normalize the user data for templating
    const user = userData.get({ plain: true });

    // Render the 'dashboard' template, passing user data and authentication status
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    // Handle errors with a server error response
    res.status(500).json(err);
  }
});

// Route for login
// Redirects to the dashboard if already logged in, otherwise renders the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // Redirect to dashboard if the user is already logged in
    res.redirect("/dashboard");
    return;
  }
  // Render the 'login' template if not logged in
  res.render("login");
});

// Route to render the signup page
// Redirects to the dashboard if already logged in, otherwise shows the signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    // Redirect to dashboard if the user is already logged in
    res.redirect("/dashboard");
    return;
  }
  // Render the 'signup' template if not logged in
  res.render("signup");
});

module.exports = router;
