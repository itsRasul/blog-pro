const express = require('express');
const commentController = require('../controllers/adminControllers/commentController');

const router = express.Router();

router.route('/').get(commentController.index);

router.route('/:commentId/status/:status').get(commentController.updateStatus);

router.route('/delete/:commentId').get(commentController.deleteComment);

module.exports = router;
