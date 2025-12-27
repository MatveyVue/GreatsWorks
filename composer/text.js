// composer/text.js
const { Composer } = require('telegraf');

const composer = new Composer();

const forwardChatId = '-1002647773080'; // ваш чат для пересылки

composer.on('message', async (ctx) => {
    console.log('Получено сообщение:', ctx.message);

    const messageText = ctx.message.text || '';

    // Проверка, если сообщение - команда /start, то ответить приветствием
    if (messageText.startsWith('/start')) {
        await ctx.reply('Привет! Я бот для подачи анкет в GreatsJobs, все анкеты отправляются в канал @GreatsWork');
        return; // Не пересылаем /start
    }

    // Получение информации о пользователе
    const user = ctx.from;
    const username = user.username 
        ? `@${user.username}` 
        : `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Пользователь';

    // Формируем сообщение с именем пользователя
    const messageWithUser = `New Job from ${username}:\n\n${messageText}`;

    try {
        await ctx.telegram.sendMessage(forwardChatId, messageWithUser);
        await ctx.reply('Ваше сообщение было успешно отправлено.');
    } catch (err) {
        console.error('Ошибка пересылки:', err);
        await ctx.reply('Произошла ошибка при отправке сообщения. Попробуйте позже.');
    }
});

module.exports = composer;
