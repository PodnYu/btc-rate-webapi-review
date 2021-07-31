import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import koaCors from '@koa/cors';
import { router } from './api/routes';
import dotenv from 'dotenv';
dotenv.config();

const app = new Koa();

app.use(koaCors());
app.use(koaBodyParser());

app.use(router.routes()).use(router.allowedMethods());

export default app;
