const router = require('express').Router();
const path = require('path');

// GET route for the login page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Home route (could render your existing index.html or another page)
router.get('/workday', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'scheduler.html'));
});

router.get('/localstorage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'local.html'));
});


// GET route for the signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

module.exports = router;