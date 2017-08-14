import router from '../router';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import {
  statusMatcher,
} from '../utils/helpers';

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
    const user = await User.findById(_id);
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
                detail: 'Error: A pending request already exists',
              };
              reject();
              console.error(err);
            } else {
              let response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id,
              };
              response.status = statusMatcher(res.status);
              ctx.body = response;
              resolve();
            }
          });
        }
      } catch (error) {
        ctx.body = {
          detail: 'Error',
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/friends/accept/:userId', async (ctx, next) => {
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

          user.acceptRequest(userId, (err, res) => {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists',
              };
              reject();
              console.error(err);
            } else {
              let response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id,
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
          detail: 'Error',
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/friends/cancel/:userId', async (ctx, next) => {
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

          user.cancelRequest(userId, (err, res) => {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists',
              };
              reject();
              console.error(err);
            } else {
              let response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id,
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
          detail: 'Error',
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/friends/deny/:userId', async (ctx, next) => {
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

          user.denyRequest(userId, (err, res) => {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists',
              };
              reject();
              console.error(err);
            } else {
              let response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id,
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
          detail: 'Error',
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/friends/remove/:userId', async (ctx, next) => {
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

          user.endFriendship(userId, (err, res) => {
            if (err) {
              ctx.body = {
                detail: 'Error: A pending request already exists',
              };
              reject();
              console.error(err);
            } else {
              let response = {
                dateSent: res.dateSent,
                status: res.status,
                _id: res._id,
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
          detail: 'Error',
        };
        console.log(error);
        reject();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/friends/get', async (ctx, next) => {
  const {_id} = jwt.verify(ctx.request.header.authorization, 'secret').user;
  const user = await User.findById(_id);
  const {query} = ctx.request;
  const conditions = {
    displayName: new RegExp(`${query.displayName || ''}`, 'ig'),
  };
  if (query.gender) {
    conditions.gender = query.gender;
  }
  const options = {
    skip: +query.skip || 0,
    limit: +query.limit || 10,
    offset: +query.offset || 0,
    select: '-password -email -gender -location',
  };
  const findParams = {
    options,
    conditions,
  };
  await new Promise((resolve, reject) => {
    try {
      user.getFriends(findParams, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          reject();
          console.error(err);
        } else {
          ctx.body = {
            docs: res,
            total: res.length,
            limit: options.limit,
            offset: options.offset,
          };
          resolve();
        }
      });
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