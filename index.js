import dotenv from "dotenv";
import { Bot } from "grammy";
import { getWeatherOVB, getWeatherUTP } from "./weather.js";
import { getCurrency } from "./currency.js";
import { getWaveHeight } from "./waveHeight.js";
import { menu } from "./config.js";

// import { getGroq } from "./groq.js";
// import cron from "node-cron";
// import axios from 'axios';
// import fs from 'fs';

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_KEY);

bot.command("start", (ctx) => ctx.reply("Добро пожаловать в полезный бот!👋 Для начала нажмите кнопку меню"));
// let myChatId = 333187938;

bot.on("message", async (ctx) => {
	console.log(ctx.chat.id);

  if (ctx.message.text == "/showmenu") {
    await ctx.reply("Меню бота", {
      reply_markup: {
        keyboard: menu,
        resize_keyboard: true,
      },
    });
  } else if (ctx.message.text == "/closemenu") {
    await ctx.reply("Меню закрыто", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  } else if (ctx.message.text == "Узнать погоду OVB 🌤️") {
    getWeatherOVB(ctx);
  } else if (ctx.message.text == "Узнать погоду UTP 🌤️") {
		getWeatherUTP(ctx);
  } else if (ctx.message.text == "Узнать курс доллара 💵") {
    getCurrency(ctx);
	} else if (ctx.message.text == "Высота волн в Паттайе 🌊") {
		getWaveHeight(ctx);
	}
});

/* let oldPrice;

async function getCoinPrice() {
	const response = await axios.get(process.env.COINGECKO_API_URL);

	const resPrice = String(response.data.port3.usd);
	const data = fs.readFileSync('./price.txt', 'utf8');
	oldPrice = data;
	console.log(resPrice);
	
	if (resPrice > oldPrice) {
		fs.writeFile('./price.txt', resPrice, 'utf8', (err) => {
			if (err) console.log(`Ошибка записи, ${err}`);
		})
		return `Цена увеличилась - ${resPrice}`
	} else if (resPrice < oldPrice) {
		fs.writeFile('./price.txt', resPrice, 'utf8', (err) => {
			if (err) console.log(`Ошибка записи, ${err}`);
		})
		return `Цена упала - ${resPrice}`
	} else {
		return 'Цена не изменилась'
	}
}

cron.schedule("* 1 * * *", async () => {
	const message = await getCoinPrice();
  bot.api.sendMessage(myChatId, message);
}); */

bot.api.setMyCommands([
  { command: "start", description: "Запустить бота" },
  { command: "showmenu", description: "Открыть меню" },
  { command: "closemenu", description: "Закрыть меню" },
]);

bot.start();
 