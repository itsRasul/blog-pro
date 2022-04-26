const express = require('express');
const boot = require('./bootstrap');
const initRoutes = require('./routes');
const errorController = require('@controllers/errorController');

const app = express();

// set general middlewares
boot(app);
// set some specific routers for specific routes
initRoutes(app);

// error handling middleware
app.use(errorController);

module.exports = app;
