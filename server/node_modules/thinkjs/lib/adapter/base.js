'use strict';

/**
 * think.adapter.base class
 * all adapter will be inherit this class
 */

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$base) {
  (0, _inherits3.default)(_class, _think$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$base.apply(this, arguments));
  }

  /**
   * parse config when config has parser function
   * @param  {Object} config []
   * @param  {Object} extra  []
   * @param  {String} type   []
   * @return {Object}        []
   */
  _class.prototype.parseConfig = function parseConfig() {
    var _think;

    return (_think = think).parseConfig.apply(_think, arguments);
  };

  return _class;
}(think.base);

exports.default = _class;