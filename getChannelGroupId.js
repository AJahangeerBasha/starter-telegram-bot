const TelegramBot = require('node-telegram-bot-api');

const telegramConfig = require("./telegram-config.json");
const token = telegramConfig.token;

const bot = new TelegramBot(token, { polling: true });

console.log("inside get Private Group ChatId")

// Listen for incoming messages in the private group
bot.on('message', (msg) => {
  console.log("msg")
  console.log(msg)
  const chatId = msg.chat.id;

  console.log('Private Group ChatId:', chatId);

  // Stop the bot after logging the chatId
  bot.stopPolling();
});


bot.on("channel_post", (msg) => {
  console.log("inside channel post")
  console.log(msg)
  const chatId = msg.chat.id;
  console.log("inside channel post chatId" + chatId)
});

// Log any errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// Handle Ctrl+C to stop the bot gracefully
process.on('SIGINT', () => {
  console.log('Stopping the bot...');
  bot.stopPolling();
});

console.log('Bot is running. Press Ctrl+C to stop.');
