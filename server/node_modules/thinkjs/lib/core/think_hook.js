'use strict';

/**
 * regitster or exec hook
 * @param  {String} name []
 * @return {}      []
 */

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hook = function Hook() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var name = args[0],
      http = args[1],
      data = args[2];
  //get hook data

  if (args.length === 1) {
    return thinkData.hook[name] || [];
  }
  //remove hook
  if (http === null) {
    thinkData.hook[name] = [];
    return;
  }
  // set hook data
  // think.hook('test', ['middleware1', 'middleware2'])
  if (think.isArray(http) || !think.isHttp(http)) {
    return Hook.set(name, http, data);
  }
  //exec hook
  return Hook.exec(name, http, data);
};

/**
 * set hook
 * @return {} []
 */
Hook.set = function (name, hooks, flag) {
  //think.hook.set('test', function or class)
  if (think.isFunction(hooks)) {
    var mname = 'middleware_' + think.uuid();
    think.middleware(mname, hooks);
    hooks = [mname];
  } else if (!think.isArray(hooks)) {
    hooks = [hooks];
  } else {
    var first = hooks[0];
    if (first === 'append' || first === 'prepend') {
      flag = hooks.shift();
    }
  }
  var oriHooks = thinkData.hook[name] || [];
  if (flag === 'append') {
    oriHooks = oriHooks.concat(hooks);
  } else if (flag === 'prepend') {
    oriHooks = hooks.concat(oriHooks);
  } else {
    oriHooks = hooks;
  }
  thinkData.hook[name] = oriHooks;
};

/**
 * exec hook
 * @param  {String} name [hook name]
 * @param  {Object} http []
 * @param  {Mixed} data []
 * @return {Promise}      []
 */
// think.hook.exec = async (name, http, data) => {
//   //exec hook 
//   let list = thinkData.hook[name];
//   if (!list || list.length === 0) {
//     return Promise.resolve(data);
//   }

//   let length = list.length;
//   for(let i = 0; i < length; i++){
//     let result = await think.middleware.exec(list[i], http, data);
//     //prevent next middlewares invoked in hook
//     if(result === null){
//       break;
//     }else if (result !== undefined) {
//       data = result;
//     }
//   }
//   return data;
// };

var _execItemMiddleware = function _execItemMiddleware(list, index, http, data) {
  var item = list[index];
  if (!item) {
    return data;
  }
  return think.middleware.exec(item, http, data).then(function (result) {
    if (result === null) {
      return data;
    } else if (result !== undefined) {
      data = result;
    }
    return _execItemMiddleware(list, index + 1, http, data);
  });
};

Hook.exec = function (name, http, data) {
  //exec hook 
  var list = thinkData.hook[name];
  if (!list || list.length === 0) {
    return _promise2.default.resolve(data);
  }
  return _execItemMiddleware(list, 0, http, data);
};

exports.default = Hook;