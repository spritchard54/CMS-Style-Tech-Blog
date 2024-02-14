require('dotenv').config();
const bcrypt = require('bcrypt');
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User } = require('../../models');

// api/user

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now signed in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    // Find user by username
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log(userData);

    if (!userData) {
      console.log('server side here');
      res.status(404).json({ message: 'Login failed. Please try again.' });
      return;
    }
    // Password Vaildation
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('bad password');
      res.status(400).json({
        message: 'Your email or password are incorrect. Please try again.',
      });
      return;
    }
    // Save user information for future reference
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now signed in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.toString());
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// Delete user by ID
router.delete('/delete', withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.session.user_id,
      },
    });
    // Log user out after deletion.
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
