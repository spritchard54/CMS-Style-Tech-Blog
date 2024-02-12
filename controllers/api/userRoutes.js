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
    const newUser = req.body;
    if (!newUser.email) {
      res.status(400).json({
        message: 'Please enter a valid email.',
      });
    } else if (!newUser.username) {
      res.status(400).json({
        message: 'Please enter a valid username.',
      });
    } else if (!newUser.password) {
      res.status(400).json({
        message: 'Please enter a valid password.',
      });
    } else {
      const userData = await User.create(req.body);

      // save user data for future login
      req.session.save(() => {
        (req.session.user_id = userData.id),
        (req.session.logged_in = true),
        (req.session.user_name = userData.username);

        res.status(200).json(userData);
      });
    }
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    // Find user by email
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again.' });
      return;
    }
    // Password Vaildation
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res
        .status(400)
        .json({ massage: 'Your email or password are incorrect. Please try again.' });
      return;
    }
    // Save user information for future reference
    (req.session.user_id = userData.id),
    (req.session.logged_in = true),
    (req.session.user_name = userData.username);

    res.json({
      user: userData,
      message: 'Your are now logged in!',
    });
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// Logout route
router.post('/logout', withAuth, (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err.toString());
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
