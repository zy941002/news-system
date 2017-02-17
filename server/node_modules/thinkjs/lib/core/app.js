'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _domain = require('domain');

var _domain2 = _interopRequireDefault(_domain);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$http$base) {
  (0, _inherits3.default)(_class, _think$http$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$http$base.apply(this, arguments));
  }

  /**
   * invoke logic
   * @return {} []
   */
  _class.prototype.invokeLogic = function invokeLogic() {
    var _this2 = this;

    if (!think.config('logic_on')) {
      return;
    }

    return this.hook('logic_before').then(function () {
      return _this2.execLogic();
    }).catch(function (err) {
      //ignore prevent reject promise
      //make logic_after hook can be invoked
      if (!think.isPrevent(err)) {
        return _promise2.default.reject(err);
      }
    }).then(function () {
      return _this2.hook('logic_after');
    }).then(function () {
      //http is end
      if (_this2.http._isEnd) {
        return think.prevent();
      }
    });
  };
  /**
   * exec logic
   * @return {Promise} []
   */


  _class.prototype.execLogic = function execLogic() {
    var name = this.http.module + '/' + think.dirname.logic + '/' + this.http.controller;
    var cls = think.require(name, true);
    if (!cls) {
      return _promise2.default.resolve();
    }
    var instance = new cls(this.http);
    var action = think.camelCase(this.http.action);
    if (instance[action + 'Action']) {
      return this.action(instance, action, false);
    }
    //call action
    if (instance.__call) {
      return this.action(instance, '__call', false);
    }
    //only has before method
    if (instance.__before) {
      return think.co(instance.__before(instance));
    }
    return _promise2.default.resolve();
  };
  /**
   * invoke controller
   * @return {} []
   */


  _class.prototype.invokeController = function invokeController(controller) {
    var _this3 = this;

    return this.hook('controller_before').then(function () {
      return _this3.execController(controller);
    }).catch(function (err) {
      //ignore prevent reject promise
      //make controller_after & response_end hook can be invoked
      if (!think.isPrevent(err)) {
        return _promise2.default.reject(err);
      }
    }).then(function () {
      return _this3.hook('controller_after');
    });
  };
  /**
   * get controller instance
   * @return {} []
   */


  _class.prototype.getControllerInstance = function getControllerInstance() {
    var http = this.http;
    var name = http.module + '/' + think.dirname.controller + '/' + http.controller;
    var Controller = think.require(name, true);
    if (!Controller) {
      return;
    }
    var instance = new Controller(http);
    //rewrite action when controller is rest
    if (instance._isRest) {
      var method = instance._method;
      //get method from GET params
      if (method) {
        method = instance.get(method).toLowerCase();
      }
      if (!method) {
        method = this.http.method.toLowerCase();
      }
      this.http.action = method;
    }
    return instance;
  };
  /**
   * exec controller
   * @return {Promise} []
   */


  _class.prototype.execController = function execController(controller) {
    if (controller) {
      return this.execAction(controller);
    }
    var http = this.http;
    http.error = new Error(think.locale('CONTROLLER_NOT_FOUND', http.controller, http.url));
    return think.statusAction(404, http);
  };
  /**
   * exec action
   * @param  {Object} controller [controller instance]
   * @param  {Boolean} call       [is call controller]
   * @return {Promise}            []
   */


  _class.prototype.execAction = function execAction(controller) {
    var http = this.http;
    var action = think.camelCase(http.action);
    var actionWithSuffix = action + 'Action';
    //action is exist
    if (controller[actionWithSuffix]) {
      return this.action(controller, action, false);
    }
    //call action
    if (controller.__call) {
      return this.action(controller, '__call', false);
    }
    http.error = new Error(think.locale('ACTION_NOT_FOUND', actionWithSuffix, http.url));
    return think.statusAction(404, http);
  };

  /**
   * exec 
   * @return {Promise} []
   */


  _class.prototype.exec = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var controller;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.hook('resource');

            case 2:
              _context.next = 4;
              return this.hook('route_parse');

            case 4:

              //set module config, can not set config in request
              this.http._config = thinkData.config[this.http.module];
              //console.log(eval('%HasFastProperties(this.http._config)'));

              //babel compile error

              if (!think.compileError) {
                _context.next = 8;
                break;
              }

              this.http.error = think.compileError;
              return _context.abrupt('return', think.statusAction(500, this.http));

            case 8:
              //must get controller before invoke logic
              controller = this.getControllerInstance();
              _context.next = 11;
              return this.invokeLogic();

            case 11:
              _context.next = 13;
              return this.invokeController(controller);

            case 13:
              _context.next = 15;
              return this.hook('response_end');

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function exec() {
      return _ref.apply(this, arguments);
    }

    return exec;
  }();
  /**
   * exec error
   * @param  {Error} err []
   * @return {}     []
   */


  _class.prototype.execError = function execError(err) {
    var http = this.http;
    http.error = err;
    return think.statusAction(500, http, true).catch(function () {});
  };
  /**
   * run
   * @return {} []
   */


  _class.prototype.run = function run() {
    var _this4 = this;

    var http = this.http;
    http.header('X-Powered-By', 'thinkjs-' + think.version);

    if (think.config('domain_on')) {
      var instance = _domain2.default.create();
      instance.on('error', function (err) {
        _this4.execError(err);
      });
      instance.run(function () {
        _this4.exec().catch(function (err) {
          _this4.execError(err);
        });
      });
    } else {
      this.exec().catch(function (err) {
        _this4.execError(err);
      });
    }
  };
  /**
   * create server
   * @return {} []
   */


  _class.createServer = function createServer() {
    var _this5 = this;

    var handle = think.config('create_server');
    var host = think.config('host');
    var port = think.port || think.config('port');
    //createServer callback
    var callback = function callback(req, res) {
      think.http(req, res).then(function (http) {
        new _this5(http).run();
      });
    };
    var server = void 0;
    //define createServer in application
    if (handle) {
      server = handle(callback, port, host, this);
    } else {
      //create server
      server = _http2.default.createServer(callback);
      server.listen(port, host);
    }
    think.server = server;
    //start websocket
    var websocket = think.parseConfig(think.config('websocket'));
    if (websocket.on) {
      var Cls = think.adapter('websocket', websocket.type);
      var instance = new Cls(server, websocket, this);
      instance.run();
    }
  };
  /**
   * log
   * @return {} []
   */


  _class.log = function log() {
    var host = think.config('host');
    var port = think.port || think.config('port');
    var websocketStatus = think.config('websocket.on') ? 'open' : 'closed';
    var clusterStatus = think.config('cluster_on') ? 'open' : 'closed';

    var url = 'http://' + (host || '127.0.0.1') + ':' + port + '/';
    think.log(function (colors) {
      return 'Server running at ' + colors.green(url);
    }, 'THINK');
    think.log(function (colors) {
      return 'ThinkJS Version: ' + colors.magenta(think.version);
    }, 'THINK');
    think.log(function (colors) {
      return 'Cluster Status: ' + colors.magenta(clusterStatus);
    }, 'THINK');
    think.log(function (colors) {
      return 'WebSocket Status: ' + colors.magenta(websocketStatus);
    }, 'THINK');
    think.log(function (colors) {
      return 'File Auto Compile: ' + colors.magenta(!!think.autoCompile);
    }, 'THINK');
    think.log(function (colors) {
      return 'File Auto Reload: ' + colors.magenta(think.config('auto_reload'));
    }, 'THINK');
    think.log(function (colors) {
      return 'App Enviroment: ' + colors.magenta(think.env) + '\n';
    }, 'THINK');
  };
  /**
   * cli mode
   * @return {} []
   */


  _class.cli = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var http;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return think.http(think.cli);

            case 2:
              http = _context2.sent;
              return _context2.abrupt('return', new this(http).run());

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function cli() {
      return _ref2.apply(this, arguments);
    }

    return cli;
  }();
  /**
   * http mode
   * @return {} []
   */


  _class.http = function http() {
    var nums = think.config('cluster_on');
    if (!nums) {
      this.createServer();
      return this.log();
    }
    if (nums === true) {
      nums = _os2.default.cpus().length;
    }
    if (_cluster2.default.isMaster) {
      for (var i = 0; i < nums; i++) {
        _cluster2.default.fork();
      }
      _cluster2.default.on('exit', function (worker) {
        think.log(new Error(think.locale('WORKER_DIED', worker.process.pid)), 'THINK');
        process.nextTick(function () {
          return _cluster2.default.fork();
        });
      });
      this.log();
    } else {
      this.createServer();
    }
  };
  /**
   * run
   * @return {} []
   */


  _class.run = function run() {
    if (think.cli) {
      return this.cli();
    }
    return this.http();
  };

  return _class;
}(think.http.base);

exports.default = _class;