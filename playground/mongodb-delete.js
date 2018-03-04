// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'Arpit', age: 25};
// var {name} = user;                    // Object de-structuring
// console.log(name);

//MongoClient.connect(url, callback fn);

const url = 'mongodb://localhost:27017/TodoApp';    //TodoApp is the database name

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to database server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete todos');
  // });


  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete todos');
  // });


  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete todos');
  // });

  db.collection('Users').deleteMany({name: 'Arpit Gupta'}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete user');
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5a9bb2ba4616ae427caaea33')}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete user');
  });



  // client.close();
});
