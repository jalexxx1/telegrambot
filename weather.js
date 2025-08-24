import axios from "axios";
import { logData } from "./log.js";
import fs from "fs";
import { InputFile } from "grammy";
import { windDirections, cityName } from "./weatherConfig.js";

export const getWeather = async (ctx, city) => {
  try {
    const response = await axios.get(process.env.METEOSOURCE_API_URL1 + city + process.env.METEOSOURCE_API_URL2); 
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

    let text = `// ${cityName[city]} //\n\nТемпература: ${resCurrent.temperature}℃\nВетер: ${resCurrent.wind.speed}м/c\nНаправление: ${windDirections[resCurrent.wind.dir]}\nОсадки: ${resCurrent.summary}\n\n // Прогноз на ближайшие часы //\n${futureHoursPrediction()}`;
    let iconLink = fs.readFileSync(`iconset/${resCurrent.icon_num}.png`);
    logData(ctx, "погоды");
    await ctx.replyWithPhoto(new InputFile(iconLink));
    await ctx.reply(text);
  } catch (error) {
    return console.log(`Ошибка в получении данных: ${error}`);
  }
};
