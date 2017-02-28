'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('../../common/base/base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var _class = function (_Base) {
	(0, _inherits3.default)(_class, _Base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
	}

	_class.prototype.indexAction = function () {
		var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
			var file, filepath, uploadPath, basename, fileInfo, pics, affectedRows;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (think.isEmpty(this.file('image'))) {
								_context.next = 18;
								break;
							}

							file = think.extend({}, this.file('image'));
							filepath = file.path;
							uploadPath = think.RESOURCE_PATH + '/static';

							think.mkdir(uploadPath);
							basename = path.basename(filepath);
							fileInfo = (0, _assign2.default)(file, { src: "http://localhost:8360/static/" + basename });

							fs.renameSync(filepath, uploadPath + '/' + basename);
							file.path = uploadPath + '/' + basename;

							if (!think.isFile(file.path)) {
								_context.next = 17;
								break;
							}

							pics = this.model('file');
							_context.next = 13;
							return pics.add(fileInfo);

						case 13:
							affectedRows = _context.sent;
							return _context.abrupt('return', this.json(fileInfo));

						case 17:
							console.log('not exist');

						case 18:
							return _context.abrupt('return', this.fail("参数错误"));

						case 19:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function indexAction() {
			return _ref.apply(this, arguments);
		}

		return indexAction;
	}();

	return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=upload.js.map