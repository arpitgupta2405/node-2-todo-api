var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
  });

  module.exports ={User};

// var newUser = new User({
//   email: 'arpit'
// });
//
// newUser.save().then((user) => {
//   console.log('Saved user', JSON.stringify(user, undefined, 2));
// }, (err) => {
//   console.log('Unable to save user',err);
// });
