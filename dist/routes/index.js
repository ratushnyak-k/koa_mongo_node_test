'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Users from '../models/userModel';

_router2.default.get('/', async function (ctx, next) {
  console.log(ctx, next);
  //const starterUsers = [
  //  {
  //    username: 'String',
  //    email: 'String',
  //    address: 'String',
  //  },
  //  {
  //    username: 'String1',
  //    email: 'String1',
  //    address: 'String1',
  //  },
  //  {
  //    username: 'String2',
  //    email: 'String2',
  //    address: 'String2',
  //  }
  //];
  //Users.create(starterUsers, (err, results) => {
  //  if (err) throw err;
  //  res.send(results);
  //});

});

exports.default = _router2.default;