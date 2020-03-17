const botBuilder = require('claudia-bot-builder')
const bot = require('./bot')

module.exports = botBuilder(bot, {
  platforms: ['telegram']
})