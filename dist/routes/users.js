'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router2.default.use('/users', async function (ctx, next) {
  try {
    _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret');
    await next();
  } catch (error) {
    console.log(error);
    ctx.status = 401;
    ctx.body = {
      errors: {
        detail: 'Incorrect token'
      }
    };
  }
});

_router2.default.get('/users', async function (ctx, next) {
  var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

  ctx.body = await _User2.default.findOne({ _id: _id }).select('-password');
});

_router2.default.put('/users', async function (ctx, next) {
  try {
    var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

    var data = ctx.request.body;
    delete data.email;
    delete data.password;
    await _User2.default.update({ _id: _id }, data, { runValidators: true });
    ctx.body = await _User2.default.findOne({ _id: _id }).select('-password');
  } catch (error) {
    console.log(error);
    ctx.status = 401;
    ctx.body = error;
  }
});

_router2.default.get('/users/get', async function (ctx, next) {
  var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

  var user = await _User2.default.findById(_id);
  try {
    var query = ctx.request.query;

    var queries = {
      displayName: new RegExp('' + (query.displayName || ''), 'ig')
    };
    if (query.gender) {
      queries.gender = query.gender;
    }
    var options = {
      skip: +query.skip || 0,
      limit: +query.limit || 10,
      offset: +query.offset || 0,
      select: '-password -email -gender -location'
    };
    var users = await _User2.default.paginate(queries, options);

    var usersPromises = users.docs.map(function (item) {
      return new Promise(function (resolve, reject) {
        user.getFriendship(item._id, function (err, res) {
          if (err) {
            ctx.body = {
              detail: 'Error'
            };
            console.error(err);
            reject();
          } else {
            var _user = item.toObject();
            _user.friendshipStatus = res;
            resolve(_user);
          }
        });
      });
    });
    users.docs = await Promise.all(usersPromises);
    ctx.body = users;
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = {
      detail: 'nothing found'
    };
  }
});

_router2.default.get('/users/:_id', async function (ctx, next) {
  try {
    var _id = ctx.params._id;

    ctx.body = await _User2.default.findOne({ _id: _id }).select('-password');
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'nothing found';
  }
});

_router2.default.delete('/users/', async function (ctx, next) {
  try {
    var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

    ctx.body = await _User2.default.remove({ _id: _id });
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'nothing found';
  }
});

exports.default = _router2.default;