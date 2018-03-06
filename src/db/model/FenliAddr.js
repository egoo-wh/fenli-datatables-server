import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let FenliAddrSchema = new Schema({
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

export default mongoose.model("FenliAddr", FenliAddrSchema);