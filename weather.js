import axios from "axios";
import { logData } from "./log.js";
import fs from "fs";
import { InputFile } from "grammy";
import { windDirections } from "./weatherConfig.js";

export const getWeatherOVB = async (ctx) => {
  try {
    const response = await axios.get(process.env.METEOSOURCE_API_OVB);
    console.log(response.data.current);
    let resCurrent = response.data.current;
    let resFuture = response.data.hourly.data;

    const futureHoursPrediction = () => {
      let prediction = [];
      for (let index = 0; index < resFuture.length; index++) {
        prediction.push(`\n ${resFuture[index].date.split("T")[1].split(":").slice(0, 2).join(":")} - Температура: ${resFuture[index].temperature}, Осадки: ${resFuture[index].summary}\n`);
      }
      return prediction.slice(0, 11).join("");
    };

    let text = `// Новосибирск //\n\nТемпература: ${resCurrent.temperature}℃\nВетер: ${resCurrent.wind.speed}м/c\nНаправление: ${windDirections[resCurrent.wind.dir]}\nОсадки: ${resCurrent.summary}\n\n // Прогноз на ближайшие часы //${futureHoursPrediction()}`;
    let iconLink = fs.readFileSync(`iconset/${resCurrent.icon_num}.png`);
    logData(ctx, "погоды");
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
    let resFuture = response.data.hourly.data;

    const futureHoursPrediction = () => {
      let prediction = [];
      for (let index = 0; index < resFuture.length; index++) {
        prediction.push(`\n ${resFuture[index].date.split("T")[1].split(":").slice(0, 2).join(":")} - Температура: ${resFuture[index].temperature}, Осадки: ${resFuture[index].summary}\n`);
      }
      return prediction.slice(0, 11).join("");
    };

    let text = `// Паттайя //\n\nТемпература: ${resCurrent.temperature}℃\nВетер: ${resCurrent.wind.speed}м/c\nНаправление: ${windDirections[resCurrent.wind.dir]}\nОсадки: ${resCurrent.summary}\n\n // Прогноз на ближайшие часы //${futureHoursPrediction()}`;
    let iconLink = fs.readFileSync(`iconset/${resCurrent.icon_num}.png`);
    logData(ctx, "погоды");
    await ctx.replyWithPhoto(new InputFile(iconLink));
    await ctx.reply(text);
  } catch (error) {
    return console.log(`Ошибка в получении данных: ${error}`);
  }
};
