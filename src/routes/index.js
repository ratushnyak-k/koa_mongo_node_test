import router from '../router';
//import Users from '../models/userModel';

router.get('/', async (ctx, next) => {
  console.log(ctx, next);
  //const starterUsers = [
    //  {
    //    username: 'String',
    //    email: 'String',
    //    address: 'String',
    //  },
    //  {
    //    username: 'String1',
    //    email: 'String1',
    //    address: 'String1',
    //  },
    //  {
    //    username: 'String2',
    //    email: 'String2',
    //    address: 'String2',
    //  }
    //];
    //Users.create(starterUsers, (err, results) => {
    //  if (err) throw err;
    //  res.send(results);
    //});


});

export default router;

