'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * check node version
   * @return {} []
   */
  checkNodeVersion: function checkNodeVersion() {
    var packageFile = think.THINK_PATH + '/package.json';

    var _JSON$parse = JSON.parse(_fs2.default.readFileSync(packageFile, 'utf-8')),
        engines = _JSON$parse.engines;

    var needVersion = engines.node.substr(2);

    var nodeVersion = process.version;
    if (nodeVersion[0] === 'v') {
      nodeVersion = nodeVersion.slice(1);
    }

    if (needVersion > nodeVersion) {
      think.log('ThinkJS need node version >= ' + needVersion + ', current version is ' + nodeVersion + ', please upgrade it.', 'EXIT');
    }
  },

  /**
   * check application filename is lower
   * @return {} []
   */
  checkFileName: function checkFileName() {
    var files = think.getFiles(think.APP_PATH, true);
    var reg = /\.(js|html|tpl)$/;
    var uppercaseReg = /[A-Z]+/;
    var localPath = '' + think.sep + think.dirname.locale + think.sep;
    var filter = function filter(item) {
      if (!reg.test(item)) {
        return;
      }
      item = _path2.default.normalize(item);
      //ignore files in config/locale
      if (item.indexOf(localPath) > -1) {
        return;
      }
      return true;
    };
    files.forEach(function (item) {
      if (filter(item) && uppercaseReg.test(item)) {
        think.log('file `' + item + '` has uppercase chars.', 'WARNING');
      }
    });
  },

  /**
   * check dependencies is installed before server start
   * @return {} []
   */
  checkDependencies: function checkDependencies() {
    var packageFile = think.ROOT_PATH + '/package.json';
    if (!think.isFile(packageFile)) {
      return;
    }
    var data = JSON.parse(_fs2.default.readFileSync(packageFile, 'utf8'));
    var dependencies = think.extend({}, data.dependencies);
    //only merge devDependencies in development env
    if (think.env === 'development') {
      dependencies = think.extend(dependencies, data.devDependencies);
    }
    //package alias
    var pkgAlias = {
      'babel-runtime': 'babel-runtime/helpers/inherits'
    };
    var pkgPath = '' + think.ROOT_PATH + think.sep + 'node_modules' + think.sep;
    for (var pkg in dependencies) {
      pkg = pkgAlias[pkg] || pkg;
      if (think.isDir('' + pkgPath + pkg)) {
        continue;
      }
      try {
        require(pkg);
      } catch (e) {
        think.log('package `' + pkg + '` is not installed. please run `npm install` command before start server.', 'EXIT');
      }
    }
  },

  /**
   * check module config
   * @return {} []
   */
  checkModuleConfig: function checkModuleConfig() {
    if (think.mode !== think.mode_module) {
      return;
    }
    // check module config
    // some config must be set in common module
    var keys = [],
        errorKey = 'error_config_key';
    var errorConfigKeys = thinkCache(thinkCache.COLLECTION, errorKey);
    if (think.isEmpty(errorConfigKeys)) {
      thinkCache(thinkCache.COLLECTION, errorKey, []);
      errorConfigKeys = thinkCache(thinkCache.COLLECTION, errorKey);
    }

    var checkMConfig = function checkMConfig(module) {
      if (keys.length === 0) {
        keys = (0, _keys2.default)(think.safeRequire(think.THINK_LIB_PATH + '/config/config.js'));
      }

      //check config key not set as file name
      keys.forEach(function (item) {
        var configFilePath = think.getPath(module, think.dirname.config) + '/' + item + '.js';
        if (think.isFile(configFilePath)) {
          think.log('file `config' + think.sep + item + '.js` is not allowed, it\'s already used for config key.', 'EXIT');
        }
      });

      if (module === 'common') {
        return;
      }

      var configFilePath = think.getPath(module, think.dirname.config) + '/config.js';
      if (!think.isFile(configFilePath)) {
        return;
      }
      var config = think.safeRequire(configFilePath);
      keys.forEach(function (key) {
        if (config[key] && errorConfigKeys.indexOf(key) === -1) {
          errorConfigKeys.push(key);
          think.log('config key `' + key + '` can not be set in `' + module + '` module, must be set in `common` module', 'WARNING');
        }
      });
    };

    var modules = think.module;
    //load modules config
    modules.forEach(function (module) {
      checkMConfig(module);
    });
  }
};