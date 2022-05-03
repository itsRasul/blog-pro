const express = require('express');
const settingController = require('../controllers/adminControllers/settingController');

const router = express.Router();

router
  .route('/')
  .get(settingController.index)
  .post(settingController.updateSetting);

module.exports = router;
