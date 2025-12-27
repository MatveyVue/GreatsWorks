const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();

const apiToken = '8575575026:AAEbWEz35zpWU4cj7eNK6xJealAuetmq2LU';
const forwardChatId = '-1003410007438';

const bot = new Telegraf(apiToken, {
    telegram: {
        webhookReply: false
    }
});

app.use(express.json());
app.use(bot.webhookCallback(`/bot${apiToken}`));

app.get(`/`, async (_req, res) => {
    try {
        const url = `https://greats-works.vercel.app//bot${apiToken}`;
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