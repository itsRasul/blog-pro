const adminRouter = require('./adminRoutes');
const authRouter = require('./authRoutes');

module.exports = (app) => {
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
};
