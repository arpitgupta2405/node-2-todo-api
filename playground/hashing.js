const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'password@123';

// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(password, salt);
// console.log(hash);

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err,hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$HYEyn3IrioIF.QTZQfPwPeqVVS2qDWWzCUeJ/YnaFrWUWZ6ydkzuu';

bcrypt.compare('password', hashedPassword, (err, result) => {
  console.log(result);
});

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 5
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+'Some secret string').toString()
// };
//
// // token.id = 4;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data)+'Some secret string').toString();
//
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data is changed');
// }
