var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    // res.send(err);
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

//GET todos by ID
app.get('/todos/:id',(req,res) => {
  //res.send(req.params);
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(400).end('ID is not valid');
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      res.status(404).send('Todo not found');
    }
    // res.send(JSON.stringify(todo, undefined, 2));
    res.status(200).send({todo});
  }).catch((e) => res.status(400).send(e));

});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});



module.exports = {app};
