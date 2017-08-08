'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageSchema = new _mongoose2.default.Schema({
  text: {
    type: String,
    require: true
  },
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  }
});
messageSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('Message', messageSchema);