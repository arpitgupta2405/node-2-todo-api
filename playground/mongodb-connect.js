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

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Arpit Gupta',
  //   age: 25,
  //   location: 'Bangalore'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert users', err);
  //   }
  //
  //   // console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });



  client.close();
});
