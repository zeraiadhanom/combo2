"use strict";

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require('passport');
const path = require("path");


mongoose.Promise = global.Promise;


//routers:

const videoRouter = require("./models/videos/videoRouter");
const userRouter = require("./models/user/userRouter");
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');


// config.js is where we control constants for entire
// app like PORT and DATABASE_URL

const { PORT, DATABASE_URL } = require("./config");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build'))));
app.use(morgan("common"));
app.use(express.static('public'));


// CORS
 app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});


//passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/videos', videoRouter);
app.use('/users/', userRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

//Run and closing server

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };