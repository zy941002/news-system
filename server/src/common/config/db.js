'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: 'localhost',
      port: '3306',
      database:'news',
      user: 'root',
      password: '1q2w3e',
      prefix: '',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};