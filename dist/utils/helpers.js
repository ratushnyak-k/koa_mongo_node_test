'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var statusMatcher = exports.statusMatcher = function statusMatcher(status) {
  var number = void 0;
  switch (status) {
    case 'Pending':
      number = 2;
      break;
    case 'Accepted':
      number = 3;
      break;
    case undefined:
    default:
      number = 0;
      break;
  }
  return number;
};