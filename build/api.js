'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FenliAddr = require('./db/model/FenliAddr');

var _FenliAddr2 = _interopRequireDefault(_FenliAddr);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var api = (0, _koaRouter2.default)();

/**
 * 
 * @param  {[type]} '/list'    [description]
 * @param  {[type]} async(ctx, next          [description]
 * @return {[type]}            [description]
 */
api.get('/list', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
		var addrs;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _FenliAddr2.default.find().exec();

					case 3:
						addrs = _context.sent;

						_logger2.default.debug(addrs);
						if (addrs) {
							ctx.body = {
								ret: 0,
								data: addrs
							};
						}
						_context.next = 13;
						break;

					case 8:
						_context.prev = 8;
						_context.t0 = _context['catch'](0);

						_logger2.default.error(_context.t0);
						ctx.status = _context.t0.statusCode || _context.t0.status || 500;
						ctx.body = {
							ret: 1,
							message: _context.t0.message
						};

					case 13:
						_context.next = 15;
						return next();

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 8]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

api.post('/new', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
		var _data, fa, result;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_data = ctx.request.body;

						if (!(_data.name && _data.product && _data.url)) {
							_context2.next = 18;
							break;
						}

						fa = new _FenliAddr2.default();

						fa.name = _data.name;
						fa.product = _data.product;
						fa.url = _data.url;
						_context2.prev = 6;
						_context2.next = 9;
						return fa.save();

					case 9:
						result = _context2.sent;

						ctx.body = {
							ret: 0,
							data: result
						};
						_context2.next = 18;
						break;

					case 13:
						_context2.prev = 13;
						_context2.t0 = _context2['catch'](6);

						_logger2.default.error(_context2.t0);
						ctx.status = _context2.t0.statusCode || _context2.t0.status || 500;
						ctx.body = {
							ret: 1,
							message: _context2.t0.message
						};

					case 18:
						_context2.next = 20;
						return next();

					case 20:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[6, 13]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

api.post('/edit', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
		var _data, _id, fa, result;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_data = ctx.request.body;
						_id = _data._id;
						_context3.next = 4;
						return _FenliAddr2.default.findOne({ _id: _id });

					case 4:
						fa = _context3.sent;

						_logger2.default.debug(_data);

						if (!fa) {
							_context3.next = 22;
							break;
						}

						if (_data.name) {
							fa.name = _data.name;
						}
						if (_data.product) {
							fa.product = _data.product;
						}
						if (_data.url) {
							fa.url = _data.url;
						}
						_context3.prev = 10;
						_context3.next = 13;
						return fa.save();

					case 13:
						result = _context3.sent;

						ctx.body = {
							ret: 0,
							data: result
						};
						_context3.next = 22;
						break;

					case 17:
						_context3.prev = 17;
						_context3.t0 = _context3['catch'](10);

						_logger2.default.error(_context3.t0);
						ctx.status = _context3.t0.statusCode || _context3.t0.status || 500;
						ctx.body = {
							ret: 1,
							message: _context3.t0.message
						};

					case 22:
						_context3.next = 24;
						return next();

					case 24:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[10, 17]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

api.del('/delete/:_id', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
		var _id;

		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_id = ctx.params._id;
						_context4.prev = 1;
						_context4.next = 4;
						return _FenliAddr2.default.deleteOne({ _id: _id });

					case 4:
						ctx.body = {
							ret: 0
						};
						_context4.next = 12;
						break;

					case 7:
						_context4.prev = 7;
						_context4.t0 = _context4['catch'](1);

						_logger2.default.error(_context4.t0);
						ctx.status = _context4.t0.statusCode || _context4.t0.status || 500;
						ctx.body = {
							ret: 1,
							message: _context4.t0.message
						};

					case 12:
						_context4.next = 14;
						return next();

					case 14:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[1, 7]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());

exports.default = api;