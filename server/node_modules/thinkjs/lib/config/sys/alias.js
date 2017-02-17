'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sep = _path2.default.sep; /**
                               * thinkjs module path config
                               * @type {Object}
                               */

var rootPath = think.THINK_LIB_PATH + sep;

exports.default = {
  base: rootPath + 'core' + sep + 'base.js',
  app: rootPath + 'core' + sep + 'app.js',
  http: rootPath + 'core' + sep + 'http.js',
  view: rootPath + 'core' + sep + 'view.js',
  // auth: `${rootPath}util${sep}auth.js`,
  cookie: rootPath + 'util' + sep + 'cookie.js',
  validator: rootPath + 'util' + sep + 'validator.js',
  await: rootPath + 'util' + sep + 'await.js',
  parallel_limit: rootPath + 'util' + sep + 'parallel_limit.js'
};