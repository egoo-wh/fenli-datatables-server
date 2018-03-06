"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Schema = _mongoose2.default.Schema;

var FenliAddrSchema = new Schema({
	/**
  * 游戏名称
  * @type string
  */
	name: String,

	/**
  * 别名
  * @type array
  */
	product: Array,

	/**
  * 分离地址
  * @type string
  */
	url: String
});

FenliAddrSchema.statics.findById = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (id) {
							_context.next = 2;
							break;
						}

						return _context.abrupt("return", null);

					case 2:
						_context.next = 4;
						return undefined.findOne({ id: id }).exec();

					case 4:
						return _context.abrupt("return", _context.sent);

					case 5:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}();

// FenliAddrSchema.statics.updateById = async (id) => {
// 	if (!id) { return null; }
// 	return await this.findOne
// }


exports.default = _mongoose2.default.model("FenliAddr", FenliAddrSchema);