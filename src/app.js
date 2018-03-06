import Koa from 'koa';
import api from './api';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import MongooseDB from './db/MongooseDB.js';
import logger from './logger';

const app = new Koa()
  .on('error', (err) => {
    logger.error(err);
  })
  .use(cors({
    'Access-Control-Allow-Origin': '*'
    // 'Access-Control-Allow-Origin': 'egooidea.com'
  }))
  // .use(async (ctx, next) => {
  //   ctx.state.collections = config.collections;
  //   ctx.state.authorizationHeader = 'Key ' + config.key;
  //   await next();
  // })
  .use(bodyParser())
  // initialize database.
  .use(async (ctx, next) => {
    logger.info('db init');
    ctx.mongoose = await new MongooseDB().connect();
    await next();
  })
  // routes
  .use(api.routes())
  .use(api.allowedMethods())
	// .use(async function (ctx, next) {
	//   const start = new Date();
	//   await next();
	//   const ms = new Date() - start;
	//   ctx.set('X-Response-Time', `${ms}ms`);
	// })
  // disconnect database.
  .use(async (ctx, next) => {
    let closeErr = await ctx.mongoose.connection.close();
    if (closeErr) {
      logger.error("db close err: " + err)
    } else {
      logger.info("db closed.");
    }
    
    await next();
  });

export default app;