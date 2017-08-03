'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateEmail = function validateEmail(email) {
  var re = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i;
  return re.test(email);
};

var userSchema = new _mongoose2.default.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required'
    //validate: [validateEmail, 'Please fill a valid email address'],
    //match: [/^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  location: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    postcode: {
      type: Number
    }
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  },
  phone: {
    type: String
  }

});
userSchema.plugin(_mongooseUniqueValidator2.default);
userSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('User', userSchema);