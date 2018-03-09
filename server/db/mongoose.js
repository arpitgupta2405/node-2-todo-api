var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/TodoApp1';
var mongodb_uri = 'mongodb://<arpitgupta2405>:<qwerty@123>@ds261138.mlab.com:61138/todo-app-api'

mongoose.Promise = global.Promise;
mongoose.connect( mongodb_uri || url);

module.exports = {
  mongoose
};
