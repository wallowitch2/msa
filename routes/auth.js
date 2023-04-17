const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
  // Render login page
  res.render('login');
});

router.post('/login', async (req, res) => {
  // Handle user login
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password }, attributes: ['id', 'username', 'accounttype','email'], });
    console.log(user.username);
    if (user) {
      req.session.is_logined = true;
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.accounttype = user.accounttype;
      req.session.email = user.email;
      console.log(req.session.username);
      console.log('Session after login:', req.session); // 추가된 로그
      res.redirect('/');
    } else {
      console.log("login failed");
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/logout', (req, res) => {
  // Handle user logout
  req.session.destroy();
  res.redirect('/auth/login');
});

// Render the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle user registration
router.post('/register', async (req, res) => {
  const { username, password, email, accounttype, tel, address} = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(409).send('User already exists');
    } else {
      // Create a new user
      const newUser = await User.create({
        username,
        password,
        email,
        accounttype,
        tel,
        address
      });

      // Redirect to the login page after successful registration
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});










module.exports = router;
