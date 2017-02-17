'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * find template file path
 * @param  {String}  
 * @return {Class}
 */
var _class = function (_think$middleware$bas) {
  (0, _inherits3.default)(_class, _think$middleware$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$middleware$bas.apply(this, arguments));
  }

  /**
   * get path prefix
   * @return {String} []
   */
  _class.prototype.getPathPrefix = function getPathPrefix(module) {
    var pathPrefix = void 0,
        http = this.http,
        prefix = '';
    var root_path = this.options.root_path;

    var theme = http.theme();
    var lang = http._langAsViewPath && http.lang();

    module = module || http.module;

    //support locale
    if (lang) {
      prefix += think.sep + lang;
    }
    //support theme
    if (theme) {
      prefix += think.sep + theme;
    }

    //view root path is defined
    if (root_path) {
      pathPrefix = _path2.default.normalize(root_path);
      if (think.mode === think.mode_module) {
        pathPrefix += prefix + think.sep + module;
      }
    } else {
      pathPrefix = think.getPath(module, think.dirname.view, prefix);
    }

    return pathPrefix;
  };
  /**
   * run
   * @param  {String} templateFile [template filepath]
   * @return {}              []
   */


  _class.prototype.run = function run(options) {
    if (!think.isObject(options)) {
      options = think.extend({
        templateFile: options
      }, this.config('view'));
    }
    this.options = options;

    var templateFile = options.templateFile;
    //is absolute file path
    if (templateFile && _path2.default.isAbsolute(templateFile)) {
      return templateFile;
    }
    var http = this.http;
    var _options = options,
        file_depr = _options.file_depr,
        file_ext = _options.file_ext;

    var pathPrefix = this.getPathPrefix();
    var controller = http.controller.replace(/\//g, think.sep);

    //if file_depr is /, replace to think.sep, avoid error on windows
    if (file_depr === '/') {
      file_depr = think.sep;
    }

    // this.display()
    if (!templateFile) {
      return pathPrefix + think.sep + controller + file_depr + http.action + file_ext;
    }
    //replace : to /
    templateFile = templateFile.replace(/\:/g, '/');

    // this.display('detail')
    // this.display('index/detail')
    // this.display('admin/index/detail')
    // this.display('admin/index/detail.html')
    var paths = templateFile.split('/');
    var length = paths.length;
    var action = paths[length - 1];

    var module = void 0;
    if (length === 2) {
      controller = paths[0];
    } else if (length > 2) {
      var index = think.module.indexOf(paths[0]) > -1 ? 1 : 0;
      if (index) {
        module = paths[0];
      }
      var newController = paths.slice(index, length - 1).join(think.sep);
      if (newController) {
        controller = newController;
      }
    }

    if (module && module !== http.module) {
      pathPrefix = this.getPathPrefix(module);
    }

    templateFile = pathPrefix + think.sep + controller + file_depr + action;
    if (action.indexOf('.') === -1) {
      templateFile += file_ext;
    }
    return templateFile;
  };

  return _class;
}(think.middleware.base);

exports.default = _class;