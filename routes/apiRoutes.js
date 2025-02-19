const router = require('express').Router();
const bcrypt = require('bcrypt'); // bcrypt for hashing passwords
const path = require('path');
const db = require('../db/data.json'); // Import the data from the JSON file
const {writeFile} = require('fs');

console.log(db);

// Write the updated data to the JSON file
const storeFx = db => {
  writeFile(path.join(__dirname, '../db/data.json'), JSON.stringify(db, null, 2), err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error signing up.');
    }
  });
};

// In-memory user store
// NOTE: In a production app, use a database instead of an in-memory array.
let users = [];

// POST route for signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // Check if the user already exists
  const userExists = Object.keys(db).includes(username);
  if (userExists) {
    return res.status(400).send('User already exists.');
  }
  try {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the new user
    db[username] = {password: hashedPassword };
    
    storeFx(db);
    console.log('New user created:', username);
    // Redirect to login page after successful signup
    res.redirect('/workday');
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

router.get('/data', (req, res) => {
  // Log the user out
  res.json(db);
});

// GET route for the login page
module.exports = router;




