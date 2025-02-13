const router = require('express').Router();
const bcrypt = require('bcrypt'); // bcrypt for hashing passwords
const path = require('path');
const db = require('../models'); // Assuming you have a models/index.js that exports your Sequelize models
const {writeFile} = require('fs');

// In-memory user store
// NOTE: In a production app, use a database instead of an in-memory array.
let users = [];

// POST route for signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // Check if the user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).send('User already exists.');
  }
  try {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the new user
    users.push({ username, password: hashedPassword });
    console.log('New user created:', username);
    // Redirect to login page after successful signup
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signing up.');
  }
});

// POST route for login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }
  try {
    // Compare the password provided with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // If password is correct, login is successful
      res.send(`Welcome, ${username}! You are now logged in.`);
    } else {
      res.status(400).send('Invalid username or password.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in.');
  }
});

let data = require('./public/db/data.json');

app.get('/api/data', (req, res) => {
    res.json(data);
});

app.post('/api/data', (req, res) => {
    data = req.body;
    writeFile('./public/db/data.json', JSON.stringify(data, null, 2), err => {
        if (err) throw err;
    });
    console.log(data);
    res.json(data);
});

// GET route for the login page
module.exports = router;




