'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * base controller class
 * all controllers will inherits this class
 */
var _class = function (_think$http$base) {
  (0, _inherits3.default)(_class, _think$http$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$http$base.apply(this, arguments));
  }

  /**
   * init
   * @return {void} []
   */
  _class.prototype.init = function init(http) {
    this.http = http;
    this._baseAssigned = false;
  };
  /**
   * get client ip
   * @return {String} []
   */


  _class.prototype.ip = function ip() {
    return this.http.ip();
  };
  /**
   * init view instance
   * @return {Object} []
   */


  _class.prototype.view = function view() {
    return this.http.view();
  };
  /**
   * get http method
   * @return {String} []
   */


  _class.prototype.method = function method() {
    return this.http.method.toLowerCase();
  };
  /**
   * check http method
   * @param  {String}  method [http method]
   * @return {Boolean}        []
   */


  _class.prototype.isMethod = function isMethod(method) {
    return this.http.method === method.toUpperCase();
  };
  /**
   * check http method is get
   * @return {Boolean} []
   */


  _class.prototype.isGet = function isGet() {
    return this.http.isGet();
  };
  /**
   * check http method is post
   * @return {Boolean} []
   */


  _class.prototype.isPost = function isPost() {
    return this.http.isPost();
  };
  /**
   * check is ajax request
   * @param  {String}  method [http method]
   * @return {Boolean}        []
   */


  _class.prototype.isAjax = function isAjax(method) {
    return this.http.isAjax(method);
  };
  /**
   * check is websocket request
   * @return {Boolean} []
   */


  _class.prototype.isWebSocket = function isWebSocket() {
    return !!this.http.socket;
  };
  /**
   * check is command line invoke
   * @return {Boolean} []
   */


  _class.prototype.isCli = function isCli() {
    return this.http.isCli();
  };
  /**
   * check is jsonp
   * @param  {String}  name [callback name]
   * @return {Boolean}      []
   */


  _class.prototype.isJsonp = function isJsonp(name) {
    return this.http.isJsonp(name);
  };
  /**
   * get get params
   * @param  {String} name [query name]
   * @return {String}      []
   */


  _class.prototype.get = function get(name, value) {
    return this.http.get(name, value);
  };
  /**
   * get post params
   * @param  {String} name [query name]
   * @return {String}      []
   */


  _class.prototype.post = function post(name, value) {
    return this.http.post(name, value);
  };
  /**
   * get post or get params
   * @param  {String} name []
   * @return {String}      []
   */


  _class.prototype.param = function param(name) {
    return this.http.param(name);
  };
  /**
   * get upload files
   * @param  {String} name []
   * @return {Object}      []
   */


  _class.prototype.file = function file(name, value) {
    return this.http.file(name, value);
  };
  /**
   * get or set header
   * @param  {String} name  [header name]
   * @param  {String} value [header value]
   * @return {}       []
   */


  _class.prototype.header = function header(name, value) {
    return this.http.header(name, value);
  };
  /**
   * get user agent
   * @return {String} []
   */


  _class.prototype.userAgent = function userAgent() {
    return this.http.userAgent();
  };
  /**
   * get page referer
   * @param  {String} host [only get referer host]
   * @return {String}      []
   */


  _class.prototype.referrer = function referrer(onlyHost) {
    return this.http.referrer(onlyHost);
  };
  /**
   * get page referer
   * @param  {String} host [only get referer host]
   * @return {String}      []
   */


  _class.prototype.referer = function referer(onlyHost) {
    return this.http.referrer(onlyHost);
  };
  /**
   * get or set cookie
   * @param  {String} name    [cookie name]
   * @param  {String} value   [cookie value]
   * @param  {Object} options [cookie options]
   * @return {}         []
   */


  _class.prototype.cookie = function cookie(name, value, options) {
    return this.http.cookie(name, value, options);
  };
  /**
   * get or set session
   * @param  {String} name  [session name]
   * @param  {mixed} value [session value]
   * @return {Promise}       []
   */


  _class.prototype.session = function session(name, value) {
    return this.http.session(name, value);
  };
  /**
   * get language
   * @param  {Boolean} useCookie [get from cookie set]
   * @return {String}           []
   */


  _class.prototype.lang = function lang(_lang, asViewPath) {
    return this.http.lang(_lang, asViewPath);
  };
  /**
   * get locale value
   * @param  {String} key []
   * @return {String}     []
   */


  _class.prototype.locale = function locale(key) {
    var _http;

    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    return (_http = this.http).locale.apply(_http, [key].concat(data));
  };
  /**
   * redirect
   * @param  {String} url  [redirect url]
   * @param  {Number} code [301 or 302]
   * @return {promise}      [pedding promise]
   */


  _class.prototype.redirect = function redirect(url, code) {
    this.http.redirect(url, code);
    return think.prevent();
  };
  /**
   * assign value to template
   * @param  {String} name  [template name]
   * @param  {mixed} value []
   * @return {}       []
   */


  _class.prototype.assign = function assign(name, value) {
    this._baseAssign();
    return this.view().assign(name, value);
  };
  /**
   * base assign
   * @return {} []
   */


  _class.prototype._baseAssign = function _baseAssign() {
    if (this._baseAssigned) {
      return;
    }
    this._baseAssigned = true;
    this.view().assign({
      controller: this,
      http: this.http,
      config: this.http._config,
      _: this.locale.bind(this)
    });
  };
  /**
   * fetch template content
   * @param  {String} templateFile [template filepath]
   * @return {promise}              []
   */


  _class.prototype.fetch = function fetch(templateFile, data, config) {
    this._baseAssign();
    return this.view().fetch(templateFile, data, config);
  };
  /**
   * display template
   * @param  {String} templateFile [template filepath]
   * @param  {String} charset      [content encoding]
   * @param  {String} contentType  [content type]
   * @return {Promise}              []
   */


  _class.prototype.display = function display(templateFile, charset, contentType) {
    this._baseAssign();
    return this.view().display(templateFile, charset, contentType);
  };
  /**
   * alias of display
   * @param  {String} templateFile [template filepath]
   * @param  {String} charset      [content encoding]
   * @param  {String} contentType  [content type]
   * @return {Promise}              []
   */


  _class.prototype.render = function render(templateFile, charset, contentType) {
    return this.display(templateFile, charset, contentType);
  };
  /**
   * output with jsonp
   * @param  {Object} data [output data]
   * @return {}      []
   */


  _class.prototype.jsonp = function jsonp(data) {
    this.http.jsonp(data);
    return think.prevent();
  };
  /**
   * output with json
   * @param  {Object} data [output data]
   * @return {Promise}      []
   */


  _class.prototype.json = function json(data) {
    this.http.json(data);
    return think.prevent();
  };
  /**
   * set http status code
   * @param  {Number} status [status code]
   * @return {}        []
   */


  _class.prototype.status = function status() {
    var _status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 404;

    this.http.status(_status);
    return this;
  };
  /**
   * deny request
   * @param  {Number} status [status code]
   * @return {[type]}        []
   */


  _class.prototype.deny = function deny() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 403;

    this.status(status);
    this.http.end();
    return think.prevent();
  };
  /**
   * set cache-control and expires header
   * @param  {Number} time []
   * @return {}      []
   */


  _class.prototype.expires = function expires(time) {
    this.http.expires(time);
    return this;
  };
  /**
   * write content
   * @param  {mixed} obj      []
   * @param  {String} encoding [content encoding]
   * @return {}          []
   */


  _class.prototype.write = function write(obj, encoding) {
    return this.http.write(obj, encoding);
  };
  /**
   * end output
   * @param  {Object} obj      []
   * @param  {String} encoding [content encoding]
   * @return {}          []
   */


  _class.prototype.end = function end(obj, encoding) {
    this.http.end(obj, encoding);
    return think.prevent();
  };
  /**
   * send content
   * @param  {Mixed} obj      []
   * @param  {String} encoding []
   * @return {Promise}          []
   */


  _class.prototype.send = function send(obj, encoding) {
    return this.end(obj, encoding);
  };
  /**
   * get or set content type
   * @param  {String} ext [content type]
   * @return {}     []
   */


  _class.prototype.type = function type(ext, encoding) {
    return this.http.type(ext, encoding);
  };
  /**
   * download file
   * @param  {String} file        [filepath]
   * @param  {String} contentType [content type]
   * @param  {String} filename    [download filename]
   * @return {Promise}             []
   */


  _class.prototype.download = function download(filepath, contentType, filename) {
    if (think.isString(contentType) && contentType.indexOf('.') > -1) {
      filename = contentType;
      contentType = '';
    }
    if (!contentType || contentType.indexOf('/') === -1) {
      contentType = require('mime').lookup(contentType || filepath);
    }
    this.type(contentType, false);

    this.header('Content-Disposition', 'attachment; filename="' + (filename || _path2.default.basename(filepath)) + '"');
    return think.middleware('output_resource', this.http, filepath);
  };
  /**
   * output with success errno & errmsg
   * @param  {Object} data    [output data]
   * @param  {String} message [errmsg]
   * @return {Promise}         [pedding promise]
   */


  _class.prototype.success = function success(data, message) {
    this.http.success(data, message);
    return think.prevent();
  };
  /**
   * output with fail errno & errmsg
   * @param  {Number} errno  [error number]
   * @param  {String} errmsg [error message]
   * @param  {Object} data   [output data]
   * @return {Promise}        [pedding promise]
   */


  _class.prototype.fail = function fail(errno, errmsg, data) {
    this.http.fail(errno, errmsg, data);
    return think.prevent();
  };
  /**
   * alias for fail
   * @param  {} args []
   * @return {Promise}         []
   */


  _class.prototype.error = function error() {
    return this.fail.apply(this, arguments);
  };
  /**
   * send exec time
   * @param  {String} name [header name]
   * @return {}      []
   */


  _class.prototype.sendTime = function sendTime(name) {
    return this.http.sendTime(name);
  };
  /**
   * emit socket data
   * @param  {String} event []
   * @param  {Miex} data  []
   * @return {}       []
   */


  _class.prototype.emit = function emit(event, data) {
    if (!this.http.socket) {
      throw new Error('emit method can only used in websocket request');
    }
    return this.http.socketEmit(event, data);
  };
  /**
   * broadcast socket data
   * @param  {String} event       []
   * @param  {Mixed} data        []
   * @param  {Boolean} containSelf []
   * @return {}             []
   */


  _class.prototype.broadcast = function broadcast(event, data, containSelf) {
    if (!this.http.socket) {
      throw new Error('broadcast method can only used in websocket request');
    }
    return this.http.socketBroadcast(event, data, containSelf);
  };

  return _class;
}(think.http.base);

exports.default = _class;