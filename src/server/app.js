/*jshint node:true*/
'use strict';

// setup ===================================================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var port     = process.env.PORT || 8080;

var environment = process.env.NODE_ENV;

var path         = require('path');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon      = require('serve-favicon');
var session      = require('express-session');

var configDB  = require('./config/database.js');

// configuration ===========================================
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(favicon(__dirname + '/favicon.ico'));

// static files before session loaded
switch (environment) {
  case 'production': 
    console.log('** PRODUCTION ON AZURE **');
    console.log('serving from ' + './build/');
    process.chdir('./../../');
    app.use('/', express.static('./build/'));
    break;
  case 'stage':
  case 'build':
    console.log('** BUILD **');
    console.log('serving from ' + './build/');
    app.use('/', express.static('./build'));
    break;
  default:
    console.log('** DEV **');
    console.log('serving from ' + './src/client/ and ./');
    app.use('/', express.static('./src/client'));
    app.use('/', express.static('./'));
    break;
}

// setup express application
var sessionOpts = {
  resave: true,
  secret: 'mean demo',
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 2419200000 } // expire date
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser(sessionOpts.secret));
app.use(session(sessionOpts));

// setup passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routes ==================================================
require('./routes.js')(app, passport);

// launch ==================================================
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') + 
    '\n__dirname = ' + __dirname + 
    '\n_process.cwd = ' + process.cwd());
});
