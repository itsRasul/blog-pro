// in this file we define general middlewares
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const morgan = require('morgan');

module.exports = (app) => {
  // template engine middleware => define a template engine
  app.engine('handlebars', handlebars.engine());
  // template engine middleware => set handlebars template engine for this project
  app.set('view engine', 'handlebars');
  // views directory
  app.set('views', path.join(__dirname, '../views'));
  // define assets direction to express, express will know where the exactly assets are in this project
  // when we use a tag or img tag and link them in handlebars, the link direction will be after this below direction
  app.use(express.static(path.join(__dirname, '../../public')));
  // bode-parser middleware
  app.use(express.json());
  // parsing form data comming from front middleware
  app.use(express.urlencoded({ extended: false }));
  // middleware to log every request comming from client
  app.use(morgan('dev'));
};
