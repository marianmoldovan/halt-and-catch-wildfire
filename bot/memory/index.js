const asyncRedis = require('async-redis')
const client = asyncRedis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)

/*
  Input interface: {
    sender: id of user
  }
  Output interface: {
    memory: obj with user memory state
  }
*/
module.exports.fetch = async (message) => {
  console.log('-> memory.fetch')
  message.memory = await client.get(message.sender)
  if (!message.memory)
    message.memory = {}
  else message.memory = JSON.parse(message.memory)
  console.log('-> memory.fetch', message.memory)
  return message
}

/*
  Input interface: {
    memory: obj with user memory state
  }
  Output interface: None
*/
module.exports.save = async (message) => {
  console.log('-> memory.save')
  await client.set(message.sender, JSON.stringify(message.memory))
  if (process.platform == 'darwin')
    client.end(true)
  return message
}