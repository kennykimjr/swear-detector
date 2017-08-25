const { describe, it } = require('mocha')
const { expect } = require('chai')
const swears = require('../index.js')

describe('swear-detector Library Tests', () => {

  it('tests parses of messages', () => {
    const smallMessage = 'testing a new/old message!'
    const mediumMessage = 'I am testing a medium message that has a lot of repeated words. I am going to get the correct results, right?'
    const bigMessage = 'I am containing a list with [one, two, three, four, five], give or take some gratuitous output. This-should_be_parsed!correctly.'
    const smallResult = swears.parseMessage(smallMessage)
    const mediumResult = swears.parseMessage(mediumMessage)
    const bigResult = swears.parseMessage(bigMessage)
    expect(smallResult.size).to.equal(5)
    expect(mediumResult.size).to.equal(19)
    expect(bigResult.size).to.equal(22)
  })

  it('test censorship of words', () => {
    expect(swears.censor('fuck')).to.equal('****')
    expect(swears.censor('fuckyoufuck', 'root')).to.equal('****you****')
    expect(swears.censor('fucker', 'root')).to.equal('****er')
    expect(swears.censor('shitty')).to.equal('shitty')
    expect(swears.censor('shitty', 'root')).to.equal('****ty')
    expect(swears.censor('motherfucker', 'root')).to.equal('mother****er')
    expect(swears.censor('ass')).to.equal('***')
    expect(swears.censor('ass', 'root')).to.equal('***')
    expect(swears.censor('asshole')).to.equal('asshole')
    expect(swears.censor('asshole', 'root')).to.equal('***hole')
    expect(swears.censor('bullshit', 'root')).to.equal('bull****')
    expect(swears.censor('horseshit', 'root')).to.equal('horse****')
    expect(swears.censor('bulllshit', 'root')).to.equal('bulll****')
    expect(swears.censor('fag', 'root')).to.equal('***')
    expect(swears.censor('faggot', 'root')).to.equal('***got')
    expect(swears.censor('pussy', 'root')).to.equal('*****')
    expect(swears.censor('pussies')).to.equal('*******')
    expect(swears.censor('cock')).to.equal('****')
  })

  it('tests swear detections', () => {
    const smallMessage = 'I am a normal message, I should not trigger any swears'
    const oneSwearMessage = 'no shit sherlock that of course there is a swear in this message.'
    const multipleSwears = 'that guy was such an ass, so I told him to go fuck himself, what a piece of shit he was.'
    const smallParse = swears.hasSwear(swears.parseMessage(smallMessage))
    const oneSwearParse = swears.hasSwear(swears.parseMessage(oneSwearMessage))
    const multipleParse = swears.hasSwear(swears.parseMessage(multipleSwears))
    expect(smallParse.hasSwear).to.equal(false)
    expect(smallParse.swears.size).to.equal(0)
    expect(oneSwearParse.hasSwear).to.equal(true)
    expect(oneSwearParse.swears.size).to.equal(1)
    expect(multipleParse.hasSwear).to.equal(true)
    expect(multipleParse.swears.size).to.equal(3)
  })

  it('Tests censorship of sentences', () => {
    const firstSentence = 'This should return itself.'
    const secondSentence = 'Fuck and shit should be censored.'
    const thirdSentence = 'Fuck that shit bro, what a bitch. Was also a huge asshole.'
    const fourthSetence = 'These are some pretty vulgar tests are they not? But this should do nothing.'
    const fifthSentence = 'Will this detect fuck/shit/bitch/cock?'
    const sixthSetence = '  This should return itself  .  Right  ?  '
    const seventhSentence = ' Now you are in for it you little shit! How fucking dare you pass this test_! - = + ^ I shall be unpassable you little bitch! You are a huge asshole for solving me!!!!!! '
    expect(swears.censorSentence(firstSentence)).to.equal(firstSentence)
    expect(swears.censorSentence(secondSentence)).to.equal('**** and **** should be censored.')
    expect(swears.censorSentence(thirdSentence)).to.equal('**** that **** bro, what a *****. Was also a huge ***hole.')
    expect(swears.censorSentence(fourthSetence)).to.equal(fourthSetence)
    expect(swears.censorSentence(fifthSentence)).to.equal('Will this detect ****/****/*****/****?')
    expect(swears.censorSentence(sixthSetence)).to.equal(sixthSetence)
    expect(swears.censorSentence(seventhSentence)).to.equal(' Now you are in for it you little ****! How ****ing dare you pass this test_! - = + ^ I shall be unpassable you little *****! You are a huge ***hole for solving me!!!!!! ')
  })
})
