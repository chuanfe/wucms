const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  addCategory,
  getCategories,
  removeCategory,
} = require("../controllers/category/category");

const { verifyJwt } = require("../authorization");

router.post("/add", upload.single("image"), addCategory);
router.get("/get", getCategories);
router.delete("/remove", verifyJwt, removeCategory);

module.exports = router;
