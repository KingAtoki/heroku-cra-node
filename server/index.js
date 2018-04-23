require('dotenv').config();
const cors = require('cors');
const twilio = require('twilio');
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;
// const accountSid = process.env.TWILIO_TEST_ACCOUNT_SID;
// const authToken = process.env.TWILIO_TEST_AUTHTOKEN;
// const client = new twilio(accountSid, authToken);

const baseURL = 'https://howd-it-go.firebaseio.com';
const axios = require('axios');
const firebase = require('firebase');
const admin = require('firebase-admin');

const serviceAccount = require('./service-account-key.json');

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  admin.initializeApp({
    databaseURL: 'https://howd-it-go.firebaseio.com',
    credential: admin.credential.cert(serviceAccount)
  });
  const db = admin.database();
  const ref = db.ref(`/`);
  const app = express();
  app.use(cors());
  app.use(express.json());
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the custom server!' });
  });

  app.patch('/users/:username', (req, res) => {
    const { username } = req.params;
    const { email, password } = req.body;
    const usersRef = ref.child('users');
    usersRef.child(`${username}`).set(
      {
        details: {
          email: email,
          password: password
        }
      },
      err => {
        if (!err) res.send({ success: 'true' });
      }
    );
  });

  // app.post('/message-user', (req, res) => {
  //   const message = req.body;
  //   client.messages
  //     .create({
  //       body: message.text,
  //       to: '+18569744731', // Text this number
  //       from: '+15612796790' // From a valid Twilio number
  //     })
  //     .then(response => res.json(response))
  //     .catch(err => res.json(err));
  // });

  app.post(`${baseURL}/users.json`, (req, res) => {
    axios.get;
    const email = req.body.email;
    const password = req.body.passwordOne;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => console.log(err.code, err.message));
  });

  app.post(`${baseURL}/users.json`);
  // app.post('/users/:dbname/name.json', (req, res) => {
  //   const username = req.body;
  //   firebase.
  // })
  // app.post('/signin', (req, res) => {
  //   const { email, password } = req.body;
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(err => console.log(err.code, err.message));
  // });
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(__dirname, '../react-ui/build', 'index.html')
    );
  });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
