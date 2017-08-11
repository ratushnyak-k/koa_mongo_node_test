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

var statusMatcher = function statusMatcher(status) {
  var number = void 0;
  switch (status) {
    case 'Pending':
      number = 2;
      break;
    case 'Accepted':
      number = 3;
      break;
    case undefined:
    default:
      number = 0;
      break;
  }
  return number;
};

_router2.default.post('/friends/request/:userId', async function (ctx, next) {
  try {
    var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

    var user = await _User2.default.findById(_id);
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
                detail: 'Error: A pending request already exists'
              };
              reject();
              console.error(err);
            } else {
              var response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id
              };

              response.status = statusMatcher(res.status);
              console.log(response);
              ctx.body = response;
              resolve();
            }
          });
        }
      } catch (error) {
        ctx.body = {
          detail: 'Error'
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

_router2.default.post('/friends/accept/:userId', async function (ctx, next) {
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

          user.acceptRequest(userId, function (err, res) {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists'
              };
              reject();
              console.error(err);
            } else {
              var response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id
              };

              response.status = statusMatcher(res.status);
              console.log(response);
              ctx.body = response;
              resolve();
            }
          });
        }
      } catch (error) {
        ctx.body = {
          detail: 'Error'
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

_router2.default.post('/friends/cancel/:userId', async function (ctx, next) {
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

          user.cancelRequest(userId, function (err, res) {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists'
              };
              reject();
              console.error(err);
            } else {
              var response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id
              };

              response.status = statusMatcher(res.status);
              console.log(response);
              ctx.body = response;
              resolve();
            }
          });
        }
      } catch (error) {
        ctx.body = {
          detail: 'Error'
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

_router2.default.post('/friends/deny/:userId', async function (ctx, next) {
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

          user.denyRequest(userId, function (err, res) {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists'
              };
              reject();
              console.error(err);
            } else {
              var response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id
              };

              response.status = statusMatcher(res.status);
              console.log(response);
              ctx.body = response;
              resolve();
            }
          });
        }
      } catch (error) {
        ctx.body = {
          detail: 'Error'
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

_router2.default.post('/friends/remove/:userId', async function (ctx, next) {
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

          user.endFriendship(userId, function (err, res) {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists'
              };
              reject();
              console.error(err);
            } else {
              var response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id
              };

              response.status = statusMatcher(res.status);
              console.log(response);
              ctx.body = response;
              resolve();
            }
          });
        }
      } catch (error) {
        ctx.body = {
          detail: 'Error'
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
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