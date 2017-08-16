'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _config = require('../config/');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _koaSocket = require('koa-socket');

var _koaSocket2 = _interopRequireDefault(_koaSocket);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _authorization = require('./routes/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _friends = require('./routes/friends');

var _friends2 = _interopRequireDefault(_friends);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var io = new _koaSocket2.default();
if (process.env.NODE_ENV !== 'development') {
  app.use((0, _koaCors2.default)());
}
app.use((0, _koaLogger2.default)());

app.use((0, _koaBodyparser2.default)());
app.use(async function (ctx, next) {
  ctx.set('content-type', 'application/json');
  await next();
});
app.use(_index2.default.routes());
app.use(_authorization2.default.routes());
app.use(_users2.default.routes());
app.use(_friends2.default.routes());

io.attach(app);
io.use(async function (ctx, next) {
  console.log('Socket middleware');
  var start = new Date();
  await next();
  var ms = new Date() - start;
  console.log('WS ' + ms + 'ms');
});
io.use(async function (ctx, next) {
  ctx.teststring = 'test';
  await next();
});
io.on('connection', function (ctx) {
  console.log('Join event', ctx.socket.id);
  io.broadcast('connections', {
    numConnections: io.connections.size
  });
  // app.io.broadcast( 'connections', {
  //   numConnections: socket.connections.size
  // })
});
io.on('disconnect', function (ctx) {
  console.log('leave event', ctx.socket.id);
  io.broadcast('connections', {
    numConnections: io.connections.size
  });
});

_mongoose2.default.Promise = Promise;
if (process.env.NODE_ENV === 'development') {
  _mongoose2.default.set('debug', true);
}
_mongoose2.default.connect(process.env.NODE_ENV === 'development' ? _config2.default.getDevelopDbConnectionString() : _config2.default.getProductionDbConnectionString(), {
  useMongoClient: true
});
_mongoose2.default.connection.on('error', console.error);

exports.default = app;