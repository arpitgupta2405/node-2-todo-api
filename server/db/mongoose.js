var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/TodoApp1';

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = {
  mongoose
};
