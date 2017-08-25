const { describe, it } = require('mocha')
const { expect } = require('chai')
const swears = require('../index.js')

describe('parseMessage Tests', () => {
  it('tests parses of messages', () => {
    const delimiters = swears.parseDelimiters(' !@#$%^&*()-_=+~`,{}[]|/?.\\')
    const smallMessage = 'testing a new/old message!'
    const mediumMessage = 'I am testing a medium message that has a lot of repeated words. I am going to get the correct results, right?'
    const bigMessage = 'I am containing a list with [one, two, three, four, five], give or take some gratuitous output. This-should_be_parsed!correctly.'
    const smallResult = swears.parseMessage(smallMessage, delimiters)
    const mediumResult = swears.parseMessage(mediumMessage, delimiters)
    const bigResult = swears.parseMessage(bigMessage, delimiters)
    expect(smallResult.size).to.equal(5)
    expect(mediumResult.size).to.equal(19)
    expect(bigResult.size).to.equal(22)
  })
})
