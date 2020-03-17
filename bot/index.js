const nlu = require('./nlu')
const dialog = require('./dialog')
const memory = require('./memory')
const rg = require('./rg')

/*
  Bot it's a flow of async functions/promises that handle each other it's own chatbot domain,
  NLU, DialogManager and Response Generator (plus memory)
*/
const flow = (event) => {
  return memory.fetch(event)
    .then(nlu)
    .then(dialog)
    .then(memory.save)
    .then(rg)
}

module.exports = flow