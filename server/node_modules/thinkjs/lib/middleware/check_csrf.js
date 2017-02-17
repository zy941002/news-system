'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _csrf = require('./csrf.js');

var _csrf2 = _interopRequireDefault(_csrf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * check csrf
 * @type {}
 */
var _class = function (_CSRF) {
  (0, _inherits3.default)(_class, _CSRF);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _CSRF.apply(this, arguments));
  }

  /**
   * run
   * @return {Promise} []
   */
  _class.prototype.run = function run() {
    think.log('`check_csrf` middleware is deprecated, use `csrf` instead', 'WARNING');
    return _CSRF.prototype.run.call(this);
  };

  return _class;
}(_csrf2.default);

exports.default = _class;