'use strict';

/**
 * base logic
 * inherits from base controller
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

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * get validate method
   * @return {} []
   */
  _class.prototype._getValidateItemMethod = function _getValidateItemMethod(itemData) {
    var list = ['get', 'post', 'file'];
    for (var i = 0, length = list.length; i < length; i++) {
      var item = list[i];
      if (itemData[list[i]]) {
        delete itemData[item];
        return item;
      }
    }
    //for rest request
    var method = this._isRest && this._method;
    if (method) {
      method = this.get(method);
    }
    if (!method) {
      method = this.http.method.toLowerCase();
    }
    if (method === 'put' || method === 'patch') {
      return 'post';
    }
    if (list.indexOf(method) > -1) {
      return method;
    }
    return 'post';
  };
  /**
   * parse validate data
   * {
   *   name: 'required|int|min:10|max:20',
   *   title: 'length:10,20|default:welefen|get',
   *   emai: 'required|email:{}',
   *   ids: 'required|array|int'
   * }
   * @param  {Array}  data []
   * @return {Array}      []
   */


  _class.prototype._parseValidateData = function _parseValidateData() {
    var _this2 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    var allowTypes = ['boolean', 'int', 'float', 'string', 'array', 'object'];

    var _loop = function _loop(name) {

      var itemData = data[name];
      if (think.isString(itemData)) {
        itemData = think.validate.parse(itemData);
      } else {
        itemData = think.extend({}, itemData);
      }

      var method = _this2._getValidateItemMethod(itemData);
      if (method === 'file') {
        itemData.object = true;
      }
      itemData._method = method;
      //ignore set itemData.value when aleady has it
      if (!('value' in itemData)) {
        itemData.value = _this2[method](name);
      }

      var flag = allowTypes.some(function (item) {
        return item in itemData;
      });
      if (!flag) {
        itemData.string = true;
      }

      result[name] = itemData;
    };

    for (var name in data) {
      _loop(name);
    }
    return result;
  };
  /**
   * merge clean rules(only value)
   * @param  {Object} rules []
   * @return {Object}       []
   */


  _class.prototype._mergeCleanRules = function _mergeCleanRules(rules) {
    var listData = [this.post(), this.get()];
    var methods = ['post', 'get'];
    listData.forEach(function (item, index) {
      for (var key in item) {
        if (!rules[key]) {
          rules[key] = {
            value: item[key],
            _method: methods[index]
          };
        }
      }
    });
    return rules;
  };
  /**
   * validate data
   * this.validate({
   *   welefen: 'required|length:4,20|alpha',
   *   email: 'required|email',
   *   title: 'required|maxLength:10000'
   * })
   * @param  {Object} data      []
   * @return {}           []
   */


  _class.prototype.validate = function validate(rules) {
    this._validateInvoked = true;
    if (think.isEmpty(rules)) {
      return true;
    }
    rules = this._parseValidateData(rules);
    rules = this._mergeCleanRules(rules);

    var methods = {};
    for (var name in rules) {
      methods[name] = rules[name]._method;
      delete rules[name]._method;
    }

    var ret = think.validate(rules, this.locale());
    if (!think.isEmpty(ret)) {
      this.assign('errors', ret);
      return false;
    }

    //set values
    var values = think.validate.values(rules);
    for (var _name in values) {
      var _method = methods[_name];
      var value = values[_name];
      if (value !== '' && (typeof value !== 'number' || !isNaN(value))) {
        this[_method](_name, value);
      }
    }

    return true;
  };
  /**
   * get validate errors
   * @return {Object} []
   */


  _class.prototype.errors = function errors() {
    return this.assign('errors');
  };
  /**
   * auto validate
   * @return {} []
   */


  _class.prototype.__after = function __after() {
    var error = this.config('error');

    //check request method
    var allowMethods = this.allowMethods;
    if (!think.isEmpty(allowMethods)) {
      if (think.isString(allowMethods)) {
        allowMethods = allowMethods.split(',');
      }
      var _method2 = this.http.method.toLowerCase();
      if (allowMethods.indexOf(_method2) === -1) {
        return this.fail(error.validate_errno, this.locale('METHOD_NOT_ALLOWED'));
      }
    }

    //check rules
    if (think.isEmpty(this.rules) || this._validateInvoked) {
      return;
    }
    var flag = this.validate(this.rules);
    if (!flag) {
      return this.fail(error.validate_errno, this.errors());
    }
  };

  return _class;
}(think.controller.base);

exports.default = _class;