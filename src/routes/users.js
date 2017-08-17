import router from '../router';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import {
  statusMatcher,
} from '../utils/helpers';

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
            user.friendship = {
              status: res,
            };
            resolve(user);
          }
        });
      });
    });

    const usersPromisesWithRelations = await Promise.all(usersPromises);
    const usersPromisesWithRequestedStatus = usersPromisesWithRelations.map((item) => {
      return new Promise((resolve, reject) => {
        user.getFriendship(item._id, (err, res) => {
          if (err) {
            ctx.body = {
              detail: 'Error',
            };
            console.error(err);
            reject();
          } else {
            if (res) {
              item.friendship.requester = res.requester._id;
            }
            resolve(item);
          }
        });
      });
    });
    users.docs = await Promise.all(usersPromisesWithRequestedStatus);
    ctx.body = users;

  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = {
      detail: 'nothing found',
    };
  }
});

router.get('/users/:_id', async (ctx, next) => {
  const myId = jwt.verify(ctx.request.header.authorization, 'secret').user._id;
  const me = await User.findById(myId);
  try {
    const {_id} = ctx.params;
    const user = await User.findById(_id).select('-password');

    let userWithStatus = await new Promise((resolve, reject) => {
      me.getRelationship(user._id, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          console.error(err);
          reject();
        } else {
          let userData = user.toObject();
          userData.friendship = {
            status: res,
          };
          resolve(userData);
        }
      });
    });

    ctx.body = await new Promise((resolve, reject) => {
      me.getFriendship(user._id, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          console.error(err);
          reject();
        } else {
          console.log(userWithStatus);
          if (res) {
            userWithStatus.friendship.requester = res.requester._id;
          }
          resolve(userWithStatus);
        }
      });
    });;

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