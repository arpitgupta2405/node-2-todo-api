const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


// beforeEach((done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(() => done());
// });

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with bad data', (done) => {

    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
 it('should get all todos', (done) => {

   request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2)
    })
    .end(done);
 });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {

      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done)
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID();
    request(app)
    .get(`/todos/${id.toHexString()}`)
    .expect(404)
    .end(done)
  });

  it('should return 400 if invalid object id', (done) => {

    request(app)
    .get('/todos/5a9f6a9d008f0e1c588bd34ee')
    .expect(400)
    .end(done)
  });
});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    var hexID = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID();

    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  });

  it('should return 400 if invalid object id', (done) => {
    request(app)
      .delete('/todos/123455')
      .expect(400)
      .end(done)
  });
});

describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    var hexID = todos[0]._id.toHexString();
    var text = 'TEST CASE';
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completedAt).toBeGreaterThan(0);
      })
      .end(done)
  });

  it('should clear completedAt when completed is false', (done) => {
    var hexID = todos[1]._id.toHexString();
    var text = 'TEST CASE';
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done)
  });
});

describe('GET /users/me', () => {

  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done)
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done)
  });
});

describe('POST /users', () => {

  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = 'qwerty123'

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      // .end(done)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request is invalid', (done) => {
    var email = 'example@example.com';
    var password = 'qwert'

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeNull();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create user if email is already in use', (done) => {
    var email = users[0].email;
    var password = 'qwerty123';

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(400)
      .end(done)
});
});
