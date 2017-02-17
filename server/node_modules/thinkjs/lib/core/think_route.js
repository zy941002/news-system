'use strict';

/**
 * load route
 * route detail config
 *
 * module.exports = {
 *   admin: {
 *     reg: /^admin/, //module reg
 *     children: [
 *       /^admin\/reg/, 'admin/index/reg'
 *     ]
 *   },
 *   home: {
 *     children: [
 *       
 *     ]
 *   }
 * }
 * 
 * @return {} []
 */

exports.__esModule = true;
var _getDynamicRoute = function _getDynamicRoute(fn) {
  return think.co(fn()).then(function () {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    thinkData.route = route;
    return route;
  });
};

var _getModuleRoute = function _getModuleRoute(config) {
  for (var module in config) {
    var filepath = think.getPath(module, think.dirname.config) + '/route.js';
    var moduleConfig = think.safeRequire(filepath);
    config[module].children = moduleConfig || [];
  }
  thinkData.route = config;
  return config;
};
/**
 * get route
 * @param  {} key []
 * @return {}     []
 */
var _getRoute = function _getRoute() {
  var file = think.getPath(undefined, think.dirname.config) + '/route.js';
  var config = think.safeRequire(file) || [];

  //route config is funciton, may be is dynamic save in db
  if (think.isFunction(config)) {
    return _getDynamicRoute(config);
  }
  //get module route config
  if (think.isObject(config) && think.mode === think.mode_module) {
    return _getModuleRoute(config);
  }
  thinkData.route = config;
  return config;
};

var Route = function Route(routes) {
  //remove route
  if (routes === null) {
    thinkData.route = null;
    return;
  }
  //set route
  if (think.isArray(routes) || think.isObject(routes)) {
    thinkData.route = routes;
    return;
  }
  //get route
  if (thinkData.route) {
    return thinkData.route;
  }
  return _getRoute();
};

exports.default = Route;