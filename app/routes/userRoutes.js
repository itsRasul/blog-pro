const express = require('express');
const userController = require('../controllers/adminControllers/userController');

const router = express.Router();

router.route('/').get(userController.index);

module.exports = router;
