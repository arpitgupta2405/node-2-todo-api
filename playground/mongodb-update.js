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

  //findOneAndUpdate


  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a9be3c5061b564fda1145d9')
  // },{
  //   $set:  {
  //     completed: false
  //   }
  // },{
  //     returnOriginal: false
  //   }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to update todos');
  // });

  db.collection('Users').findOneAndUpdate({name: 'Abi Pratap'},{
    $set:  {
      name: 'Arpit Gupta'
    },
    $inc: {
      age: 1
    }
  },{
      returnOriginal: false
    }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to update user');
  });


  // client.close();
});
