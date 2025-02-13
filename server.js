/*
  server.js
  This file sets up the Express server and adds endpoints for login and signup functionality.
*/

const express = require('express');
const bcrypt = require('bcrypt'); // bcrypt for hashing passwords
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// In-memory user store
// NOTE: In a production app, use a database instead of an in-memory array.
let users = [];

// Home route (could render your existing index.html or another page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// GET route for the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// POST route for signup
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

// Example of an API route from your original code (adjust as needed)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data endpoint' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
