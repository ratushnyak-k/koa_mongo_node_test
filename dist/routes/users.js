'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

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
        detail: ['Incorrect token']
      }
    };
  }
});

_router2.default.get('/users/get', async function (ctx, next) {
  try {
    var query = ctx.request.query;

    var queries = {
      displayName: new RegExp('' + (query.displayName || ''))
    };
    var options = {
      skip: +query.skip || 0,
      limit: +query.limit || 10,
      offset: +query.offset || 0,
      select: '-password'
    };
    ctx.body = await _user2.default.paginate(queries, options);
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'nothing found';
  }
});

_router2.default.get('/users/:_id', async function (ctx, next) {
  try {
    var _id = ctx.params._id;

    ctx.body = await _user2.default.findOne({ _id: _id });
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'nothing found';
  }
});

exports.default = _router2.default;