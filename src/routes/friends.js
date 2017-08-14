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