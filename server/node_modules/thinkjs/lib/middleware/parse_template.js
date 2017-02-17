'use strict';

/**
 * parse template content
 * @param  {Object} 
 * @return {Promise}         []
 */

exports.__esModule = true;

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
   * @param  {Object} data [render template data]
   * @return {Promise}      []
   */
  _class.prototype.run = function run(data) {
    var file = data.file;
    this.http.tpl_file = file;
    var config = data.config || {};
    var engine = config.type || this.config('view.type') || 'base';
    var Cls = think.adapter('template', engine);
    var instance = new Cls();
    return instance.run(file, data.var, config);
  };

  return _class;
}(think.middleware.base);

exports.default = _class;