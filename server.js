const express = require("express"); // Import the express library to create and configure the server
const session = require("express-session"); // Import express-session for handling user sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Integrate session storage with Sequelize
const exphbs = require("express-handlebars"); // Import express-handlebars for view templating
const path = require("path"); // Standard Node.js module for working with file paths

const sequelize = require("./config/config"); // Import sequelize configuration for database connections
const routes = require("./controllers"); // Import routes defined in the controllers directory

const app = express(); // Create an instance of express
const PORT = process.env.PORT || 3000; // Define the port the server will listen on

// Set up Handlebars as the templating engine
const hbs = exphbs.create({
  defaultLayout: "main", // Specify the default layout the views will use
  extname: ".handlebars", // Specify the file extension of the handlebars templates
});

// Configure middleware
app.engine("handlebars", hbs.engine); // Register Handlebars as the view engine
app.set("view engine", "handlebars"); // Use Handlebars as the view engine
app.set("views", path.join(__dirname, "views")); // Define the path for the views directory

// Configure session middleware for authentication
app.use(
  session({
    secret: "super secret secret", // Secret key for signing the session ID cookie
    store: new SequelizeStore({
      db: sequelize, // Use sequelize for session store
    }),
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save a session that is new, but has not been modified
    cookie: { maxAge: 3600000 }, // Set cookie expiration time
  })
);

// Add middleware for parsing JSON and urlencoded data
app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the "public" directory

// Apply routes from the controllers
app.use(routes);

// Start the server and sync the database
sequelize.sync({ force: false }).then(() => {
  app.listen(
    PORT,
    () =>
      // Start listening on the defined port
      console.log(`Server running on http://localhost:${PORT}`) // Log that the server is running
  );
});
