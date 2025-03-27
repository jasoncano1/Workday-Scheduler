const router = require('express').Router();
const bcrypt = require('bcrypt'); // bcrypt for hashing passwords
const pool = require('../db/connection'); // Import the connection pool

// Write the updated data to the JSON file
// const storeFx = db => {
//   writeFile(path.join(__dirname, '../db/data.json'), JSON.stringify(db, null, 2), err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error signing up.');
//     }else{
//       console.log('Data stored');
//     }
//   });
// };

// In-memory user store
// NOTE: In a production app, use a database instead of an in-memory array.

// POST route for signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // Check if the user already exists
  const userExists = db.find(users=>users.username === username);
  if (userExists) {
    return res.status(400).send('User already exists.');
  }
  try {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the new user
    db.push({"username":username, password: hashedPassword, "tasks":[]});
    
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
  console.log('username: ', username);
  pool.query('SELECT * FROM users WHERE username = ?;', [username], async (err, result) => {
  // pool.query('SELECT * FROM users', async (err, result) => {
    console.log('result: ', result);

    res.json(result);
    
    // if (err) {
    //   console.error(err);
    //   return res.status(500).send('Error logging in.');
    // };

    // if (result.length === 0) {
    //   return res.status(400).send('Invalid username or password.');
    // };

    // const user = result[0];
    // try {
    //   // Compare the password provided with the stored hashed password
    //   const match = await bcrypt.compare(password, user.password);
    //   if (match) {
    //     // If password is correct, login is successful
    //     res.send(`Welcome, ${username}! You are now logged in.`);
    //     console.log('User logged in:', user);
        
    //   } else {
    //     res.status(400).send('Invalid username or password.');
    //   }
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send('Error logging in.');
    // }
  });
  // Find the user by username
  // const user = db.find(user => user.username === username);
  // if (!user) {
  //   return res.status(400).send('Invalid username or password.');
  // }
  // try {
  //   // Compare the password provided with the stored hashed password
  //   const match = await bcrypt.compare(password, user.password);
  //   if (match) {
  //     // If password is correct, login is successful
  //     res.send(`Welcome, ${username}! You are now logged in.`);
  //   } else {
  //     res.status(400).send('Invalid username or password.');
  //   }
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send('Error logging in.');
  // }
});

router.post('/data', async (req, res) => {
  const { username } = req.body;
  pool.query('SELECT id FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error getting data.');
    };

    if (result.length === 0) {
      return res.status(404).send('User not found.');
    };

    const userId = result[0].id;
    pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error getting data.');
      };

      console.log('result: ', result);
      

      res.json(result);
    });
  });
  // Find the user by username
  // const user = db.find(user => user.username === username);
  // res.json(user);
});


router.put('/data', (req, res) => {
  
  let newDb = db.filter(user => user.username !== req.body.username);
  
  newDb.push(req.body);
  writeFile(path.join(__dirname, '../db/data.json'), JSON.stringify(newDb, null, 2), err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error signing up.');
    }else{
      console.log('Data stored');
      res.json('success');
    }
  });
});

// GET route for the login page
module.exports = router;




