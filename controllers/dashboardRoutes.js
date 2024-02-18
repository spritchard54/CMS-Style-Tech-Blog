const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();

// dashboard

// posts 

// router.get('/api/post', async (req, res) => {
//     res.render('post', {
//     loggedIn: req.session.loggedIn  
//     });
// });

// Get all posts by logged in user
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
     // requesting only posts by the logged in user
      where: {
        user_id: req.session.userId,
      },
      // Return title, content, and username of the post for the logged in users
      attributes: ['id', 'title', 'content'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
