const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

var id = '5aa225f696d617344078b731';

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({text: 'Second test todo'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove(id).then((todo) => {
  console.log(todo);
});
