const bot = require('./bot')

bot({
  text: 'no',
  sender: 'test'
}).then(console.log)