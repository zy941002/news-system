'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
 * view class
 * @return {} []
 */
var _class = function (_think$http$base) {
  (0, _inherits3.default)(_class, _think$http$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$http$base.apply(this, arguments));
  }

  /**
   * init method
   * @param  {Object} http []
   * @return {}      []
   */
  _class.prototype.init = function init(http) {
    _think$http$base.prototype.init.call(this, http);
    this.tVar = {};
  };
  /**
   * assign
   * @param  {String} name  []
   * @param  {mixed} value []
   * @return {}       []
   */


  _class.prototype.assign = function assign(name, value) {
    if (name === undefined) {
      return this.tVar;
    } else if (value === undefined) {
      if (think.isString(name)) {
        return this.tVar[name];
      } else {
        for (var key in name) {
          this.tVar[key] = name[key];
        }
      }
    } else {
      this.tVar[name] = value;
    }
  };
  /**
   * output template file
   * @param  {String} templateFile [template filepath]
   * @param  {String} charset      [content encoding]
   * @param  {String} contentType  [content type]
   * @return {Promise}              []
   */


  _class.prototype.display = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(templateFile, charset, contentType, config) {
      var content;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (think.isObject(charset)) {
                config = charset;
                charset = '';
              } else if (think.isObject(contentType)) {
                config = contentType;
                contentType = '';
              }
              _context.prev = 1;
              _context.next = 4;
              return this.hook('view_before');

            case 4:
              _context.next = 6;
              return this.fetch(templateFile, undefined, config);

            case 6:
              content = _context.sent;
              _context.next = 9;
              return this.render(content, charset, contentType);

            case 9:
              _context.next = 11;
              return this.hook('view_after', content);

            case 11:
              _context.next = 18;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](1);

              this.http.error = _context.t0;
              _context.next = 18;
              return think.statusAction(500, this.http, true);

            case 18:
              return _context.abrupt('return', think.prevent());

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 13]]);
    }));

    function display(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    }

    return display;
  }();
  /**
   * render template content
   * @param  {String} content     [template content]
   * @param  {String} charset     [charset]
   * @param  {String} contentType [contentType]
   * @return {}             []
   */


  _class.prototype.render = function render() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var charset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.http.config('encoding');
    var contentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.http.config('view.content_type');

    this.http.type(contentType, charset);
    return this.http.end(content, charset);
  };
  /**
   * check template filepath exist
   * @param  {String} templateFile [template filepath]
   * @param  {Boolean} inView       []
   * @return {Promise}              []
   */


  _class.prototype.checkTemplateExist = function checkTemplateExist(templateFile) {
    var cacheData = thinkData.template;
    if (templateFile in cacheData) {
      return true;
    }
    if (think.isFile(templateFile)) {
      //add template file to cache
      cacheData[templateFile] = true;
      return true;
    }
    return false;
  };
  /**
   * fetch template file content
   * @param  {String} templateFile [template file]
   * @return {Promise}             []
   */


  _class.prototype.fetch = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(templateFile, data, config) {
      var tVar, err, promises, data4ViewParse, content;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tVar = data && think.isObject(data) ? data : this.tVar;

              config = think.extend({
                templateFile: templateFile
              }, this.config('view'), config);

              if (!(!templateFile || !_path2.default.isAbsolute(templateFile))) {
                _context2.next = 6;
                break;
              }

              _context2.next = 5;
              return this.hook('view_template', config);

            case 5:
              templateFile = _context2.sent;

            case 6:
              if (this.checkTemplateExist(templateFile)) {
                _context2.next = 9;
                break;
              }

              err = new Error(think.locale('TEMPLATE_NOT_EXIST', templateFile));
              return _context2.abrupt('return', think.reject(err));

            case 9:
              promises = (0, _keys2.default)(tVar).map(function (key) {
                if (!think.isPromise(tVar[key])) {
                  return;
                }
                return tVar[key].then(function (data) {
                  tVar[key] = data;
                });
              });
              _context2.next = 12;
              return _promise2.default.all(promises);

            case 12:
              data4ViewParse = {
                'var': tVar,
                'file': templateFile,
                'config': config
              };
              _context2.next = 15;
              return this.hook('view_parse', data4ViewParse);

            case 15:
              content = _context2.sent;

              if (data4ViewParse === content) {
                content = '';
              }

              return _context2.abrupt('return', this.hook('view_filter', content));

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function fetch(_x8, _x9, _x10) {
      return _ref2.apply(this, arguments);
    }

    return fetch;
  }();

  return _class;
}(think.http.base);

exports.default = _class;