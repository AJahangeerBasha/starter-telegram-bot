const { Bot } = require("grammy");
const telegramConfig = require("./telegram-config.json");
const token = telegramConfig.token;

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new Bot(token);

console.log(`Grammy is started now ... :)`);

// Register a command handler
bot.command("start", (ctx) => {
  ctx.reply("Hello! This is your bot.");
});

// Handle incoming text messages
bot.on("message", (ctx) => {
  // Log the received message
  console.log(`Received message: ${ctx.message.text}`);
  console.log(`Received chat id : ${ctx.message.chat.id}`);

  sendMessage(ctx, ctx.message.chat.id, ctx.message.text);
});

// Handle incoming text messages
bot.on("channel_post", (ctx) => {
  // Log the received message
  console.log(`Received channel_post message: ${ctx.update.channel_post.text}`);
  console.log(
    `Received channel_post chat id: ${ctx.update.channel_post.chat.id}`
  );
  sendMessage(ctx, ctx.update.channel_post.chat.id, ctx.update.channel_post.text);
});

function sendMessage(ctx, chatId, msg) {
  const sourceChannelId = telegramConfig.sourceId;
  const targetChannelIds = telegramConfig.targetIds;

  if (chatId == sourceChannelId) {
    targetChannelIds.forEach(async (e) => {
    await ctx.api.sendMessage(e, msg)
    });
  }
}

// Start the bot
bot.start();
