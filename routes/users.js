var express = require('express');
var router = express.Router();
var User= require('../models/user')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.post('/payment',function(req,res){
  
  var data=req.body
  console.log(req.user.id)
    User.findOneAndUpdate({_id: req.user.id},{ $push: {"transactions.sent":req.body}}, function(err, data){
        if(err){
      console.log(err)
      req.flash('error', 'Transsfer error');   //Yet to do

    }
    else{
      console.log("success",data)
      req.flash('success', 'Transsferd successfully ');   //Yet to do
   body={
     username:data.username,
  amount:req.body.amount
}
console.log("bodyeee",body)
   User.findOneAndUpdate({username: req.body.username},{ $push: {"transactions.received":body}}, function(err, data){
if(err){
  console.log("transferin failed",err)
}
else{
  console.log("success in both ends",data)
  res.redirect("/users/mytransaction")

}

}) 
   
   
   
   
    }
  })

  
  
  })


  router.get('/moneytransfer', function(req, res) {
    console.log(req.user)
    let query={username:{$ne:req.user.username}}

    User.find(query ,[],function(err, user){
      res.render('transfermoney',{user:user})
      })
  
  });


  router.get('/mytransaction', function(req, res) {
    console.log("req came",req.user.transactions)
    res.render('mytransactions',{user:req.user.transactions});
  });

module.exports = router;
