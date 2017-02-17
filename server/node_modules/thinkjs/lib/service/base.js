'use strict';
/**
 * base service
 * @type {Class}
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
   * get model instance
   * @return {} []
   */
  _class.prototype.model = function model(name, options, module) {
    if (think.isString(options) && think.module.indexOf(options) > -1) {
      module = options;
      options = {};
    }
    module = module || this.parseModuleFromPath();
    if (think.isString(options)) {
      options = { type: options };
    }
    options = think.extend({}, think.config('db', undefined, module), options);
    return think.model(name, options, module);
  };
  /**
   * get service
   * @return {} []
   */


  _class.prototype.service = function service(name, module) {
    module = module || this.parseModuleFromPath();
    return think.service(name, module);
  };

  return _class;
}(think.base);

exports.default = _class;