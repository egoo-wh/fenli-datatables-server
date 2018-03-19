'use strict';

import mongoose from 'mongoose';
import logger from '../logger';

export default class MongooseDB {
	constructor() {
		// Use native promises
    mongoose.Promise = global.Promise;
	}

	connect() {
		let url = 'mongodb://localhost:27017/fenli';
		if (process.env.NODE_ENV == 'production') {
		  url = 'mongodb://fenli-db/fenli';
		}
		// Use connect method to connect to the Server 
		return new Promise((resolve, reject)=>{
			mongoose.connect(url, {useMongoClient: true});
			let db = mongoose.connection;
			db.on('error', (err)=>{
				logger.error(err);
			});
			db.once('open', () => {
				logger.info("mongodb Connected correctly to server");
			  // we're connected!
			  resolve(mongoose);
			});
		});
		
	}
}