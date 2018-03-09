var mongoose = require('mongoose');


let db = {
  localhost: 'mongodb://localhost:27017/TodoApp1',
  uri: 'mongodb://arpitgupta2405:Gmail123@ds261138.mlab.com:61138/todo-app-api'
};

mongoose.Promise = global.Promise;
// mongoose.connect(mongodb_uri || url);
// mongoose.connect('mongodb://localhost:27017/TodoApp1' || 'mongodb://arpitgupta2405:Gmail123@ds261138.mlab.com:61138/todo-app-api')

mongoose.connect(db.localhost || db.uri);

module.exports = {
  mongoose
};
