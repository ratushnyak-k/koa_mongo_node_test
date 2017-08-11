import router from '../router';
import jwt from 'jsonwebtoken';
import User from '../models/User';

router.use('/users', async (ctx, next) => {
  try {
    jwt.verify(ctx.request.header.authorization, 'secret');
    await next();

  } catch (error) {
    console.log(error);
    ctx.status = 401;
    ctx.body = {
      errors: {
        detail: 'Incorrect token',
      },
    };
  }
});

router.get('/users', async (ctx, next) => {
  const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;

  ctx.body = await User.findOne({_id}).select('-password');
});

router.put('/users', async (ctx, next) => {
  try {

    const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;
    let data = ctx.request.body;
    delete data.email;
    delete data.password;
    await User.update({_id}, data, {runValidators: true});
    ctx.body = await User.findOne({_id}).select('-password');

  } catch (error) {
    console.log(error);
    ctx.status = 401;
    ctx.body = error;
  }

});

router.get('/users/get', async (ctx, next) => {
  const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;
  const user = await User.findById(_id);
  try {
    const {query} = ctx.request;
    const queries = {
      displayName: new RegExp(`${query.displayName || ''}`, 'ig'),
    };
    if (query.gender) {
      queries.gender = query.gender;
    }
    const options = {
      skip: +query.skip || 0,
      limit: +query.limit || 10,
      offset: +query.offset || 0,
      select: '-password -email -gender -location',
    };
    let users = await User.paginate(queries, options);

    const usersPromises = users.docs.map((item) => {
      return new Promise((resolve, reject) => {
        user.getRelationship(item._id, (err, res) => {
          if (err) {
            ctx.body = {
              detail: 'Error',
            };
            console.error(err);
            reject();
          } else {
            let user = item.toObject();
            user.status = res;
            resolve(user);
          }
        });
      });
    });
    ctx.body = await Promise.all(usersPromises);

  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = {
      detail: 'nothing found',
    };
  }
});

router.get('/users/:_id', async (ctx, next) => {
  try {
    const {_id} = ctx.params;
    ctx.body = await User.findOne({_id}).select('-password');

  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'nothing found';
  }
});

router.delete('/users/', async (ctx, next) => {
  try {
    const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;
    ctx.body = await User.remove({_id});
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'nothing found';
  }
});


export default router;