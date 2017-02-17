'use strict';
/**
 * waiting class
 * @type {}
 */

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
  /**
   * constructor
   * @param  {} args []
   * @return {}         []
   */
  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    this.init();
  }
  /**
   * init
   * @return {} []
   */


  _class.prototype.init = function init() {
    this.queue = {};
  };
  /**
   * run
   * @param  {String}   key []
   * @param  {Function} fn  []
   * @return {Promise}       []
   */


  _class.prototype.run = function run(key, fn) {
    var _this = this;

    if (!(key in this.queue)) {
      this.queue[key] = [];
      return _promise2.default.resolve(fn()).then(function (data) {
        process.nextTick(function () {
          _this.queue[key].forEach(function (deferred) {
            return deferred.resolve(data);
          });
          delete _this.queue[key];
        });
        return data;
      }).catch(function (err) {
        process.nextTick(function () {
          _this.queue[key].forEach(function (deferred) {
            return deferred.reject(err);
          });
          delete _this.queue[key];
        });
        return think.reject(err);
      });
    } else {
      var deferred = think.defer();
      this.queue[key].push(deferred);
      return deferred.promise;
    }
  };

  return _class;
}();

exports.default = _class;