import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';
import config from '../config/';
import mongoose from 'mongoose';

import index from './routes/index';
import authorization from './routes/authorization';
import users from './routes/users';
import friends from './routes/friends';

const app = new Koa();
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
