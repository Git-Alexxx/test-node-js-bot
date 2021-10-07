const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name: 
'Незнакомец'}! Это мой пробный телеграм бот в котором я коротко расскажу о своих хобби.`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('hobby', async (ctx) => {
    try { //что бы ошибка выходила в консоль
        await ctx.replyWithHTML('<b>Мои хобби</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Баскетбол', 'btn_1'),Markup.button.callback('Волейбол', 'btn_2'),
                Markup.button.callback('Программирование', 'btn_3')]
            ]
        ))
    } catch(e) {
        console.error(e);
    }
})

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true // что бы не прикреплялось изображение к ссылке
            })
        } catch(e) {
            console.error(e);
        }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))