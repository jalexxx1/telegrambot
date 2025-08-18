import fs from "fs";

export function logData(ctx, type) {
  let user = ctx.from;
  let date = new Date();
  let logEntry = `\n${date.toISOString()} - ${user.id}, ${user.username || "unknown"}: ${user.first_name}. Запрос ${type}.`;
  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) console.log(`Ошибка записи лога: ${err}`);
  });
};
