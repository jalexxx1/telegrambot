import axios from "axios";
import { logData } from "./log.js";
import fs from 'fs';
import { InputFile } from "grammy";

export const getWeatherOVB = async (ctx) => {
	try {
		const response = await axios.get(process.env.METEOSOURCE_API_OVB);
		console.log(response.data.current);
		let resCurrent = response.data.current;
		let text = `// Новосибирск //\n\nТемпература: ${resCurrent.temperature}℃\nВетер: ${resCurrent.wind.speed}м/c\nНаправление: ${resCurrent.wind.dir}\nОсадки: ${resCurrent.summary}`;
		let iconLink = fs.readFileSync(`iconset/${resCurrent.icon_num}.png`);		
		logData(ctx, 'погоды');
		await ctx.replyWithPhoto(new InputFile(iconLink));
		await ctx.reply(text);
	} catch (error) {
		return console.log(`Ошибка в получении данных: ${error}`);
	}
};

export const getWeatherUTP = async (ctx) => {
	try {
		const response = await axios.get(process.env.METEOSOURCE_API_UTP);
		console.log(response.data.current);
		let resCurrent = response.data.current;
		let text = `// Паттайя //\n\nТемпература: ${resCurrent.temperature}℃\nВетер: ${resCurrent.wind.speed}м/c\nНаправление: ${resCurrent.wind.dir}\nОсадки: ${resCurrent.summary}`;
		let iconLink = fs.readFileSync(`iconset/${resCurrent.icon_num}.png`);		
		logData(ctx, 'погоды');
		await ctx.replyWithPhoto(new InputFile(iconLink));
		await ctx.reply(text);
	} catch (error) {
		return console.log(`Ошибка в получении данных: ${error}`);
	}
};
