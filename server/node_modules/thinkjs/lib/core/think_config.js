'use strict';

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get item config
 * @param  {} configPath []
 * @param  {} item       []
 * @return {}            []
 */
var _getItemConfig = function _getItemConfig(configPath, item) {
  var fileFilters = ['config', 'route', 'hook'];
  var dirFilters = ['env', 'sys'];
  if (think.isDir(configPath + '/' + item)) {
    if (dirFilters.indexOf(item) === -1) {
      var _ref;

      return _ref = {}, _ref[item] = _getConfig(configPath + '/' + item), _ref;
    }
    return;
  }
  item = item.slice(0, -3);
  if (item[0] === '_' || fileFilters.indexOf(item) > -1) {
    return;
  }
  var conf = think.safeRequire(configPath + '/' + item + '.js');
  if (conf) {
    var _ref2;

    return _ref2 = {}, _ref2[item] = conf, _ref2;
  }
};

/**
 * get module config
 * @param  {String} module []
 * @return {Object}        []
 */
var _getConfig = function _getConfig(configPath) {
  var config = {};
  if (!think.isDir(configPath)) {
    return config;
  }
  _fs2.default.readdirSync(configPath).forEach(function (item) {
    var data = _getItemConfig(configPath, item);
    config = think.extend(config, data);
  });
  return config;
};

/**
 * transform config
 * @param  {Object} config []
 * @return {Object}        []
 */
var _transformConfig = function _transformConfig(config, transforms) {
  for (var key in transforms) {
    if (!(key in config)) {
      continue;
    }
    var value = transforms[key];
    if (think.isFunction(value)) {
      config[key] = value(config[key], config);
    } else {
      config[key] = _transformConfig(config[key], value);
    }
  }
  return config;
};

var _getModuleConfig = function _getModuleConfig() {
  var module = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : think.dirname.common;


  //get module config from cache
  var moduleConfig = thinkData.config;
  if (moduleConfig[module]) {
    return moduleConfig[module];
  }

  var rootPath = void 0;
  //get sys config
  if (module === true) {
    rootPath = think.THINK_LIB_PATH + '/config';
  } else {
    rootPath = think.getPath(module, think.dirname.config);
  }

  //config.js
  var config = think.safeRequire(rootPath + '/config.js');
  var envConfig = {},
      extraConfig = _getConfig(rootPath);

  envConfig = think.safeRequire(rootPath + '/env/' + think.env + '.js');
  envConfig = think.extend(envConfig, _getConfig(rootPath + '/env/' + think.env));

  //merge all configs
  config = think.extend({}, config, extraConfig, envConfig);
  //merge sys, common configs to module
  if (module !== true) {
    if (module === think.dirname.common) {
      config = think.extend({}, _getModuleConfig(true), config);
    } else {
      config = think.extend({}, _getModuleConfig(), config);
    }
  }
  //transform config
  var transforms = think.safeRequire(think.THINK_LIB_PATH + '/config/sys/transform.js');
  config = _transformConfig(config, transforms);

  if (module !== true) {
    thinkData.config[module] = config;
  }

  return config;
};

/**
 * get or set config
 * @return {mixed} []
 */
//if set common config, must sync to module config
var _setConfig = function _setConfig(name, value, flag, data) {
  var configs = [];
  if (flag) {
    configs = think.module.map(function (item) {
      return _getModuleConfig(item);
    });
  }
  [data].concat(configs).forEach(function (itemData) {
    if (think.isObject(name)) {
      think.extend(itemData, name);
    } else if (think.isString(name)) {
      //name = name.toLowerCase();
      if (name.indexOf('.') === -1) {
        itemData[name] = value;
      } else {
        var names = name.split('.');
        itemData[names[0]] = itemData[names[0]] || {};
        itemData[names[0]][names[1]] = value;
      }
    }
  });
};

var Config = function Config(name, value, data) {
  var flag = !data;

  //convert data to undefined when is null (in http._config)
  if (data === null) {
    data = undefined;
  }
  //get data from module config
  if (!think.isObject(data)) {
    data = _getModuleConfig(data);
  }
  // get all config
  if (name === undefined) {
    return data;
  }
  // merge config
  if (think.isObject(name) || value !== undefined) {
    return _setConfig(name, value, flag, data);
  }
  //get config
  if (name.indexOf('.') === -1) {
    return data[name];
  }
  name = name.split('.');
  value = data[name[0]] || {};
  return value[name[1]];
};

exports.default = Config;