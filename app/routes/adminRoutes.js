const express = require('express');
const dashboardController = require('../controllers/adminControllers/dashboardController');
const postController = require('../controllers/adminControllers/postController');
const commentController = require('../controllers/adminControllers/commentController');
const userController = require('../controllers/adminControllers/userController');
const settingController = require('../controllers/adminControllers/settingController');

const router = express.Router();

router.route('/dashboard').get(dashboardController.index);

router.route('/posts').get(postController.index);

router.route('/comments').get(commentController.index);

router.route('/users').get(userController.index);

router.route('/settings').get(settingController.index);

module.exports = router;
