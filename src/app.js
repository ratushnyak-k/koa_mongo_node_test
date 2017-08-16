import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';
import config from '../config/';
import mongoose from 'mongoose';
import IO from 'koa-socket';

import index from './routes/index';
import authorization from './routes/authorization';
import users from './routes/users';
import friends from './routes/friends';

const app = new Koa();
const io = new IO();
if (process.env.NODE_ENV !== 'development') {
  app.use(cors());

}
app.use(logger());

app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  await next();

});
app.use(index.routes());
app.use(authorization.routes());
app.use(users.routes());
app.use(friends.routes());

io.attach(app);
io.use(async (ctx, next) => {
  console.log('Socket middleware');
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`WS ${ ms }ms`);
});
io.use(async (ctx, next) => {
  ctx.teststring = 'test';
  await next();
});
io.on('connection', ctx => {
  console.log('Join event', ctx.socket.id);
  io.broadcast('connections', {
    numConnections: io.connections.size,
  });
  // app.io.broadcast( 'connections', {
  //   numConnections: socket.connections.size
  // })
});
io.on('disconnect', ctx => {
  console.log('leave event', ctx.socket.id);
  io.broadcast('connections', {
    numConnections: io.connections.size,
  });
});

mongoose.Promise = Promise;
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}
mongoose.connect(process.env.NODE_ENV === 'development' ?
  config.getDevelopDbConnectionString() :
  config.getProductionDbConnectionString(), {
  useMongoClient: true,
});
mongoose.connection.on('error', console.error);

export default app;
