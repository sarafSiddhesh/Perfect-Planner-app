// File: index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, Planner App!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// File: index.js

const jwt = require('jsonwebtoken');

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User Registration
app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send('User registered');
});

// User Login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || user.password !== req.body.password) return res.sendStatus(403);
  const token = jwt.sign({ username: user.username }, 'SECRET_KEY');
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// File: index.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User Registration
app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send('User registered');
});

// User Login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || user.password !== req.body.password) return res.sendStatus(403);
  const token = jwt.sign({ username: user.username }, 'SECRET_KEY');
  res.json({ token });
});

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, Planner App!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
