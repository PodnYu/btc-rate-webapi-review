import KoaRouter from 'koa-router';
import createAuthRoutes from './auth';
import createBTCRoutes from './btc';

export const router = new KoaRouter();

createAuthRoutes(router);
createBTCRoutes(router);
