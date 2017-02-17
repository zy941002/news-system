'use strict';
/**
 * rest controller
 * @type {Class}
 * @author inkzhou@gmail.com
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

var _rest = require('../../common/rest/rest.js');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Rest) {
  (0, _inherits3.default)(_class, _Rest);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Rest.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  _class.prototype.init = function init(http) {
    _Rest.prototype.init.call(this, http);
  };
  /**
   * before magic method
   * @return {Promise} []
   */


  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var name, password, user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.isPost()) {
                _context.next = 11;
                break;
              }

              name = this.post('name');
              password = this.post('password');

              if (!think.isEmpty(password)) {
                _context.next = 6;
                break;
              }

              console.log("password" + password + name);
              return _context.abrupt('return', this.fail(-1, '\u5BC6\u7801\u4E0D\u5141\u8BB8\u4E3A\u7A7A'));

            case 6:
              _context.next = 8;
              return this.model('admin').where({ name: name }).select();

            case 8:
              user = _context.sent;

              if (think.isEmpty(user)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', this.fail(-2, "用户名被已被抢占,重新注册一个吧"));

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __before() {
      return _ref.apply(this, arguments);
    }

    return __before;
  }();

  return _class;
}(_rest2.default);

exports.default = _class;
//# sourceMappingURL=admin.js.map