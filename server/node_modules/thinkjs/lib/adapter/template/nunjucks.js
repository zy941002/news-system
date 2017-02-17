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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * nunjucks template
 * @type {Class}
 */
var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * run
   * @param  {String} templateFile []
   * @param  {Object} tVar         []
   * @return {Promise}             []
   */
  _class.prototype.run = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(templateFile, tVar, config) {
      var options, nunjucks, env, fn;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = this.parseConfig({
                autoescape: true,
                watch: false,
                noCache: false,
                throwOnUndefined: false
              }, config);
              _context.next = 3;
              return think.npm('nunjucks');

            case 3:
              nunjucks = _context.sent;
              env = void 0;

              if (options.root_path) {
                //if templateFile not start with root_path, can not set root_path
                if (_path2.default.isAbsolute(templateFile) && templateFile.indexOf(options.root_path) !== 0) {
                  env = nunjucks.configure(options);
                } else {
                  env = nunjucks.configure(options.root_path, options);
                }
              } else {
                env = nunjucks.configure(options);
              }

              env.addGlobal('think', think);
              env.addGlobal('JSON', JSON);
              env.addGlobal('eval', eval);

              this.prerender(options, nunjucks, env);

              fn = think.promisify(nunjucks.render);
              return _context.abrupt('return', fn(templateFile, tVar));

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function run(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(_base2.default);

exports.default = _class;