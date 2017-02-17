'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _subdomain2 = require('./subdomain.js');

var _subdomain3 = _interopRequireDefault(_subdomain2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * subdomain deploy
 * @type {}
 */
var _class = function (_subdomain) {
  (0, _inherits3.default)(_class, _subdomain);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _subdomain.apply(this, arguments));
  }

  /**
   * run
   * @return {Promise} []
   */
  _class.prototype.run = function run() {
    think.log('`subdomain_deploy` middleware is deprecated, use `subdomain` instead', 'WARNING');
    return _subdomain.prototype.run.call(this);
  };

  return _class;
}(_subdomain3.default);

exports.default = _class;