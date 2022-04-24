const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.route('/dashboard').get(dashboardController.index);

module.exports = router;
