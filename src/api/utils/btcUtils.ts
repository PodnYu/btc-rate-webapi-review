import axios from 'axios';

export async function getBTCToUAHExchange() {
	const kunaURL = 'https://api.kuna.io/v3/tickers?symbols=btcuah';

	try {
		const response = await axios.get(kunaURL);
		const body = response.data;
		const data = {
			sell: body[0][3],
			buy: body[0][1],
		};
		return data;
	} catch (err) {
		console.error(err.message);
		return null;
	}
}
