var env = process.env.NODE_ENV || 'development';

if(process.env.PORT){
  process.env.MONGODB_URI = 'mongodb://arpitgupta2405:Gmail123@ds261138.mlab.com:61138/todo-app-api'
}else {
  process.env.PORT = 3000;
if(env === 'development') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp1';
} else if(env === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
}
