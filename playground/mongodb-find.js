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

  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos');
  // });

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos');
  // });

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a9bd8f8061b564fda1143d9')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos');
  // });

  // db.collection('Todos').find({completed: false}).count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to count todos');
  // });

  db.collection('Users').find({name: 'Arpit Gupta'}).toArray().then((docs) => {
    console.log('Users with name Arpit Gupta:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users');
  });

  client.close();
});
