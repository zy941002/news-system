'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base Class
 * @param  {Object} http
 * @return {Class}
 */
var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  _class.prototype.init = function init() {
    var http = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.http = http;
  };
  /**
   * get or set config
   * @param  {string} name  [config name]
   * @param  {mixed} value [config value]
   * @return {mixed}       []
   */


  _class.prototype.config = function config(name, value) {
    var module = this.parseModuleFromPath();
    if (module) {
      return think.config(name, value, module);
    }
    return think.config(name, value, this.http._config);
  };
  /**
   * change module/controller/action when invoked action
   * @param  {Object} controller []
   * @param  {String} action     []
   * @return {Promise}            []
   */


  _class.prototype._transMCAAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(controller, action) {
      var http, source, err, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //change module/controller/action when invoke another action
              //make this.display() correct when invoked without any paramters
              http = this.http;
              source = {
                module: http.module,
                controller: http.controller,
                action: http.action
              };
              //parse module from pathname

              http.module = think.config('default_module');
              if (think.mode === think.mode_module) {
                http.module = controller.__filename.split(think.sep).reverse()[2];
              }

              http.controller = this.basename(controller.__filename);
              http.action = action;
              if (action !== '__call') {
                action = think.camelCase(action) + 'Action';
              }
              err = void 0;
              _context.next = 10;
              return controller.invoke(action, controller).catch(function (e) {
                err = e;
              });

            case 10:
              result = _context.sent;

              think.extend(http, source);
              return _context.abrupt('return', err ? _promise2.default.reject(err) : result);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function _transMCAAction(_x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return _transMCAAction;
  }();
  /**
   * invoke action
   * @param  {Object} controller [controller instance]
   * @param  {String} action     [action name]
   * @param  {Mixed} data       [action params]
   * @return {}            []
   */


  _class.prototype.action = function action(controller, _action) {
    var transMCA = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (think.isString(controller)) {
      controller = this.controller(controller);
    }
    if (!transMCA) {
      if (_action !== '__call') {
        _action = think.camelCase(_action) + 'Action';
      }
      return controller.invoke(_action, controller);
    }
    return this._transMCAAction(controller, _action);
  };
  /**
   * get or set cache
   * @param  {String} name    [cache name]
   * @param  {mixed} value   [cache value]
   * @param  {Object} options [cache options]
   * @return {}         []
   */


  _class.prototype.cache = function cache(name, value, options) {
    if (think.isString(options)) {
      options = { type: options };
    }
    options = think.extend({}, this.config('cache'), options);
    return think.cache(name, value, options);
  };
  /**
   * invoke hook
   * @param  {String} event [event name]
   * @return {Promise}       []
   */


  _class.prototype.hook = function hook(event, data) {
    return think.hook.exec(event, this.http, data);
  };
  /**
   * get module
   * @param  {String} module []
   * @return {String}        []
   */


  _class.prototype._getModule = function _getModule(module) {
    if (module) {
      if (!think.isString(module)) {
        throw new Error('module argument must be string');
      }
      if (think.module.indexOf(module) === -1) {
        throw new Error('module `' + module + '` not exist');
      }
    } else {
      module = this.parseModuleFromPath() || this.http.module;
    }
    return module;
  };
  /**
   * get model
   * @param  {String} name    [model name]
   * @param  {Object} options [model options]
   * @return {Object}         [model instance]
   */


  _class.prototype.model = function model() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'base';
    var options = arguments[1];
    var module = arguments[2];

    if (think.isString(options)) {
      options = { type: options };
    }
    module = this._getModule(module);
    options = think.extend({}, think.config('db', undefined, module), options);
    return think.model(name, options, module);
  };
  /**
   * get controller
   * this.controller('home/controller/test')
   * @param  {String} name [controller name]
   * @return {Object}      []
   */


  _class.prototype.controller = function controller(name, module) {
    module = this._getModule(module);
    var Cls = think.lookClass(name, 'controller', module);
    return new Cls(this.http);
  };
  /**
   * get service
   * @param  {String} name [service name]
   * @return {Object}      []
   */


  _class.prototype.service = function service(name, module) {
    module = this._getModule(module);
    return think.service(name, this.http, module);
  };

  return _class;
}(_base2.default);

exports.default = _class;