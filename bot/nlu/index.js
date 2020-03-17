const dialogflow = require('dialogflow')
const path = require('path')
const uuid = require('uuid')
const sessionId = uuid.v4()

module.exports = async (message) => {
  console.log('-> nlu')
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: path.join(__dirname, '..', '..', 'dialogflow-service-account.json'),
    fallback: true
  })
  const sessionPath = sessionClient.sessionPath('cath-and-halt-wildfirebot-hyhk', sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message.text,
        languageCode: 'en-US',
      },
    },
  }
  const responses = await sessionClient.detectIntent(request)
  const result = responses[0].queryResult
  message.nlu = {
    intentName: result.intent.displayName
  }
  return message
}