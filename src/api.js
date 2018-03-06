import KoaRouter from 'koa-router';
import _ from 'lodash';
import FenliAddr from './db/model/FenliAddr';
import logger from './logger';

const api = KoaRouter();

/**
 * 
 * @param  {[type]} '/list'    [description]
 * @param  {[type]} async(ctx, next          [description]
 * @return {[type]}            [description]
 */
api.get('/list', async(ctx, next)=>{
	try{
		let addrs = await FenliAddr.find().exec();
		logger.debug(addrs);
		if (addrs) {
    	ctx.body = {
    		ret: 0,
    		data: addrs
    	}
    }
	}catch(err){
		logger.error(err);
  	ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
    	ret: 1,
      message: err.message
    };
	}
	
	await next();
});

api.post('/new', async(ctx, next)=>{
	let _data = ctx.request.body
	if (_data.name && _data.product && _data.url) {
		let fa = new FenliAddr();
		fa.name = _data.name;
		fa.product = _data.product;
		fa.url = _data.url;
		try {
			let result = await fa.save();
			ctx.body = {
	  		ret: 0,
	  		data: result
	  	}
		}catch(err){
			logger.error(err);
			ctx.status = err.statusCode || err.status || 500;
	    ctx.body = {
	    	ret: 1,
	      message: err.message
	    };
		}
	}
	await next();
});

api.post('/edit', async(ctx, next)=>{
	let _data = ctx.request.body;
	let _id = _data._id;
	let fa = await FenliAddr.findOne({_id: _id});
	logger.debug(_data);
	if (fa) {
		if (_data.name) { fa.name = _data.name; }
		if (_data.product) { fa.product = _data.product; }
		if (_data.url) { fa.url = _data.url; }
		try {
			let result = await fa.save();
			ctx.body = {
	  		ret: 0,
	  		data: result
	  	}
		}catch(err){
			logger.error(err);
			ctx.status = err.statusCode || err.status || 500;
	    ctx.body = {
	    	ret: 1,
	      message: err.message
	    };
		}
	}

	await next();
})

api.del('/delete/:_id', async (ctx, next)=>{
	let { _id } = ctx.params;
	try {
		await FenliAddr.deleteOne({_id:_id});
		ctx.body = {
  		ret: 0
  	}
	}catch(err){
		logger.error(err);
		ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
    	ret: 1,
      message: err.message
    };
	}
	
	await next();
});

export default api;