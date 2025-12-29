const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();

const apiToken = '7784753596:AAFRSOreZUSN_w2-g6lhxRjKg1HUN6oa0tg';
const forwardChatId = '-1003618316671';

const bot = new Telegraf(apiToken, {
    telegram: {
        webhookReply: false
    }
});

app.use(express.json());
app.use(bot.webhookCallback(`/bot${apiToken}`));

app.get(`/`, async (_req, res) => {
    try {
        const url = `https://greats-works.vercel.app/bot${apiToken}`;
        await bot.telegram.setWebhook(url);
        res.send("200");
    } catch {
        res.send('502');
    }
});

// Подключение обработчика пересылки сообщений
const messageHandler = require('./composer/text.js');
bot.use(messageHandler);

app.listen(3212, () => {
    console.log('Server is running on port 3212');
});
