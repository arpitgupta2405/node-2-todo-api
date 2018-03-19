var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type:  Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    reuired: true
  }
});

module.exports ={Todo};
//
// var newTodo = new Todo({
//   text: '  Sleep       '
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save todo',err);
// });

// var otherTodo = new Todo({
//   text: 'Eat Dinner',
//   completed: true,
//   completedAt: 20180404
// });
//
// otherTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (err) => {
//   console.log('Unable to save todo');
// });
