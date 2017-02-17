'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./core/think.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// thinkjs command

var sep = _path2.default.sep;

var cwd = process.cwd();
var templatePath = _path2.default.dirname(__dirname) + sep + 'template';
var projectRootPath = cwd; //project root path
var modeList = ['normal', 'module'];

think.mode = think.mode_module;

/**
 * get date time
 * @return {} []
 */
var getDateTime = function getDateTime() {
  var fn = function fn(d) {
    return ('0' + d).slice(-2);
  };
  var d = new Date();
  var date = d.getFullYear() + '-' + fn(d.getMonth() + 1) + '-' + fn(d.getDate());
  var time = fn(d.getHours()) + ':' + fn(d.getMinutes()) + ':' + fn(d.getSeconds());
  return date + ' ' + time;
};
/**
 * log
 * @param  {Function} fn []
 * @return {}      []
 */
var log = function log(fn) {
  think.log(function (colors) {
    return '  ' + fn(colors);
  }, '', null);
};

/**
 * mkdir
 * @param  {String} dir []
 * @return {}     []
 */
var mkdir = function mkdir(dir) {
  if (think.isDir(dir)) {
    return;
  }
  think.mkdir(dir);
  log(function (colors) {
    return colors.cyan('create') + ' : ' + _path2.default.relative(cwd, dir);
  });
};

/**
 * get version
 * @return {String} []
 */
var getVersion = function getVersion() {
  var filepath = _path2.default.resolve(__dirname, '../package.json');
  var version = JSON.parse(_fs2.default.readFileSync(filepath)).version;
  return version;
};

/**
 * get app root path
 * @return {} []
 */
var getProjectAppPath = function getProjectAppPath() {
  var path = projectRootPath + think.sep;
  path += !_commander2.default.es5 || _commander2.default.ts ? 'src' : 'app';
  return path;
};
/**
 * get app name
 * @return {} []
 */
var getAppName = function getAppName() {
  var filepath = _path2.default.normalize(cwd + '/' + projectRootPath).replace(/\\/g, '');
  var matched = filepath.match(/([^\/]+)\/?$/);
  return matched[1];
};

/**
 * copy file
 * @param  {String} source []
 * @param  {String} target []
 * @return {}        []
 */
var copyFile = function copyFile(source, target, replace, showWarning) {

  if (showWarning === undefined) {
    showWarning = true;
  }

  if (think.isBoolean(replace)) {
    showWarning = replace;
    replace = '';
  }

  //if target file is exist, ignore it
  if (think.isFile(target)) {
    if (showWarning) {
      log(function (colors) {
        return colors.yellow('exist') + ' : ' + _path2.default.normalize(target);
      });
    }
    return;
  }

  mkdir(_path2.default.dirname(target));

  var es5 = _commander2.default.es5;

  //TypeScript
  if (_commander2.default.ts) {
    var tsSource = source.replace(/\.\w+$/, function (a) {
      return a === '.js' ? '.ts' : '_ts' + a;
    });
    if (think.isFile(templatePath + '/' + tsSource)) {
      source = tsSource;
    }
    if (target.indexOf(think.sep + 'src' + think.sep) > -1) {
      //replace target file extname to .ts
      target = target.replace(/\.js$/, '.ts');
    }
  }
  //ECMAScript 2015/2016
  else if (!es5) {
      var esSource = source.replace(/\.\w+$/, function (a) {
        return a === '.js' ? '.es' : '_es' + a;
      });
      if (think.isFile(templatePath + think.sep + esSource)) {
        source = esSource;
      }
    }

  //if source file is not exist
  if (!think.isFile(templatePath + think.sep + source)) {
    return;
  }

  var content = _fs2.default.readFileSync(templatePath + think.sep + source, 'utf8');
  //replace content 
  if (think.isObject(replace)) {
    for (var key in replace) {
      /*eslint-disable no-constant-condition*/
      while (1) {
        var content1 = content.replace(key, replace[key]);
        if (content1 === content) {
          content = content1;
          break;
        }
        content = content1;
      }
    }
  }

  _fs2.default.writeFileSync(target, content);
  log(function (colors) {
    return colors.cyan('create') + ' : ' + _path2.default.relative(cwd, target);
  });
};

/**
 * check is thinkjs app
 * @param  {String}  projectRootPath []
 * @return {Boolean}             []
 */
var isThinkApp = function isThinkApp(projectRootPath) {
  if (think.isDir(projectRootPath)) {
    var filepath = projectRootPath + '/.thinkjsrc';
    if (think.isFile(filepath)) {
      return true;
    }
  }
  return false;
};
/**
 * is module exist
 * @param  {String}  module []
 * @return {Boolean}        []
 */
var isModuleExist = function isModuleExist(module) {
  var modelPath = think.getPath(module, 'model');
  // if(think.mode === think.mode_normal){
  //   modelPath = think.getPath(module, 'controller');
  // }
  return think.isDir(modelPath);
};
/**
 * parse app config
 * @param  {} projectRootPath []
 * @return {}             []
 */
var parseAppConfig = function parseAppConfig() {
  var filepath = projectRootPath + '/.thinkjsrc';
  var content = _fs2.default.readFileSync(filepath, 'utf8');
  var data = JSON.parse(content);

  _commander2.default.ts = data.ts;
  //commander.es = data.es || data.es6; //compatible with 2.0.x
  think.mode = think['mode_' + data.mode];

  think.APP_PATH = getProjectAppPath();
};

/**
 * get view root path;
 * @return {String}             []
 */
var getProjectViewPath = function getProjectViewPath(module) {
  var APP_PATH = think.APP_PATH;

  think.APP_PATH = projectRootPath + '/view';

  //read view config, view root_path may be changed it.
  var viewConfigFile = projectRootPath + '/app/common/config/view.js';
  if (think.mode === think.mode_normal) {
    viewConfigFile = projectRootPath + '/app/config/view.js';
  }
  think.ROOT_PATH = projectRootPath;
  if (think.isFile(viewConfigFile)) {
    var data = require(viewConfigFile);
    var viewRootPath = _path2.default.normalize(data.root_path || data.default && data.default.root_path);
    think.APP_PATH = viewRootPath;
  }
  var viewPath = think.getPath(module, '');

  think.APP_PATH = APP_PATH;
  return _path2.default.normalize(viewPath).slice(0, -1);
};

/**
 * check env
 * @return {} []
 */
var _checkEnv = function _checkEnv() {
  if (!isThinkApp('./')) {
    console.log();
    log(function (colors) {
      return colors.red('current path is not thinkjs project.\n');
    });
    process.exit();
  }
  parseAppConfig();
  console.log();
};

/**
 * copy common files
 * @param  {String} projectRootPath []
 * @return {}             []
 */
var _copyWwwFiles = function _copyWwwFiles() {
  mkdir(projectRootPath);

  var name = _commander2.default.test ? 'package_test' : 'package';
  copyFile(name + '.json', projectRootPath + '/package.json');

  copyFile('.babelrc', projectRootPath + '/.babelrc');

  var mode = 'normal';
  if (think.mode === think.mode_module) {
    mode = 'module';
  }
  copyFile('thinkjsrc.json', projectRootPath + '/.thinkjsrc', {
    '<createAt>': getDateTime(),
    '<mode>': mode
  });

  var ROOT_PATH = projectRootPath + '/www';
  copyFile('nginx.conf', projectRootPath + '/nginx.conf', {
    '<ROOT_PATH>': ROOT_PATH
  });

  copyFile('pm2.json', projectRootPath + '/pm2.json', {
    '<ROOT_PATH>': _path2.default.dirname(ROOT_PATH),
    '<APP_NAME>': getAppName()
  });

  copyFile('gitignore.log', projectRootPath + '/.gitignore');
  copyFile('README.md', projectRootPath + '/README.md');

  if (_commander2.default.ts) {
    copyFile('bin/compile.ts', projectRootPath + '/bin/compile.js');
    copyFile('think.d.ts', projectRootPath + '/typings/thinkjs/think.d.ts');
  }

  mkdir(projectRootPath + '/www');
  copyFile('www/development.js', projectRootPath + '/www/development.js');
  copyFile('www/production.js', projectRootPath + '/www/production.js');
  copyFile('www/testing.js', projectRootPath + '/www/testing.js');
  copyFile('www/README.md', projectRootPath + '/www/README.md');

  mkdir(projectRootPath + '/www/static/');
  mkdir(projectRootPath + '/www/static/js');
  mkdir(projectRootPath + '/www/static/css');
  mkdir(projectRootPath + '/www/static/img');
};
/**
 * copy error template files
 * @param  {String} projectRootPath []
 * @return {}             []
 */
var _copyErrorTemplateFiles = function _copyErrorTemplateFiles() {

  var module = 'common';
  if (think.mode === think.mode_normal) {
    module = 'home';
  }

  var controllerPath = think.getPath(module, 'controller');
  mkdir(controllerPath);
  copyFile('controller/error.js', controllerPath + '/error.js');

  var commonViewPath = getProjectViewPath(module);

  mkdir(commonViewPath);
  copyFile('view/error_400.html', commonViewPath + '/error_400.html');
  copyFile('view/error_403.html', commonViewPath + '/error_403.html');
  copyFile('view/error_404.html', commonViewPath + '/error_404.html');
  copyFile('view/error_500.html', commonViewPath + '/error_500.html');
  copyFile('view/error_503.html', commonViewPath + '/error_503.html');
};

var getSecret = function getSecret(length) {
  length = length || 8;
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()`1234567890';
  var arr = str.split('').sort(function () {
    return Math.random() >= 0.5 ? 1 : -1;
  }).slice(0, length);
  return arr.join('');
};
/**
 * copy common config files
 * @return {}             []
 */
var _copyCommonConfigFiles = function _copyCommonConfigFiles() {
  var rootPath = think.getPath('common', 'config');
  mkdir(rootPath);

  copyFile('config/config.js', rootPath + '/config.js', false);
  copyFile('config/view.js', rootPath + '/view.js');
  copyFile('config/db.js', rootPath + '/db.js');
  copyFile('config/hook.js', rootPath + '/hook.js');
  copyFile('config/session.js', rootPath + '/session.js', {
    '<SECRET>': getSecret()
  });
  copyFile('config/error.js', rootPath + '/error.js');

  mkdir(rootPath + '/env');
  copyFile('config/env/development.js', rootPath + '/env/development.js');
  copyFile('config/env/testing.js', rootPath + '/env/testing.js');
  copyFile('config/env/production.js', rootPath + '/env/production.js');

  mkdir(rootPath + '/locale');
  copyFile('config/locale/en.js', rootPath + '/locale/en.js');
};
/**
 * copy bootstrap files
 * @return {}             []
 */
var _copyCommonBootstrapFiles = function _copyCommonBootstrapFiles() {
  var rootPath = think.getPath('common', 'bootstrap');
  mkdir(rootPath);

  copyFile('bootstrap/middleware.js', rootPath + '/middleware.js');
  copyFile('bootstrap/global.js', rootPath + '/global.js');
};

/**
 * create module
 * @param  {String} module      []
 * @return {}             []
 */
var _createModule = function _createModule(module) {
  if (think.mode !== think.mode_module && module !== 'home') {
    log(function (colors) {
      return colors.red('app mode is not module, can not create module.\n');
    });
    process.exit();
  }
  if (isModuleExist(module)) {
    log(function (colors) {
      return colors.red('module `' + module + '` is exist.\n');
    });
    process.exit();
  }

  //config files
  var configPath = think.getPath(module, 'config');
  mkdir(configPath);
  copyFile('config/config.js', configPath + '/config.js', false);

  //controller files
  var controllerPath = think.getPath(module, 'controller');
  mkdir(controllerPath);
  copyFile('controller/base.js', controllerPath + '/base.js');
  copyFile('controller/index.js', controllerPath + '/index.js');

  //logic files
  var logicPath = think.getPath(module, 'logic');
  mkdir(logicPath);
  copyFile('logic/index.js', logicPath + '/index.js');

  //model files
  var modelPath = think.getPath(module, 'model');
  mkdir(modelPath);
  copyFile('model/index.js', modelPath + '/index.js', false);

  //view files
  var viewPath = getProjectViewPath(module);
  mkdir(viewPath);
  copyFile('view/index_index.html', viewPath + '/index_index.html');
};

/**
 * create module
 * @param  {} module []
 * @return {}        []
 */
var createModule = function createModule(module) {
  _checkEnv();

  if (module === 'common') {
    return;
  }

  _createModule(module);
};
/**
 * create controller
 * @param  {} controller []
 * @return {}            []
 */
var createController = function createController(controller) {
  _checkEnv();

  controller = controller.split('/');
  var module = 'common';
  if (controller.length >= 2) {
    module = controller[0];
    controller = controller.slice(1).join('/');
  } else {
    controller = controller[0];
  }

  if (!isModuleExist(module)) {
    createModule(module);
  }

  var controllerPath = think.getPath(module, 'controller');
  var file = 'index.js';
  if (_commander2.default.rest) {
    file = 'rest.js';
  }
  copyFile('controller/' + file, controllerPath + '/' + controller + '.js');

  var logicPath = think.getPath(module, 'logic');
  copyFile('logic/index.js', logicPath + '/' + controller + '.js');

  console.log();
};

/**
 * create service
 * @param  {} controller []
 * @return {}            []
 */
var createService = function createService(service) {
  _checkEnv();

  service = service.split('/');
  var module = 'common';
  if (service.length === 2) {
    module = service[0];
    service = service[1];
  } else {
    service = service[0];
  }

  if (!isModuleExist(module)) {
    createModule(module);
  }

  var servicePath = think.getPath(module, 'service');
  copyFile('service/index.js', servicePath + '/' + service + '.js');

  console.log();
};
/**
 * create model file
 * @param  {String} model []
 * @return {}       []
 */
var createModel = function createModel(model) {
  _checkEnv();

  model = model.split('/');
  var module = 'common';
  if (model.length === 2) {
    module = model[0];
    model = model[1];
  } else {
    model = model[0];
  }

  if (!isModuleExist(module)) {
    createModule(module);
  }

  var file = 'index.js';
  if (_commander2.default.relation) {
    file = 'relation.js';
  } else if (_commander2.default.mongo) {
    file = 'mongo.js';
  }
  var controllerPath = think.getPath(module, 'model');
  copyFile('model/' + file, controllerPath + '/' + model + '.js');

  console.log();
};

/**
 * create middleware
 * @param  {String} middleware []
 * @return {[type]}            []
 */
var createMiddleware = function createMiddleware(middleware) {
  _checkEnv();
  var midlewarePath = think.getPath('common', 'middleware');
  var filepath = midlewarePath + '/' + middleware + '.js';
  mkdir(midlewarePath);
  copyFile('middleware/base.js', filepath);

  console.log();
};

/**
 * create adapter
 * @param  {String} adatper []
 * @return {}         []
 */
var createAdapter = function createAdapter(adapter) {
  _checkEnv();

  adapter = adapter.split('/');

  var type = adapter[0];
  var name = adapter[1] || 'base';

  var adapterPath = think.getPath('common', 'adapter');

  copyFile('adapter/base.js', adapterPath + '/' + type + '/' + name + '.js');

  console.log();
};

/**
 * module app
 * @param  {} projectRootPath []
 * @return {}             []
 */
var _createProject = function _createProject() {

  _copyWwwFiles();

  mkdir(think.APP_PATH);

  _copyCommonBootstrapFiles();
  _copyCommonConfigFiles();
  _copyErrorTemplateFiles();

  _createModule('home');

  if (_commander2.default.test) {
    copyFile('test/index.js', projectRootPath + '/test/index.js');
  }
};
/**
 * create project
 * @param  {String} projectRootPath []
 * @return {}             []
 */
var createProject = function createProject() {
  if (isThinkApp(projectRootPath)) {
    console.log();
    log(function (colors) {
      return colors.red('path `' + projectRootPath + '` is already a thinkjs project.\n');
    });
    return;
  }
  console.log();

  think.APP_PATH = getProjectAppPath();
  _createProject();

  var p = projectRootPath.slice(cwd.length);
  if (p[0] === think.sep) {
    p = p.slice(1);
  }

  console.log();
  console.log('  enter path:');
  console.log('  $ cd ' + p);
  console.log();

  console.log('  install dependencies:');
  console.log('  $ npm install');
  console.log();

  console.log('  run the app:');
  console.log('  $ npm start');

  console.log();
};

/**
 * create plugin
 * @return {} []
 */
var createPlugin = function createPlugin() {
  console.log();

  mkdir(projectRootPath);

  var pluginName = _path2.default.basename(projectRootPath).toLowerCase();
  pluginName = pluginName.replace(/\_/g, '-');
  if (pluginName[0] === '-') {
    pluginName = pluginName.slice(1);
  }
  if (pluginName.indexOf('think-') !== 0) {
    pluginName = 'think-' + pluginName;
  }

  copyFile('plugin/src/index.js', projectRootPath + '/src/index.js');
  copyFile('plugin/test/index.js', projectRootPath + '/test/index.js', {
    '<PLUGIN_NAME>': pluginName
  });
  copyFile('plugin/.eslintrc', projectRootPath + '/.eslintrc');
  copyFile('plugin/gitignore', projectRootPath + '/.gitignore');
  copyFile('plugin/.npmignore', projectRootPath + '/.npmignore');
  copyFile('plugin/.travis.yml', projectRootPath + '/.travis.yml');
  copyFile('plugin/package.json', projectRootPath + '/package.json', {
    '<PLUGIN_NAME>': pluginName
  });
  copyFile('plugin/README.md', projectRootPath + '/README.md', {
    '<PLUGIN_NAME>': pluginName
  });

  console.log();
  console.log('  enter path:');
  console.log('  $ cd ' + projectRootPath);
  console.log();

  console.log('  install dependencies:');
  console.log('  $ npm install');
  console.log();

  console.log('  watch compile:');
  console.log('  $ npm run watch-compile');
  console.log();

  console.log('  run test:');
  console.log('  $ npm run test-cov');

  console.log();
};
/**
 * display thinkjs version
 * @return {} []
 */
var displayVersion = function displayVersion() {
  var version = getVersion();
  var chars = [' _______ _     _       _        _  _____ ', '|__   __| |   (_)     | |      | |/ ____|', '   | |  | |__  _ _ __ | | __   | | (___  ', '   | |  | \'_ \\| | \'_ \\| |/ /   | |\\___ \\ ', '   | |  | | | | | | | |   < |__| |____) |', '   |_|  |_| |_|_|_| |_|_|\\_\\____/|_____/ ', '                                         '].join('\n');
  console.log('\n v' + version + '\n');
  console.log(chars);
};

_commander2.default.usage('[command] <options ...>');
_commander2.default.option('-v, --version', 'output the version number', function () {
  displayVersion();
});
_commander2.default.option('-V', 'output the version number', function () {
  displayVersion();
});
_commander2.default.option('--es5', 'use es5 for project, used in `new` command');
_commander2.default.option('-t, --ts', 'use TypeScript for project, used in `new` command');
_commander2.default.option('-T, --test', 'add test dirs when create project, used in `new` command');
_commander2.default.option('-r, --rest', 'create rest controller, used in `controller` command');
_commander2.default.option('-M, --mongo', 'create mongo model, used in `model` command');
_commander2.default.option('-R, --relation', 'create relation model, used in `model` command');
_commander2.default.option('-m, --mode <mode>', 'project mode type(normal, module), default is module, used in `new` command', function (mode) {
  if (modeList.indexOf(mode) === -1) {
    console.log('mode value must one of ' + modeList.join(', '));
    process.exit();
  }
  think.mode = think['mode_' + mode];
});

//create project
_commander2.default.command('new <projectPath>').description('create project').action(function (projectPath) {
  projectRootPath = _path2.default.resolve(projectRootPath, projectPath);
  //commander.es = commander.es || commander.es6;
  createProject();
});

//create module
_commander2.default.command('module <moduleName>').description('add module').action(function (module) {
  createModule(module.toLowerCase());
});

//create controlelr
_commander2.default.command('controller <controllerName>').description('add controller').action(function (controller) {
  createController(controller.toLowerCase());
});

//create service
_commander2.default.command('service <serviceName>').description('add service').action(function (service) {
  createService(service.toLowerCase());
});

//create model
_commander2.default.command('model <modelName>').description('add model').action(function (model) {
  createModel(model.toLowerCase());
});

//create middleware
_commander2.default.command('middleware <middlewareName>').description('add middleware').action(function (middleware) {
  createMiddleware(middleware.toLowerCase());
});

//create adapter
_commander2.default.command('adapter <adapterName>').description('add adapter').action(function (adapter) {
  createAdapter(adapter.toLowerCase());
});

//create plugin
_commander2.default.command('plugin <pluginPath>').description('create ThinkJS plugin').action(function (pluginPath) {
  projectRootPath = _path2.default.resolve(projectRootPath, pluginPath);

  createPlugin();
});

_commander2.default.parse(process.argv);