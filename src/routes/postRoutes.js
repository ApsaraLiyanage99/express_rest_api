const express = require("express");

const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/postController");

const router = express.Router();

router.route("/all").get(getAllPosts);
// corresponding http method:get  function:getAllPosts
router.route("/:id").get(getPostById);
// id is as the placeholder for specific id parameter


//post method -> for creating some object in backend
router.route("/").post(createPost);

//patch method -> for update specific post
router.route("/:id").patch(updatePost);

//delete method -> for delete specific post
router.route("/:id").delete(deletePost);

module.exports = router;
