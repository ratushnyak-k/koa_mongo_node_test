//import nodemailer from 'nodemailer';
import User from '../models/User';
import router from '../router';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

router.post('/signup', async (ctx, next) => {
  try {
    let data = ctx.request.body;
    // TODO: rewrite validation password to user model
    data.password = bcrypt.hashSync(ctx.request.body.password, 10);

    const user = await User.create(data);

    ctx.body = {
      user,
      token: jwt.sign({user}, 'secret'),
    };
    //const transporter = nodemailer.createTransport({
    //  service: 'Gmail',
    //  auth: {
    //    user: 'kostyaexample007@gmail.com',
    //    pass: 'telez102938',
    //  },
    //});
    //
    //// TODO: Replace domain.
    //const link = `http://localhost:3000/activate-account?token=${jwt.sign({user}, 'secret', {expiresIn: 7200})}&id=${user._id}`;
    //const mailOptions = {
    //  from: 'mr.ratusha@example.com',
    //  to: user.email,
    //  subject: 'Email confirmation',
    //  html: `
    //    <h1>To confirm you sign up click on link below</h1>
    //    <a href="${link}">${link}</a>
    //  `,
    //};
    //transporter.sendMail(mailOptions, (error, info) => {console.log(error, info);});

  }
  catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/signin', async (ctx, next) => {
  try {
    const user = await User.findOne({email: ctx.request.body.email});

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        errors: {
          email: {
            message: 'User with this email doesn\'t exist',
          },
        },
      };
    }
    else if (!bcrypt.compareSync(ctx.request.body.password, user.password)) {
      ctx.status = 400;
      ctx.body = {
        errors: {
          password: {
            message: 'Incorrect password',
          },
        },
      };
    } else {

      const token = jwt.sign({user}, 'secret');
      ctx.body = {
        token,
        user,
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }
});


export default router;