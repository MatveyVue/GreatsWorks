// composer/text.js
const { Composer } = require('telegraf');

const composer = new Composer();

const forwardChatId = '-1003410007438'; // ваш чат для пересылки

composer.on('message', async (ctx) => {
    const messageText = ctx.message.text || '';

    // Проверка, если сообщение - команда /start, то ответить приветствием
    if (messageText.startsWith('/start')) {
        await ctx.reply('Привет! Я бот который будет пересылать сообщения в канал @nagpz анонимно');
        return; // Не пересылаем /start
    }

    // Получение информации о пользователе
    const user = ctx.from;
    const username = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Пользователь';

    // Формируем сообщение с именем пользователя
    const messageWithUser = `New message from ${username}:\n\n${messageText}`;

    try {
        await ctx.telegram.sendMessage(forwardChatId, messageWithUser);
        // После успешной пересылки отправляем подтверждение пользователю
        await ctx.reply('Ваше сообщение было отправлено успешно.');
    } catch (err) {
        console.error('Ошибка пересылки:', err);
        await ctx.reply('Произошла ошибка при отправке сообщения. Попробуйте позже.');
    }
});

module.exports = composer;
