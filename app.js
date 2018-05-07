if(process.env.NODE_ENV === 'development ') {
  require("dotenv").config();
}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var tests = require('./routes/tests');
var about = require('./routes/about');
var listings = require('./routes/listings');
var login = require('./routes/login');
var signup = require('./routes/signup');
var temp = require('./routes/temp');
var submit = require('./routes/submit');
var displayListing = require('./routes/displaylisting');
var dashboard = require('./routes/dashboard');


var app = express();

//Use Https only in production
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session ({
    secret: 'team1 loves the earth',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000
    }
}));



app.use('/', index);
app.use('/users', users);
app.use('/tests', tests);
app.use('/about', about);
app.use('/listings', listings);
app.use('/login', login);
app.use('/signup', signup);
app.use('/submit', submit);
app.use('/displaylisting', displayListing);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
