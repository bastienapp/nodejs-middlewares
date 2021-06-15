const express = require('express');
const cors = require('cors');
const { loggerMiddleware, helloMiddleware } = require('./middleware');

const app = express();

// application level
app.use(express.json()); // built-in
app.use(cors()); // tier
app.use(loggerMiddleware);

// router level middleware
app.get('/', helloMiddleware, (request, response) => {
  response.send('Hello world');
});

app.get('/contacts', (request, response, next) => {
  response.send('Email....');
});

// exemple d'authentification

const admins = [223, 7087, 656565];
const authMiddleware = (request, response, next) => {
  const { userId } = request.body;
  if (userId) {
    if (admins.includes(userId)) {
      request.userRole = 'admin';
    } else {
      request.userRole = 'user';
    }
    next();
  } else {
    response.sendStatus(401);
  }
};

const isAdmin = (request, response, next) => {
  if (request.userRole === 'admin') {
    next();
  } else {
    response.status(403).send('Not an admin');
  }
};

app.get('/profile', authMiddleware, (request, response) => {
  response.send('My profile...');
});

app.delete('/users/:id', authMiddleware, isAdmin, (request, response) => {
  response.sendStatus(200);
});

app.listen(8080, () => {
  console.log('Listen on 8080');
});
