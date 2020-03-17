const botBuilder = require('claudia-bot-builder')
const telegramTemplate = botBuilder.telegramTemplate
const i18n = require('i18n')

i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: __dirname + '/locales'
})

const getText = (actionName) => {
  const text = i18n.__(actionName)
  return new telegramTemplate.Text(text).get()
}

const getTextWithArg = (actionName, arg) => {
  const text = i18n.__(actionName, arg)
  return new telegramTemplate.Text(text).get()
}

const getTextWithBooleanKeyboard = (actionName) => {
  const text = i18n.__(actionName)
  return new telegramTemplate.Text(text).addReplyKeyboard([
    ['Yes'],
    ['No']
  ], true, false).get()
}

const getPictureFromURI = (url) => {
  return new telegramTemplate.Photo(url).get()
}

/*
  Input interface: {
    action.name: name of the response action,
    action.payload: extra data for storing media
    action.arg: additional data for text
  }
  Output interface: Telegram Response
*/
module.exports = async (message) => {
  console.log('-> rg')
  switch (message.action.name) {
    case 'question':
    case 'start_and_question':
      return [getTextWithBooleanKeyboard(message.action.name), getPictureFromURI(message.action.payload.image)]
    case 'finish':
      return getTextWithArg(message.action.name, message.action.arg)
    default:
      return getText(message.action.name)
  }
}