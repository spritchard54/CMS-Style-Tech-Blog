const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { User, Post, Comment } = require("../../models");
const router = require("express").Router();
require("dotenv").config();

// Gets all posts by user
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    console.log(postData);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Create new post
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Update post
router.put("/update", async (req, res) => {
  try {
    //Object containg post details
    const postToUpdate = {
      id: req.session.post_id,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    };
    // Upserts PostToUpdate object into PostData object
    const postData = await Post.upsert(postToUpdate, {
      where: {
        id: postToUpdate.post_id,
        user_id: postToUpdate.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: "No post found",
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Delete a post
router.delete("/delete", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        title: req.body.title,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: "No post found",
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;