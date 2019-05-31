

//using this for modifying admin routes
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User= require('../models/user')


var auth = require("../controller/AuthController.js");


            router.get("/admin/dashbord",function(req,res){
         console.log("on admin")
          User.find(function (err, payment) {

          res.render("adminpage",  
          {payment : payment})
          });
      });







  module.exports = router;