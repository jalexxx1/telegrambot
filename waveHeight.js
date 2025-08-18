import axios from "axios";
import { logData } from "./log.js";

const lat = 12.927608;
const lng = 100.877083;
const params = 'waveHeight';

export const getWaveHeight = async (ctx) => {
	try {
		const response = await axios.get(`${process.env.STORMGLASS_API_URL}?lat=${lat}&lng=${lng}&params=${params}`, {
			headers: {
				'Authorization' : process.env.STORMGLASS_API_KEY
			}
		});
		// console.log(response.data.hours[response.data.hours.length - 1].waveHeight.sg);
		let waveHeight = response.data.hours[response.data.hours.length - 1].waveHeight.sg;
		let text = `// Паттайя //\n\nВысота волн: ${waveHeight}м`;
		logData(ctx, 'высоты волн');
		await ctx.reply(text);
	} catch (error) {
		return console.log(`Ошибка в получении данных: ${error}`);
	}
};
