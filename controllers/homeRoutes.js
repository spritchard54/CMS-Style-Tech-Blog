const sequelize = require('../config/connection');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

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
    const posts = PostData.map((post) =>
      post.get({
        plain: true,
      })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Get Login Page
router.get('/login', async (req, res) => {
  try {
    res.render('login', {
      loggedIn: req.session.loggedIn,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/homepage');
    return;
  }
  res.render('signup');
});

// Get Dashboard Page
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.render('login', {
        loggedIn: req.session.loggedIn,
        userName: req.session.user_name,
      });
    } else {
      res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        userName: req.session.user_name,
      });
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
