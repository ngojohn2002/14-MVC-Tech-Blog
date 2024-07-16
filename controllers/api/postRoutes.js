const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all posts
// This route retrieves all posts from the database including the associated User data
router.get("/", async (req, res) => {
  try {
    // Fetch all posts and include the User model to access the username of the post creator
    const postData = await Post.findAll({
      include: [User], // Include User data for each post
    });
    // Send back the posts data as JSON
    res.status(200).json(postData);
  } catch (err) {
    // If an error occurs, send a server error status
    res.status(500).json(err);
  }
});

// POST a new post
// This route handles the creation of a new post, requiring user authentication
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new post using the data in the request body and attach the user's session ID
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // Respond with the newly created post data
    res.status(200).json(newPost);
  } catch (err) {
    // If there's an issue with the post creation, return a client error status
    res.status(400).json(err);
  }
});

// PUT update a post by id
// This route updates a specific post by ID, only allowing edits from the post's owner
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Update the post where the ID matches and ensure it's the same user who created the post
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Check to ensure the user owns the post
      },
    });

    if (!postData) {
      // If no post is found with the given ID, return a not found status
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    // Respond with the updated post data
    res.status(200).json(postData);
  } catch (err) {
    // If an error occurs during the update, return a server error status
    res.status(500).json(err);
  }
});

// DELETE a post
// This route handles the deletion of a post by ID, ensuring only the owner can delete it
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Attempt to delete the post where the ID and user ID match
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure the user is the owner of the post
      },
    });

    if (!postData) {
      // If no post is found or the deletion fails, return a not found status
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    // Respond with success if the post is deleted
    res.status(200).json(postData);
  } catch (err) {
    // If an error occurs during deletion, return a server error status
    res.status(500).json(err);
  }
});

module.exports = router;
