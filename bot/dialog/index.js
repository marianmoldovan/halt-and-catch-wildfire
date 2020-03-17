const FireGame = require('./game')

const handler = {
  start: async (message, fireGame) => {
    message.action = fireGame.start()
    message.memory.game = fireGame.save()
  },
  yes: async (message, fireGame) => {
    message.action = fireGame.answer(true)
    message.memory.game = fireGame.save()
  },
  no: async (message, fireGame) => {
    message.action = fireGame.answer(false)
    message.memory.game = fireGame.save()
  },
  fallback: async (message) => {
    message.action = {
      name: 'fallback'
    }
  },
}

/*
  Input interface: {
    nlu.intentName: intent detected
    memory: state
  }
  Output interface: {
    action: response to send to the user
    memory: state needed to persist
  }
*/
module.exports = async (message) => {
  const fireGame = new FireGame(message.memory.game || {})
  await handler[message.nlu.intentName](message, fireGame)
  return message
}