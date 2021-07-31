import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = process.env.PORT || 5007;

export const server = app.listen(PORT, () => {
	console.log(`listening on 127.0.0.1:${PORT}...`);
});
