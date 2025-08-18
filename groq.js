import Groq from "groq-sdk";
import telegramifyMarkdown from "telegramify-markdown";
import { menu } from "./config.js";
import { logData } from "./log.js";

export const getGroq = async (ctx) => {
  const groq = new Groq({ apiKey: process.env.GROQ_KEY });
  try {
    const completion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: ctx.message.text,
          },
        ],
        model: "llama-3.3-70b-versatile",
      })
      .then((chatCompletion) => {
        logData(ctx, "GroqAI" + `| ${ctx.message.text}`);
        let transform = telegramifyMarkdown(chatCompletion.choices[0]?.message?.content || "");
        return ctx.reply(transform, {
          reply_markup: {
            keyboard: menu,
            resize_keyboard: true,
          },
          parse_mode: "MarkdownV2",
        });
      });
  } catch (error) {
    console.log(`Ошибка, ${error}`);
  }
};
