// Function to delete a post
async function deletePost(postId) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE", // Specify HTTP method for deletion
  });

  if (response.ok) {
    document.location.reload(); // Reload the page to reflect changes if delete was successful
  } else {
    alert("Failed to delete the post."); // Alert the user if the delete operation failed
  }
}

// Event listener for logout
document.getElementById("logout").addEventListener("click", async (event) => {
  const response = await fetch("/api/users/logout", {
    method: "POST", // Specify HTTP method for logging out
    headers: { "Content-Type": "application/json" }, // Set headers to specify the content type
  });

  if (response.ok) {
    document.location.replace("/login"); // Redirect to the login page upon successful logout
  } else {
    alert("Failed to log out."); // Alert the user if the logout operation failed
  }
});

// Additional functionalities can be added here, such as adding posts, editing posts, etc.
