import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify<string, jwt.Secret>(jwt.verify);

export const signToken = (payload: any) =>
	jwtSignAsync(payload, <string>process.env.JWT_SECRET_KEY);

export const verifyToken = (token: string) =>
	jwtVerifyAsync(token, <string>process.env.JWT_SECRET_KEY);
