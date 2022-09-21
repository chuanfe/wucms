const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  addPost,
  getPosts,
  removePost,
} = require("../controllers/post/post");

const { verifyJwt } = require("../authorization");

router.post("/addPost", upload.single("media"), addPost);
router.get("/getPosts", getPosts);
router.delete("/removePost", verifyJwt, removePost);

module.exports = router;
