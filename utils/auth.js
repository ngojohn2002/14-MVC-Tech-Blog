// Middleware to verify if the user is logged in
const withAuth = (req, res, next) => {
  // Check if the user is not logged in
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect them to the login page
    res.redirect("/login");
  } else {
    // If the user is logged in, proceed with the next middleware in the stack
    next();
  }
};

module.exports = withAuth;
