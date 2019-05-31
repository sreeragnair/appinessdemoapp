
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const flash=require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var swig = require('swig');
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var adminRouter=require('./routes/api');
//var userRouter=require('./routes/api');
var userRouter=require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(require('express-session')({
    secret: 'keyboardddd cat',
    resave: false,
    saveUninitialized: false
        }));

        app.use(function(req, res, next) {
            res.locals.login = req.isAuthenticated();
            res.locals.session = req.session;
            next();
        });
        
      

        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/users', isAuthenticated,userRouter);
       app.use('/api', isAdminAuthenticated,adminRouter);
       app.use('/api', api);

 


        function isAuthenticated(req, res, next) {
          
            if (req.user)
                return next();
          
            // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
            res.redirect('/');
          }
          
          function isAdminAuthenticated(req, res, next) {
         
            if (req.user && req.user.role=="admin")
                return next();
          
            // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
            res.redirect('/');
          }
          

          var User = require('./models/user');
          passport.use(new LocalStrategy(User.authenticate()));
          passport.serializeUser(User.serializeUser());
          passport.deserializeUser(User.deserializeUser());
          

        //connect-flash codes

          app.use(require('connect-flash')());
          app.use(function(req, res, next){
            res.locals.success = req.flash('success');
           res.locals.error = req.flash('error');
           next();
          });














app.use('/', routes);
app.use('/users', users);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers
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
// no stacktraces leaked to us84cm uer
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect('mongodb://localhost/sastra-mongodb')
   .then(() =>  console.log('DB connection succesful'))
   .catch((err) => console.error(err));


module.exports = app;
