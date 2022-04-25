const express = require('express');
const postController = require('../controllers/adminControllers/postController');

const router = express.Router();

router.route('/').get(postController.index);
router.route('/newPost').get(postController.newPostPage);

module.exports = router;
