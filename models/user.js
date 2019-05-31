var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    username: String,
    password: String,
    email  :String,
    phone:String,
    transactions:{sent:Array,received:Array},

    role:String
});

UserSchema.plugin(passportLocalMongoose);


UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
  
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
  
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
  
  UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };






module.exports = mongoose.model('User', UserSchema);
