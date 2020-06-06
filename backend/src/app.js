var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

// Use native ES6 Promises since mongoose's are deprecated.
mongoose.Promise = global.Promise;

// Connect to the database

console.log("Mongo URI: " + process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
// Fail on connection error.
db.on('error', error => { throw error });
// Connected successfully.
db.once('open', () => { console.log('mongoose connected!') });

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//AUTHENTICATION:
//https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/src/routes/v1/user.route.js

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
