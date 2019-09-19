'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('./model');
const router = express.Router();
const jsonParser = bodyParser.json();


// Post to register a new user

console.log('is this')

router.post('/', jsonParser, (req, res) => {
	console.log('does this work')
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
	
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // If the username and password aren't trimmed  give an error.
  
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      reason: 'ValidationError',
      code: 422,
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName = '', lastName = ''} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({username})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        firstName,
        lastName
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());

    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

//Below code is just to check if user is registered successfuly. Never exposer user detail 
//as below during prodcution stage;

router.get('/', (req, res) => {
	console.log('thisthat')
  return User.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// POST: signing in a user
// Veryfying user login and credentials

router.post('/login', function (req, res) {
	console.log("is this working")
  var user = req.body.username;
  var pwd = req.body.password;
   User
   .findOne({
          username: req.body.username
      }, function (err, items) {
          if (err) {
              return res.status(500).json({
                  message: "Internal server error"
              });
          }
          if (!items) {
              // bad username
              return res.status(401).json({
                  message: "Not found!"
              });
          } else {
              items.validatePassword(req.body.password, function (err, isValid) {
                  if (err) {
                      console.log('There was an error validating the password.');
                  }
                  if (!isValid) {
                      return res.status(401).json({
                          message: "Not found"
                      });
                  } else {
                      var logInTime = new Date();
                      console.log("User logged in: " + req.body.username + ' at ' + logInTime);
                      return res.json(items);
                  }
              });
          };
      });
});

// Logout endpoint

router.get('/logout', function(req, res){
  console.log(req.username);
  User.findByIdAndRemove(req.username, function(err){
  if(err) res.send(err);
  console.log("User logout: " + req.body.username);
  res.json({ message: 'User Deleted!'});
 })
});

module.exports = router; 
