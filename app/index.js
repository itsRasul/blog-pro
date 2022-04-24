const express = require('express');
const boot = require('./bootstrap');
const initRoutes = require('./routes');

const app = express();

// set general middlewares
boot(app);
// set some specific routers for specific routes
initRoutes(app);

module.exports = app;
