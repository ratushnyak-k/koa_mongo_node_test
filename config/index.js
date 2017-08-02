var configValues = require('./config');

module.exports = {

  getDbConnectionString: function () {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds129013.mlab.com:29013/test_koa_db';
  },

};