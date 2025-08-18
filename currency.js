import axios from "axios";
import { logData } from "./log.js";

export const getCurrency = async (ctx) => {
	const response = await axios.get(process.env.CURRENCY_API_URL);
	const rate = response.data.conversion_rates.RUB.toFixed(2);

	logData(ctx, 'курса доллара');

	return ctx.reply(`${rate} руб.`);
};