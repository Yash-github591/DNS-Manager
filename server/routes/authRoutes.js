const express = require("express");
const authController = require("../controllers/authControllers");
const { register, login, logout, getProfile, getProfileById, updateProfile } =
  authController;
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authenticateToken, getProfile);
router.patch("/update-profile", authenticateToken, updateProfile);
router.get("/profile/:id", getProfileById);

module.exports = router;
