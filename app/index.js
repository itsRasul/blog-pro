const express = require('express');
const boot = require('./bootstrap');
const initRoutes = require('./routes');

const app = express();

// set general middlewares
boot(app);

initRoutes(app);

module.exports = app;
