const env = process.env.NODE_ENV || 'local';

const SQLConfig = {
   development: {
      host: 'localhost',
      password: '123456789',
      port: 3306,
      user: 'root',
      database: 'Cloud'
   },
   local: {
      host: 'localhost',
      password: '123456789',
      port: 3306,
      user: 'root',
      database: 'Cloud'
   },
   test: {
      host: 'localhost',
      password: '123456789',
      port: 3306,
      user: 'root',
      database: 'Cloud'
   },
};

const SQLConfig = {
   connection: {
      host: SQLConfig[env].host,
      user: SQLConfig[env].user,
      password: SQLConfig[env].password
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

exports.configObj = SQLConfig;
exports.SQLHost = SQLConfig[env].host;
exports.SQLPassword = SQLConfig[env].password;
exports.SQLUser = SQLConfig[env].user;
