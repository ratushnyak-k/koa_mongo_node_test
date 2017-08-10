import router from '../router';
import jwt from 'jsonwebtoken';
import User from '../models/User';

router.use('/friends', async (ctx, next) => {
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


router.post('/friends/request/:userId', async (ctx, next) => {
  try {

    const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;
    const user = await User.findOne({_id});
    const {userId} = ctx.params;

    await new Promise((resolve, reject) => {
      try {
        if (_id === userId) {
          ctx.body = {
            errors: {
              detail: 'You can\'t make friend request to yourself',
            },
          };
        } else {

          user.friendRequest(userId, (err, res) => {
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
        detail: 'Incorrect token',
      },
    };

  }
});

router.get('/friends/get', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    try {
      const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;
    } catch (error) {
      console.log(error);
      ctx.status = 401;
      ctx.body = {
        errors: {
          detail: 'Incorrect token',
        },
      };
      reject();
    }
  });
});


export default router;