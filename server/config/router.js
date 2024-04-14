// import controllers here
const userController = require('../controllers/user.js');

module.exports = function (app) {
  app.use('/user', userController);
};
