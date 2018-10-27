const env = process.env.NODE_ENV || 'local';

const SQLConfig = {
   development: {
      user: 'dbuser',
      host: 'localhost',
      database: 'mydb',
      password: 'secretpassword',
      port: 3211
   },
   local: {
      user: 'dbuser',
      host: 'localhost',
      database: 'mydb',
      password: 'secretpassword',
      port: 3211
   },
   test: {
      user: 'dbuser',
      host: 'localhost',
      database: 'mydb',
      password: 'secretpassword',
      port: 3211
   }
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
