"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = _mongoose2.default.model("FenliAddr", FenliAddrSchema);