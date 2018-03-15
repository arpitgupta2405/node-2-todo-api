const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
      return token;
    });
};

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
