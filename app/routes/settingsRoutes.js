const express = require('express');
const settingController = require('../controllers/adminControllers/settingController');

const router = express.Router();

router.route('/').get(settingController.index);

module.exports = router;
