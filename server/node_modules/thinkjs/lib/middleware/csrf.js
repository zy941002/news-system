'use strict';
/**
 * check csrf
 * @type {}
 */

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  _class.prototype.run = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var csrf, session, isGet, isPost, isAjax, isJsonp, value, _value, formValue;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              csrf = this.config('csrf');

              think.session(this.http);
              session = this.http._session;
              isGet = this.http.isGet();
              isPost = this.http.isPost();
              isAjax = this.http.isAjax();
              isJsonp = this.http.isJsonp();

              if (!(isGet && !isAjax && !isJsonp)) {
                _context.next = 18;
                break;
              }

              _context.next = 10;
              return session.get(csrf.session_name);

            case 10:
              value = _context.sent;

              if (value) {
                _context.next = 15;
                break;
              }

              value = think.uuid(32);
              _context.next = 15;
              return session.set(csrf.session_name, value);

            case 15:
              this.http.view().assign(csrf.form_name, value);
              _context.next = 26;
              break;

            case 18:
              if (!(isPost || isAjax || isJsonp)) {
                _context.next = 26;
                break;
              }

              _context.next = 21;
              return session.get(csrf.session_name);

            case 21:
              _value = _context.sent;
              formValue = this.http[isPost ? 'post' : 'param'](csrf.form_name);

              if (!formValue) {
                formValue = this.http.header('x-' + csrf.form_name);
              }

              if (!(!_value || formValue !== _value)) {
                _context.next = 26;
                break;
              }

              return _context.abrupt('return', this.http.fail(csrf.errno, csrf.errmsg));

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function run() {
      return _ref.apply(this, arguments);
    }

    return run;
  }();

  return _class;
}(think.middleware.base);

exports.default = _class;