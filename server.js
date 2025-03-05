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

// Routes
app.use(require('./routes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
