'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _cors = require('@koa/cors');

var _cors2 = _interopRequireDefault(_cors);

var _MongooseDB = require('./db/MongooseDB.js');

var _MongooseDB2 = _interopRequireDefault(_MongooseDB);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new _koa2.default().on('error', function (err) {
  _logger2.default.error(err);
}).use((0, _cors2.default)({
  // 'Access-Control-Allow-Origin': '*'
  'Access-Control-Allow-Origin': 'egooidea.com'
}))
// .use(async (ctx, next) => {
//   ctx.state.collections = config.collections;
//   ctx.state.authorizationHeader = 'Key ' + config.key;
//   await next();
// })
.use((0, _koaBodyparser2.default)())
// initialize database.
.use(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _logger2.default.info('db init');
            _context.next = 3;
            return new _MongooseDB2.default().connect();

          case 3:
            ctx.mongoose = _context.sent;
            _context.next = 6;
            return next();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())
// routes
.use(_api2.default.routes()).use(_api2.default.allowedMethods())
// .use(async function (ctx, next) {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// })
// disconnect database.
.use(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    var closeErr;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ctx.mongoose.connection.close();

          case 2:
            closeErr = _context2.sent;

            if (closeErr) {
              _logger2.default.error("db close err: " + err);
            } else {
              _logger2.default.info("db closed.");
            }

            _context2.next = 6;
            return next();

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = app;