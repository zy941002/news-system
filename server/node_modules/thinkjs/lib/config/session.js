'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * session configs
 */
exports.default = {
  name: 'thinkjs',
  type: 'file',
  secret: '',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + _path2.default.sep + 'session'
    }
  }
};