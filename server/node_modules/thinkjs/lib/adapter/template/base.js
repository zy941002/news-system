'use strict';

exports.__esModule = true;

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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * template base class
 * @type {Class}
 */
var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * merge config
   * @param  {Object} defaultConf []
   * @param  {Object} extraConf   []
   * @return {}             []
   */
  _class.prototype.parseConfig = function parseConfig(defaultConf, extraConf) {
    var config = think.parseConfig(think.extend({}, defaultConf, think.config('view'), extraConf));
    //compatibility with view.options
    if (!think.isEmpty(config.options)) {
      think.log('view.options is deprecated, use view.adapter.' + config.type + ' instead', 'WARNING');
      config = think.extend(config, config.options);
    }
    return config;
  };
  /**
   * pre render
   * @param  {Object}    config []
   * @param  {...[type]} args   []
   * @return {}           []
   */


  _class.prototype.prerender = function prerender() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (think.isFunction(config.prerender)) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      config.prerender.apply(config, args);
    }
  };
  /**
   * get template file content
   * @return {} []
   */


  _class.prototype.getContent = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file) {
      var stat, mTime, fileCache;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return think.promisify(_fs2.default.stat, _fs2.default)(file);

            case 2:
              stat = _context.sent;
              mTime = stat.mtime.getTime();
              fileCache = thinkCache(thinkCache.VIEW_CONTENT, file);

              if (!(fileCache && fileCache[0] >= mTime)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', fileCache[1]);

            case 7:
              return _context.abrupt('return', think.await('template_' + file, function () {
                var fn = think.promisify(_fs2.default.readFile, _fs2.default);
                return fn(file, 'utf8');
              }).then(function (content) {
                //if content is empty, not cached
                if (!content) {
                  return content;
                }
                thinkCache(thinkCache.VIEW_CONTENT, file, [mTime, content]);
                return content;
              }));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getContent(_x2) {
      return _ref.apply(this, arguments);
    }

    return getContent;
  }();
  /**
   * run
   * @param  {String} templateFile []
   * @param  {Object} tVar         []
   * @return {promise}             []
   */


  _class.prototype.run = function run(templateFile) {
    return this.getContent(templateFile);
  };

  return _class;
}(think.adapter.base);

exports.default = _class;