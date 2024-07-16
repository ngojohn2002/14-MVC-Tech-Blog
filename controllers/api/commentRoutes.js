const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// POST a new comment
// Route to create a new comment on a blog post, requires user to be authenticated
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new comment using the data from the request body
    // Automatically attach the logged-in user's ID to the comment for ownership
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // If successful, send the newly created comment as a JSON response
    res.status(200).json(newComment);
  } catch (err) {
    // If an error occurs, send an error status with a JSON message
    res.status(400).json(err);
  }
});

// DELETE a comment
// Route to delete a specific comment by ID, only if the logged-in user is the owner
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Attempt to delete the comment where the ID matches and the user ID matches the logged-in user
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      // If no comment found or deletion unsuccessful, send a 404 status
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    // If deletion successful, send a 200 status with the deleted comment data
    res.status(200).json(commentData);
  } catch (err) {
    // If an error occurs during deletion, send a 500 error status
    res.status(500).json(err);
  }
});

module.exports = router;
