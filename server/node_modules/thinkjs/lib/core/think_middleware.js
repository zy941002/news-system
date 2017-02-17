'use strict';

/**
 * create or exec middleware
 * @param  {Function} superClass []
 * @param  {Object} methods      []
 * @return {mixed}            []
 */

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Middleware = function Middleware() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var superClass = args[0],
      methods = args[1],
      data = args[2];

  var length = args.length;

  // register functional or class middleware
  // think.middleware('parsePayLoad', function(){})
  if (think.isString(superClass) && think.isFunction(methods)) {
    thinkData.middleware[superClass] = methods;
    return;
  }
  // exec middleware
  // think.middleware('parsePayLoad', http, data)
  if (length >= 2 && think.isHttp(methods)) {
    return Middleware.exec(superClass, methods, data);
  }
  // get middleware
  // think.middleware('parsePayLoad')
  if (length === 1 && think.isString(superClass)) {
    return Middleware.get(superClass);
  }
  return Middleware.create(superClass, methods);
};

/**
 * create middleware
 * @param  {Class} superClass []
 * @param  {Object} methods    []
 * @return {Class}            []
 */
Middleware.create = function (superClass, methods) {
  var middleware = thinkCache(thinkCache.COLLECTION, 'middleware');
  if (!middleware) {
    middleware = think.Class('middleware');
    thinkCache(thinkCache.COLLECTION, 'middleware', middleware);
  }
  // create middleware
  return middleware(superClass, methods);
};

/**
 * get middleware
 * @param  {String} name []
 * @return {Class}      []
 */
Middleware.get = function (name) {
  var middlware = thinkData.middleware[name];
  if (middlware) {
    return middlware;
  }
  var cls = think.require('middleware_' + name, true);
  if (cls) {
    return cls;
  }
  throw new Error(think.locale('MIDDLEWARE_NOT_FOUND', name));
};

/**
 * exec middleware
 * @param  {String} name []
 * @param  {Object} http []
 * @param  {Mixed} data []
 * @return {Promise}      []
 */
Middleware.exec = function (name, http, data) {
  if (think.isString(name)) {
    var fn = thinkData.middleware[name];
    // name is in middleware cache
    if (fn) {
      //class middleware must have run method
      if (fn.prototype.run) {
        var instance = new fn(http);
        return think.co(instance.run(data));
      } else {
        return think.co(fn(http, data));
      }
    } else {
      var Cls = think.require('middleware_' + name, true);
      if (Cls) {
        var _instance = new Cls(http);
        return think.co(_instance.run(data));
      }
      var err = new Error(think.locale('MIDDLEWARE_NOT_FOUND', name));
      return _promise2.default.reject(err);
    }
  }
  return think.co(name(http, data));
};

exports.default = Middleware;