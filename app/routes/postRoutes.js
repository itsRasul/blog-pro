const express = require('express');
const postController = require('../controllers/adminControllers/postController');

const router = express.Router({ mergeParams: true });

router.route('/').get(postController.index);
router
  .route('/create')
  .get(postController.newPostPage)
  .post(postController.createPost);

router.route('/delete/:postId').get(postController.remove);

router
  .route('/edit/:postId')
  .get(postController.editPage)
  .post(postController.update);
module.exports = router;
