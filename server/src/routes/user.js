const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  addUser,
  editUser,
  loginUser,
} = require("../controllers/user/user");
const { verifyJwt } = require("../authorization");

router.post("/addUser", addUser);
router.put("/editUser", [verifyJwt, upload.fields([{name: "avatar"}])], editUser);
router.post("/loginUser", loginUser);

module.exports = router;
