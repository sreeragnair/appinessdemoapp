
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
  
};

// Go to registration page
userController.register = function(req, res) {
  // res.render('indexzz');
  console.log("registerd success")
};

// Post registration
userController.doRegister = function(req, res) {
    Users=new User({ username : req.body.username, password: req.body.password,email: req.body.email,phone: req.body.phone});
  User.register(Users, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      req.flash('error', 'sorry,Registration Failed,User already exhist');   //Yet to do
      res.redirect('/login');
        }
 passport.authenticate('local')(req, res, function () {
  req.flash('success', 'Account-Registerd,please Login');   //Yet to do
  res.redirect('/login');
 //res.redirect('/');
    });
  });
};
// Go to login page
userController.login = function(req, res) {
    console.log("Login")
  //res.render('indexzz');
};

// Post login
//userController.doLogin = function(req, res) {
 
//};
// logout

userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};



module.exports = userController;