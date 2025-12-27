const { Telegraf, Composer } = require('telegraf');

const bot = new Telegraf('7784753596:AAFRSOreZUSN_w2-g6lhxRjKg1HUN6oa0tg');

const forwardChatId = '-1002647773080';

const composer = new Composer();

composer.on('message', async (ctx) => {
const messageText = ctx.message.text || '';

if (messageText.startsWith('/start')) {
 await ctx.reply('Привет! Я бот для подачи анкет в GreatsJobs, все анкеты отправляются в канал @GreatsWork');
 return;
}

try {
 const userInfo = ctx.from && ctx.from.username
   ? `@${ctx.from.username}`
   : 'пользователь без имени пользователя';

 const messageWithSender = `New Job From ${userInfo}\n\n${messageText}`;

 await ctx.telegram.sendMessage(forwardChatId, messageWithSender);
 await ctx.reply('Ваше сообщение было отправлено успешно.');
} catch (err) {
 console.error('Ошибка пересылки:', err);
 await ctx.reply('Произошла ошибка при отправке сообщения. Попробуйте позже.');
}
});

// Подключение композиции к боту
bot.use(composer);

// Ловим все ошибки глобально
bot.catch((err) => {
console.error('Глобальная ошибка:', err);
});

// Запускаем бота
bot.launch();