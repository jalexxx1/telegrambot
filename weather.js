import axios from "axios";
import { logData } from "./log.js";

export const getWeatherOVB = async (ctx) => {
	try {
		const response = await axios.get(process.env.WEATHER_API_URL_OVB);
		console.log(response.data.data);
		let res = response.data.data[0];
		let text = `// ${res.city_name} //\n\nТемпература: ${res.temp}℃\nВетер: ${res.wind_spd}м/c\nНаправление: ${res.wind_cdir_full}\nВидимость: ${res.vis}км\n${res.weather.description}`;
		let iconLink = `https://cdn.weatherbit.io/static/img/icons/${res.weather.icon}.png`;
		logData(ctx, 'погоды');
		await ctx.replyWithPhoto(iconLink);
		await ctx.reply(text);
	} catch (error) {
		return console.log(`Ошибка в получении данных: ${error}`);
	}
};

export const getWeatherUTP = async (ctx) => {
	try {
		const response = await axios.get(process.env.WEATHER_API_URL_UTP);
		console.log(response.data.data);
		let res = response.data.data[0];
		let text = `// ${res.city_name} //\n\nТемпература: ${res.temp}℃\nВетер: ${res.wind_spd}м/c\nНаправление: ${res.wind_cdir_full}\nВидимость: ${res.vis}км\n${res.weather.description}`;
		let iconLink = `https://cdn.weatherbit.io/static/img/icons/${res.weather.icon}.png`;
		logData(ctx, 'погоды');
		await ctx.replyWithPhoto(iconLink);
		await ctx.reply(text);
	} catch (error) {
		return console.log(`Ошибка в получении данных: ${error}`);
	}
};
