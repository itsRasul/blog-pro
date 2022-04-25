const express = require('express');
const commentController = require('../controllers/adminControllers/commentController');

const router = express.Router();

router.route('/').get(commentController.index);

module.exports = router;
