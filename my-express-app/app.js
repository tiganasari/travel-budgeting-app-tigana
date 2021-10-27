var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var walletsRouter = require('./routes/wallets');
var expensesRouter = require('./routes/expenses');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wallets', walletsRouter);
app.use('/expenses', expensesRouter);
app.use(express.static(path.join(__dirname, "client/build")));

module.exports = app;
