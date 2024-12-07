const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gourmetHaven', {

})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));


const userSchema = new mongoose.Schema({
  name: String,
  bio: String,
  id: String
});

const User = mongoose.model('User', userSchema);
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route

app.use(express.static(path.join(__dirname, 'views')));


app.post('/api/user', (req, res) => {
  console.log("Received user data:", req.body);
  res.json({ message: "User data saved temporarily" });
});

app.use(bodyParser.json());
// API to create a new user
app.post('/api/user', async (req, res) => {
  try {
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ message: "User saved to database", user: newUser });
  } catch (err) {
      res.status(500).json({ error: "Failed to save user", details: err });
  }
});

// API to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).json({ error: "Failed to retrieve users", details: err });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
