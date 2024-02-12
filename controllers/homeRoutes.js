const sequelize = require('../config/connection');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

require(dotenv).config();

// initial pageload content
router.get('/', async (req, res) => {
  try {
    const PostData = await Post.findAll({
      attributes: ['id', 'title', 'content'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postData.map((post) =>
      post.get({
        plain: true,
      })
    );
    res.render('home', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Get Login Page
router.get('/login', async (req, res) => {
  try {
    res.render("login", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
    });
  } catch(err) {
    res.status(500).json(err.toString());
  }
});

// Get Dashboard Page
router.get("/dashboard", async (req, res) => {
  try {
    if(!req.session.logged_in){
      res.render('login', {
        loggedIn: req.session.logged_in,
        userName: req.session.user_name,
      })
    } else {
      res.render("dashboard", {
        loggedIn: req.session.logged_in,
        userName: req.session.user_name,
      });
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
