const express = require("express");

const router = express.Router();

// import controller functions
const { signupUser, loginUser } = require("../controllers/userController");

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

module.exports = router;
