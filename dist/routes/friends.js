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

_router2.default.use('/friends', async function (ctx, next) {
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

_router2.default.post('/friends/request/:userId', async function (ctx, next) {
  try {
    var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

    var user = await _User2.default.findOne({ _id: _id });
    var userId = ctx.params.userId;


    await new Promise(function (resolve, reject) {
      try {
        if (_id === userId) {
          ctx.body = {
            errors: {
              detail: 'You can\'t make friend request to yourself'
            }
          };
        } else {

          user.friendRequest(userId, function (err, res) {
            if (err) {
              ctx.body = {
                detail: 'Error'
              };
              reject();
              console.error(err);
            } else {
              console.log(res);
              ctx.body = res;
              resolve();
            }
          });
        }
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      errors: {
        detail: 'Incorrect token'
      }
    };
  }
});

_router2.default.get('/friends/get', async function (ctx, next) {
  await new Promise(function (resolve, reject) {
    try {
      var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;
    } catch (error) {
      console.log(error);
      ctx.status = 401;
      ctx.body = {
        errors: {
          detail: 'Incorrect token'
        }
      };
      reject();
    }
  });
});

exports.default = _router2.default;