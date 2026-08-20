const express = require("express");

const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/userController");

// =========================
// SIGNUP
// =========================

router.post("/signup", (req, res, next) => {
  console.log("USER SIGNUP ROUTE REACHED");
  next();
}, signup);

// =========================
// LOGIN
// =========================

router.post("/login", (req, res, next) => {
  console.log("USER LOGIN ROUTE REACHED");
  next();
}, login);

module.exports = router;