const express = require('express');
const postController = require('../controllers/adminControllers/postController');

const router = express.Router({ mergeParams: true });

router.route('/page/:page').get(postController.index);
router
  .route('/create')
  .get(postController.newPostPage)
  .post(postController.createPost);

module.exports = router;
