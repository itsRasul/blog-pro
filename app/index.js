const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.use(() => {
  console.log('hey');
});
// body parser middleware
app.use(express.json());

module.exports = app;
