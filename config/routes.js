const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = 'Why can’t banks keep secrets? There are too many tellers!';

const { authenticate } = require('./middlewares');
//database
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash; 

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating user', Error: err });
    });
}

//login
function generateToken(user) {
  const jwtPayload = {
    id: user.id,
    role: 'dad'
  };

  const jwtOptions = {
    expiresIn: '30m'
  };

  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

function login(req, res) {
  // implement user login
  const { username, password } = req.body;  
  const credentials = { username, password };
  console.log(credentials.username);

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(credentials.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ welcome: user.username, token: token })
        } else {
            res.status(401).json({ message: 'Invalid username or password' })
        }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
    
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
