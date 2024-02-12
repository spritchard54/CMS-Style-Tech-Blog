require('dotenv').config();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');
const router = require('express').Router();

// api/comment

// Get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Update comment by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.upsert(
      {
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Delete comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;