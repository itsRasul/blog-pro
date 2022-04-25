const express = require('express');
const dahsboardRouter = require('./dashboardRoutes');
const postRouter = require('./postRoutes');
const commentRouter = require('./commentRoutes');
const userRouter = require('./userRoutes');
const settingsRouter = require('./settingsRoutes');

const router = express.Router();

// router.route('/dashboard').get(dashboardController.index);
router.use('/dashboard', dahsboardRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/users', userRouter);
router.use('/settings', settingsRouter);

module.exports = router;
