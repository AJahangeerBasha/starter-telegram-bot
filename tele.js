const TelegramBot = require("node-telegram-bot-api");
const telegramConfig = require("./telegram-config.json");
const token = telegramConfig.token;

const bot = new TelegramBot(token, { polling: true });

bot.on("msg", (msg) => {
//   console.log("inside channel msg");
//   console.log(msg);
  const chatId = msg.chat.id;

  const sourceChannelId = telegramConfig.sourceId;
  const targetChannelIds = telegramConfig.targetIds;

  if (chatId == sourceChannelId) {
    targetChannelIds.forEach((e) => {
      bot.sendMessage(e, msg.text);
    });
  }
});

bot.on("channel_post", (msg) => {
//   console.log("inside channel post");
//   console.log(msg);
//   console.log(msg.chat);
//   console.log(msg.chat.id);
//   const chatId = msg.chat.id;
//   console.log("chatId : ", chatId);

  const sourceChannelId = telegramConfig.sourceId;
  const targetChannelIds = telegramConfig.targetIds;

  if (chatId == sourceChannelId) {
    targetChannelIds.forEach((e) => {
      bot.sendMessage(e, msg.text);
    });
  }
});
