const express = require('express');
const authController = require('../controllers/authControllers/authController');

const router = express.Router();

router.route('/login').get(authController.loginPage).post(authController.login);
router
  .route('/signin')
  .get(authController.signinPage)
  .post(authController.signin);
module.exports = router;
