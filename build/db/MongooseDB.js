'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongooseDB = function () {
	function MongooseDB() {
		_classCallCheck(this, MongooseDB);

		// Use native promises
		_mongoose2.default.Promise = global.Promise;
	}

	_createClass(MongooseDB, [{
		key: 'connect',
		value: function connect() {
			var url = 'mongodb://localhost:27017/fenli';
			if (process.env.NODE_ENV == 'production') {
				url = 'mongodb://fenli-db/fenli';
			}
			// Use connect method to connect to the Server 
			return new Promise(function (resolve, reject) {
				_mongoose2.default.connect(url, { useMongoClient: true });
				var db = _mongoose2.default.connection;
				db.on('error', function (err) {
					_logger2.default.error(err);
				});
				db.once('open', function () {
					_logger2.default.info("mongodb Connected correctly to server");
					// we're connected!
					resolve(_mongoose2.default);
				});
			});
		}
	}]);

	return MongooseDB;
}();

exports.default = MongooseDB;