var configValues = require('./config');

module.exports = {

  getProductionDbConnectionString: () => {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds129013.mlab.com:29013/test_koa_db';
  },

  getDevelopDbConnectionString: () => {
    return 'mongodb://localhost:27017/test_db';
  },
};