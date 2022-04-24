const adminRouter = require('./adminRoutes');

module.exports = (app) => {
  app.use('/admin', adminRouter);
};
