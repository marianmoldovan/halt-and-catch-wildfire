const {
  expect
} = require('chai')
const bot = require('../bot')

describe('Test bot', async () => {

  it('Check that responses', async () => {
    const response = await bot({
      text: 'start',
      sender: 'test'
    })
    expect(response).to.be.a('array')
    expect(response).to.to.have.nested.property('[0].text')
  })

})