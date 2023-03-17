const express = require("express");
const router = express.Router();
const { body } = require("express-validator");


const postController = require("../controllers/api/postController");

const postValidation = [
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("title should not be empty"),
  body("content")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("content should not be empty"),
  body("author")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("author should not be empty"),
];


router.post("/post/create", postValidation, postController.createPost);
router.get("/post/list", postController.listPosts);
router.get("/post/:id", postController.getPost);
router.put("/update/post/:id", postValidation,postController.updatePost);
router.delete("/delete/post/:id",postController.deletePost);


module.exports = router;
