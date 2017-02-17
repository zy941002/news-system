'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * cache configs
 */
exports.default = {
  type: 'file', //cache type
  timeout: 6 * 3600, //6 hours
  adapter: {
    file: {
      path: think.RUNTIME_PATH + _path2.default.sep + 'cache',
      path_depth: 2,
      file_ext: '.json'
    },
    redis: {
      prefix: ''
    },
    memcache: {
      prefix: ''
    }
  }
};