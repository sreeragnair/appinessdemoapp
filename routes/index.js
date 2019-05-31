var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require("passport");


var auth = require("../controller/AuthController.js");
var User= require('../models/user')


  //
/* GET home page. */
router.get('/', async(req, res)=> {

  res.render("login");
});



/* GET home page. */













router.get("/login",function(req,res){
  res.render("login");
  })
router.get('/', auth.home);
// route to register page
router.get('/register', auth.register);
// route for register action
router.post("/register", auth.doRegister);
// route to login page
router.get('/login', auth.login);

router.post('/login', passport.authenticate('local', {
  successRedirect : '/admincheck',
  failureRedirect : '/loginfailed'
}));

router.get("/loginfailed",function(req,res){
  req.flash('error', 'Inavlid Username or Password');   //Yet to do
  res.redirect("login");
  })
  router.get("/admincheck",function(req,res){

      if(req.user && req.user.role=="admin"){
          res.redirect( "/api/admin/dashbord");
     
    }
      res.redirect("/users/moneytransfer");
    });
    
  


// route for logout action
router.get('/logout', auth.logout);
module.exports = router;
