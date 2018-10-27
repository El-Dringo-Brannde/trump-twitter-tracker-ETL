const env = process.env.NODE_ENV || 'local';

const mongoHostConfig = {
   development: {
      host: 'mongodb://localhost:27017',
      user: '',
      password: ''
   },
   local: {
      host: 'mongodb://localhost:27017',
      user: '',
      password: ''
   },
   test: {
      host: 'mongodb://localhost:27017',
      user: '',
      password: ''
   }
};

const mongoConfig = {
   connection: {
      host: mongoHostConfig[env].host,
      user: mongoHostConfig[env].user,
      password: mongoHostConfig[env].password
   },
   debug: env === 'production' ? false : env !== 'development'
};

const mongoCollections = {
   users: 'users',
   products: 'products'
};
// Connection stuff

exports.mongoHostConfig = mongoHostConfig;
exports.mongoCollections = mongoCollections;
exports.configObj = mongoConfig;

exports.mongoHostURL = mongoHostConfig[env].host;
exports.mongoHostPass = mongoHostConfig[env].password;
exports.mongoHostUser = mongoHostConfig[env].user;
