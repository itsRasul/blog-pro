const express = require('express');
const boot = require('./bootstrap');

const app = express();

// set general middlewares
boot(app);

app.get('/', (req, res) => {
  res.render('main', {
    layout: false,
    test: 'hey',
  });
});

module.exports = app;
