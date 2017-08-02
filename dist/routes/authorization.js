'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import nodemailer from 'nodemailer';
_router2.default.post('/signup', async function (ctx, next) {
  try {
    var user = await _user2.default.create(ctx.request.body);

    ctx.body = {
      user: user,
      token: _jsonwebtoken2.default.sign({ user: user }, 'secret')
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
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = err;
  }
});

_router2.default.post('/signin', async function (ctx, next) {
  try {
    var user = await _user2.default.findOne({ email: ctx.request.body.email });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        errors: {
          email: ['User with this email doesn\'t exist']
        }
      };
    } else if (!_bcryptjs2.default.compareSync(ctx.request.body.password, user.password)) {
      ctx.status = 400;
      ctx.body = {
        errors: {
          password: ['Incorrect password']
        }
      };
    } else {

      var token = _jsonwebtoken2.default.sign({ user: user }, 'secret');
      ctx.body = {
        token: token,
        user: user
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }
});

exports.default = _router2.default;