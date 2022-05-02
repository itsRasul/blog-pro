const express = require('express');
const userController = require('../controllers/adminControllers/userController');

const router = express.Router();

router.route('/').get(userController.index);

router.route('/delete/:userId').get(userController.remove);

router
  .route('/create')
  .get(userController.createUserPage)
  .post(userController.create);

router.route('/edit/:userId').get(userController.editUserPage);

module.exports = router;
