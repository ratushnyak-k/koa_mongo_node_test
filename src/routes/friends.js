import router from '../router';
import jwt from 'jsonwebtoken';
import User, { mongooseFriends } from '../models/User';
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
    limit: +query.limit || 10,
    skip: +query.offset || 0,
    select: '-password -email -gender -location',
  };
  const findParams = {
    options,
    conditions,
  };
  let friends = await new Promise((resolve, reject) => {
    try {
      user.getFriends(findParams, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          reject();
          console.error(err);
        } else {
          resolve({
            docs: res,
            limit: options.limit,
            offset: options.skip,
          });
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

  const friendsPromises = friends.docs.map((item) => {
    return new Promise((resolve, reject) => {
      user.getFriendship(item._id, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          console.error(err);
          reject();
        } else {
          let user = item.toObject();
          user.friendship = {
            status: 3,
            requester: res.requester._id,
          };
          resolve(user);
        }
      });
    });
  });
  friends.docs = await Promise.all(friendsPromises);

  ctx.body = await new Promise((resolve, reject) => {
    mongooseFriends.Friendship.count({
      '$or': [
        {requester: user._id},
        {requested: user._id},
      ],
      status: 'Accepted',
    }, (err, res) => {
      if (err) {
        reject();
        console.error(err);
      } else {
        friends.total = res;
        resolve(friends)
      }
    });
  });
});


router.get('/friends/pending/get', async (ctx, next) => {
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
    limit: +query.limit || 10,
    skip: +query.offset || 0,
    select: '-password -email -gender -location',
  };
  const findParams = {
    options,
    conditions,
  };
  let pendingUsers = await new Promise((resolve, reject) => {
    try {
      user.getPendingFriends(findParams, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          reject();
          console.error(err);
        } else {
          resolve({
            docs: res,
            limit: options.limit,
            offset: options.skip,
          });
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

  const pendingUsersPromises = pendingUsers.docs.map((item) => {
    return new Promise((resolve, reject) => {
      user.getFriendship(item._id, (err, res) => {
        if (err) {
          ctx.body = {
            detail: 'Error',
          };
          console.error(err);
          reject();
        } else {
          let user = item.toObject();
          user.friendship = {
            status: 2,
            requester: res.requester._id,
          };
          resolve(user);
        }
      });
    });
  });

  pendingUsers.docs = await Promise.all(pendingUsersPromises);

  ctx.body = await new Promise((resolve, reject) => {
    mongooseFriends.Friendship.count({
      '$or': [
        {requester: user._id},
        {requested: user._id},
      ],
      status: 'Pending',
    }, (err, res) => {
      if (err) {
        reject();
        console.error(err);
      } else {
        pendingUsers.total = res;
        resolve(pendingUsers)
      }
    });
  });
});

export default router;