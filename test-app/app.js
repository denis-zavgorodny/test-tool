var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var basicAuth = require('basic-auth-connect');
var Users = require('./models/Users');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'cookie_secret',
    name: 'testAPP',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// app.use('/', basicAuth('admin', 'admin'));
app.use('/', 
    basicAuth(function(user, pass) {
        if(account = authenticate(user, pass)) {
            app.user_id = account;
            return true;
        } else {
            return false;
        }
    })
);

app.use(function(req, res, next){
    if(typeof app.user_id != 'undefined') {
        req.session.user = {
            id: app.user_id.id,
            login: app.user_id.login
        };    
    }
    
    return next();
});

app.use('/', routes);
app.use('/users', users)

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function authenticate(user, pass) {
    var findUser = false;
    Users.forEach(function(auth, i, arr){
        if(auth.login == user && auth.pass == pass) {
            findUser = auth;
        }
    }); 
    if(findUser)
        return findUser;

    return false;     
}

module.exports = app;
