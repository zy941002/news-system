'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * route array rules:
 * [
 *   [/^user\/(\d+)/, 'home/user/detail?id=:1'],
 *   [/^usr\/(\d+)/, {
 *     get: 'home/user/detail?id=:1',
 *     post: 'home/user/delete?id=:1'
 *   }],
 *   ...
 * ]
 *
 * route object rules:
 * {
 *   admin: {
 *     reg: /^admin/,
 *     children: [
 *       
 *     ]
 *   }
 * }
 */

var _class = function (_think$middleware$bas) {
  (0, _inherits3.default)(_class, _think$middleware$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$middleware$bas.apply(this, arguments));
  }

  /**
   * run
   * @return {Promise} []
   */
  _class.prototype.run = function run() {
    // cleanPathname
    this.http.pathname = this.http.pathname.replace(/^\/|\/$/g, '');

    if (!this.config('route_on')) {
      return this.parsePathname();
    }

    var rules = think.route();
    if (think.isEmpty(rules)) {
      return this.parsePathname();
    }
    return this.parse(rules);
  };
  /**
   * parse routes
   * @param  {Array} routes [routes]
   * @return {}        []
   */


  _class.prototype.parse = function parse(rules) {
    if (think.isArray(rules)) {
      return this.parseRules(rules);
    }
    for (var module in rules) {
      var reg = rules[module].reg;
      if (!reg || reg.test(this.http.pathname)) {
        this.module = module;
        return this.parseRules(rules[module].children);
      }
    }
    return this.parsePathname();
  };
  /**
   * parse array rules
   * @param  {Array} rules []
   * @return {}       []
   */


  _class.prototype.parseRules = function parseRules(rules) {
    var length = rules.length;
    var pathname = this.http.pathname;
    if (length === 0 || !pathname) {
      return this.parsePathname();
    }
    var match = void 0,
        item = void 0,
        route = void 0,
        rule = void 0;
    for (var i = 0; i < length; i++) {
      item = rules[i];
      route = this.getRoute(item[1]);
      if (!route) {
        continue;
      }
      rule = item[0];
      //regexp route
      if (think.isRegExp(rule)) {
        match = pathname.match(rule);
        if (match) {
          return this.parseRegExpRule(match, route);
        }
      }
      //is string route
      else if (this.checkUrlMatch(rule)) {
          return this.parseRoute(route);
        }
    }
    return this.parsePathname();
  };
  /**
   * get module from pathname
   * @return {String} []
   */


  _class.prototype.parseModule = function parseModule() {
    var defaultModule = think.config('default_module');
    if (think.mode === think.mode_normal) {
      return defaultModule;
    }
    var http = this.http;
    var pathname = http.pathname;
    var pos = pathname.indexOf('/');
    var mod = pos === -1 ? pathname : pathname.substr(0, pos);
    if (this.module) {
      if (this.module === mod) {
        http.pathname = pathname.substr(mod.length + 1);
      } else {
        mod = this.module;
      }
    } else if (mod && mod !== think.dirname.common && think.module.indexOf(mod) > -1) {
      http.pathname = pathname.substr(mod.length + 1);
    } else {
      mod = '';
    }
    return this.getModule(mod);
  };
  /**
   * get controller from pathname
   * @return {} []
   */


  _class.prototype.parseController = function parseController(module) {
    var subControllers = thinkData.subController[module];
    var http = this.http;
    var pathname = http.pathname;
    if (!pathname) {
      return '';
    }
    var pos = pathname.indexOf('/');
    //search sub controller
    if (pos > -1 && subControllers) {
      for (var i = 0, length = subControllers.length, item; i < length; i++) {
        item = subControllers[i];
        if (pathname === item || pathname.indexOf(item + '/') === 0) {
          http.pathname = http.pathname.substr(item.length + 1);
          return item;
        }
      }
    }
    var controller = pos === -1 ? pathname : pathname.substr(0, pos);
    http.pathname = http.pathname.substr(controller.length + 1);
    return controller;
  };
  /**
   * parse pathname
   * @return {} []
   */


  _class.prototype.parsePathname = function parsePathname() {
    var http = this.http;
    if (!http.pathname) {
      this.http.module = this.getModule();
      this.http.controller = this.getController();
      this.http.action = this.getAction();
      return;
    }
    var module = this.parseModule();
    var controller = this.parseController(module);
    var paths = http.pathname.split('/');
    var action = paths.shift();

    this.parseExtPath(paths);

    this.http.module = module; //module not need check
    this.http.controller = this.getController(controller);
    this.http.action = this.getAction(action);

    if (!this.http.controller) {
      this.http.error = new Error(think.locale('CONTROLLER_INVALID', controller, this.http.url));
      return think.statusAction(400, http);
    }
    if (!this.http.action) {
      this.http.error = new Error(think.locale('ACTION_INVALID', action, this.http.url));
      return think.statusAction(400, http);
    }
  };
  /**
   * parse extra path
   * @param  {Array} paths [extra path]
   * @return {}       []
   */


  _class.prototype.parseExtPath = function parseExtPath(paths) {
    if (paths.length === 0) {
      return;
    }
    if (!think.isArray(paths)) {
      if (paths[0] === '/') {
        paths = paths.slice(1);
      }
      paths = paths.split('/');
    }
    for (var i = 0, name, length = Math.ceil(paths.length) / 2; i < length; i++) {
      name = paths[i * 2];
      if (name) {
        this.http._get[name] = decodeURIComponent(paths[i * 2 + 1] || '');
      }
    }
  };
  /**
   * check url is match
   * @param  {String} rule [url rule]
   * @return {Boolean}      []
   */


  _class.prototype.checkUrlMatch = function checkUrlMatch(rule) {
    var pathname = this.http.pathname.split('/');
    rule = rule.split('/');
    var i = 0,
        length = rule.length,
        plength = pathname.length,
        item = void 0,
        pitem = void 0;
    //if rule lenth is more than pathname, it will be false
    if (length > plength) {
      return false;
    }
    var match = {};
    for (; i < length; i++) {
      item = rule[i];
      pitem = pathname[i];
      if (item.indexOf(':') === 0) {
        match[item.slice(1)] = pitem;
      } else {
        if (pitem.toLowerCase() !== item.toLowerCase()) {
          return false;
        }
      }
    }
    //append match data to this.http._get
    for (var key in match) {
      this.http._get[key] = match[key];
    }
    if (plength > length) {
      this.parseExtPath(pathname.slice(length));
    }
    return true;
  };
  /**
   * get route
   * @param  {Object} route   []
   * @param  {Array} matches []
   * @return {[type]}         []
   */


  _class.prototype.getRoute = function getRoute(route) {
    if (think.isString(route)) {
      return route;
    }
    for (var method in route) {
      if (method.toUpperCase().indexOf(this.http.method) > -1) {
        return route[method];
      }
    }
    return '';
  };
  /**
   * parse route string
   * @param  {String} route []
   * @return {}       []
   */


  _class.prototype.parseRoute = function parseRoute(route) {
    if (route.indexOf('?') > -1) {
      var urlInfo = _url2.default.parse(route, true);
      var query = urlInfo.query;
      for (var key in query) {
        if (query[key] || !(key in this.http._get)) {
          this.http._get[key] = query[key];
        }
      }
      route = urlInfo.pathname;
    }
    if (route[0] === '/') {
      route = route.slice(1);
    }
    this.http.pathname = route;
    return this.parsePathname();
  };
  /**
   * parse regexp rule
   * @param  {Array} matches  [route matches]
   * @param  {String | Object} route    [route]
   * @return {Boolean}          []
   */


  _class.prototype.parseRegExpRule = function parseRegExpRule(matches, route) {
    //replace :1, :2 in route
    //such as: group/detail?date=:1&groupId=:2&page=:3
    route = route.replace(/:(\d+)/g, function (a, b) {
      return matches[b] || '';
    });
    var pathname = this.http.pathname.slice(matches[0].length);
    this.parseExtPath(pathname);
    this.parseRoute(route);
  };
  /**
   * check value is lowerCase
   * @param  {String} value []
   * @return {}       []
   */


  _class.prototype.checkLowerCase = function checkLowerCase(value) {
    // if value has - chars, not check, for REST API
    if (value.indexOf('-') > -1) {
      return;
    }
    var lower = value.toLowerCase();
    if (value !== lower) {
      think.log(function (colors) {
        return colors.yellow('[WARNING]') + ' ' + think.locale('URL_HAS_UPPERCASE', value);
      });
    }
  };
  /**
   * get module name
   * @param  {String} module []
   * @return {String}        []
   */


  _class.prototype.getModule = function getModule(module) {
    if (!module || think.mode === think.mode_normal) {
      return think.config('default_module');
    }
    this.checkLowerCase(module);
    return module.toLowerCase();
  };
  /**
   * get controller name
   * @param  {String} controller []
   * @return {String}            []
   */


  _class.prototype.getController = function getController(controller) {
    if (!controller) {
      return think.config('default_controller');
    }
    //has / in controller
    if (/^[\w\/]+$/.test(controller)) {
      this.checkLowerCase(controller);
      return controller.toLowerCase();
    }
    return '';
  };
  /**
   * get action
   * @param  {String} action [action name]
   * @return {String}        []
   */


  _class.prototype.getAction = function getAction(action) {
    if (!action) {
      return think.config('default_action');
    }
    // action name support `-` char, for REST API
    // /api/system/3b6c279c-bd61-f093-c543-56f9ab4300b7
    if (/^[\w\-]+$/.test(action)) {
      this.checkLowerCase(action);
      return action.toLowerCase();
    }
    return '';
  };

  return _class;
}(think.middleware.base);

exports.default = _class;