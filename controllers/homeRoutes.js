const router = require("express").Router();
const { User, Post, Comment } = require("../models");


router.get("/", async (req, res) => {
  res.render("homepage");
});


// Login route
router.get("/login", async (req, res) => {
  res.render("login");
});

// Login route
router.get("/login", async (req, res) => {
  res.render("login");
});

// signup route
router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;