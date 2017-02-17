'use strict';
/**
 * rest controller
 * @type {Class}
 */

exports.__esModule = true;

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


  return _class;
}(_rest2.default);

exports.default = _class;
//# sourceMappingURL=category.js.map