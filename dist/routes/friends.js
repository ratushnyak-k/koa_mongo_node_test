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

var _helpers = require('../utils/helpers');

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
              response.status = (0, _helpers.statusMatcher)(res.status);
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

              response.status = (0, _helpers.statusMatcher)(res.status);
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

              response.status = (0, _helpers.statusMatcher)(res.status);
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

              response.status = (0, _helpers.statusMatcher)(res.status);
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

              response.status = (0, _helpers.statusMatcher)(res.status);
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
  var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

  var user = await _User2.default.findById(_id);
  var query = ctx.request.query;

  var conditions = {
    displayName: new RegExp('' + (query.displayName || ''), 'ig')
  };
  if (query.gender) {
    conditions.gender = query.gender;
  }
  var options = {
    skip: +query.skip || 0,
    limit: +query.limit || 10,
    offset: +query.offset || 0,
    select: '-password -email -gender -location'
  };
  var findParams = {
    options: options,
    conditions: conditions
  };
  await new Promise(function (resolve, reject) {
    try {
      user.getFriends(findParams, function (err, res) {
        if (err) {
          ctx.body = {
            detail: 'Error'
          };
          reject();
          console.error(err);
        } else {
          ctx.body = {
            docs: res,
            total: res.length,
            limit: options.limit,
            offset: options.offset
          };
          resolve();
        }
      });
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

_router2.default.get('/friends/requests/get', async function (ctx, next) {
  var _id = _jsonwebtoken2.default.verify(ctx.request.header.authorization, 'secret').user._id;

  var user = await _User2.default.findById(_id);
  var query = ctx.request.query;

  var conditions = {
    displayName: new RegExp('' + (query.displayName || ''), 'ig')
  };
  if (query.gender) {
    conditions.gender = query.gender;
  }
  var options = {
    skip: +query.skip || 0,
    limit: +query.limit || 10,
    offset: +query.offset || 0,
    select: '-password -email -gender -location'
  };
  var findParams = {
    options: options,
    conditions: conditions
  };
  await new Promise(function (resolve, reject) {
    try {
      user.getPendingFriends(findParams, function (err, res) {
        if (err) {
          ctx.body = {
            detail: 'Error'
          };
          reject();
          console.error(err);
        } else {
          ctx.body = {
            docs: res,
            total: res.length,
            limit: options.limit,
            offset: options.offset
          };
          resolve();
        }
      });
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