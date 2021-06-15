const loggerMiddleware = (request, response, next) => {
  console.log('date', Date.now());
  next();
};

const helloMiddleware = (request, response, next) => {
  console.log('Hello');
  next();
};

module.exports = { loggerMiddleware, helloMiddleware };
