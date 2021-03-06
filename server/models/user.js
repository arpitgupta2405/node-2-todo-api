const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {                            // validator: validator.isEmail === it will work fine also
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
  });

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.genAuthToken = function() {
    var user  = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
      return token;
    });
};

UserSchema.methods.removeToken = function (token) {
   var user = this;

   return user.update({
     $pull: {
       tokens: {                 //{token} will also work fine
         token: token
       }
     }
   });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(e) {
      return Promise.reject('Invalid Signature');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject('User not found');
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result){
          resolve(user);
        }
        else {
          reject('Invalid Password');
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

    if(user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err,hash) => {
          user.password = hash;
          next();
        });
      });

    } else {
      next();
    }
});

var User = mongoose.model('User', UserSchema);

  module.exports = {User};

// var newUser = new User({
//   email: 'arpit'
// });
//
// newUser.save().then((user) => {
//   console.log('Saved user', JSON.stringify(user, undefined, 2));
// }, (err) => {
//   console.log('Unable to save user',err);
// });
