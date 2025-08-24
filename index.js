import dotenv from "dotenv";
import { Bot } from "grammy";
import { getWeather } from "./weather.js";
import { getCurrency } from "./currency.js";
import { getWaveHeight } from "./waveHeight.js";
import { menu } from "./config.js";

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_KEY);

bot.command("start", (ctx) => ctx.reply("Добро пожаловать в полезный бот!👋 Для начала нажмите кнопку меню"));

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
    getWeather(ctx, 'novosibirsk');
  } else if (ctx.message.text == "Узнать погоду UTP 🌤️") {
		getWeather(ctx, 'pattaya');
  } else if (ctx.message.text == "Узнать курс доллара 💵") {
    getCurrency(ctx);
	} else if (ctx.message.text == "Высота волн в Паттайе 🌊") {
		getWaveHeight(ctx);
	}
});

bot.api.setMyCommands([
  { command: "start", description: "Запустить бота" },
  { command: "showmenu", description: "Открыть меню" },
  { command: "closemenu", description: "Закрыть меню" },
]);

bot.start();
 