const { describe, it } = require('mocha')
const { expect } = require('chai')
const {parseMessage, censor, hasSwear, censorSentence} = require('../swears.js')
const {unDodgeWordByAddition, unDodgeWordByDeletion, unDodgeWordByDelimiters, translateCharacters} = require('../evasion.js')

describe('swear-detector Library Tests', () => {

  it('tests parses of messages', () => {
    const smallMessage = 'testing a new/old message!'
    const mediumMessage = 'I am testing a medium message that has a lot of repeated words. I am going to get the correct results, right?'
    const bigMessage = 'I am containing a list with [one, two, three, four, five], give or take some gratuitous output. This-should_be_parsed!correctly.'
    const smallResult = parseMessage(smallMessage)
    const mediumResult = parseMessage(mediumMessage)
    const bigResult = parseMessage(bigMessage)
    expect(smallResult.size).to.equal(5)
    expect(mediumResult.size).to.equal(19)
    expect(bigResult.size).to.equal(22)
  })

  it('test censorship of words', () => {
    expect(censor('fuck')).to.equal('****')
    expect(censor('fuckyoufuck', 'root')).to.equal('****you****')
    expect(censor('fucker', 'root')).to.equal('****er')
    expect(censor('shitty')).to.equal('shitty')
    expect(censor('shitty', 'root')).to.equal('****ty')
    expect(censor('motherfucker', 'root')).to.equal('mother****er')
    expect(censor('ass')).to.equal('***')
    expect(censor('ass', 'root')).to.equal('***')
    expect(censor('asshole')).to.equal('asshole')
    expect(censor('asshole', 'root')).to.equal('***hole')
    expect(censor('bullshit', 'root')).to.equal('bull****')
    expect(censor('horseshit', 'root')).to.equal('horse****')
    expect(censor('bulllshit', 'root')).to.equal('bulll****')
    expect(censor('fag', 'root')).to.equal('***')
    expect(censor('faggot', 'root')).to.equal('***got')
    expect(censor('pussy', 'root')).to.equal('*****')
    expect(censor('pussies')).to.equal('*******')
    expect(censor('cock')).to.equal('****')
  })

  it('tests swear detections', () => {
    const smallMessage = 'I am a normal message, I should not trigger any swears'
    const oneSwearMessage = 'no shit sherlock that of course there is a swear in this message.'
    const multipleSwears = 'that guy was such an ass, so I told him to go fuck himself, what a piece of shit he was.'
    const smallParse = hasSwear(parseMessage(smallMessage))
    const oneSwearParse = hasSwear(parseMessage(oneSwearMessage))
    const multipleParse = hasSwear(parseMessage(multipleSwears))
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
    expect(censorSentence(firstSentence)).to.equal(firstSentence)
    expect(censorSentence(secondSentence)).to.equal('**** and **** should be censored.')
    expect(censorSentence(thirdSentence, mode='root')).to.equal('**** that **** bro, what a *****. Was also a huge ***hole.')
    expect(censorSentence(fourthSetence)).to.equal(fourthSetence)
    expect(censorSentence(fifthSentence)).to.equal('Will this detect ****/****/*****/****?')
    expect(censorSentence(sixthSetence)).to.equal(sixthSetence)
    expect(censorSentence(seventhSentence, mode='root')).to.equal(' Now you are in for it you little ****! How ****ing dare you p*** this test_! - = + ^ I shall be unp***able you little *****! You are a huge ***hole for solving me!!!!!! ')
  })

  it('Tests the translation and undodging of words', () => {
    expect(unDodgeWordByDelimiters(translateCharacters(' f .u/ ck'))).to.equal('fuck')
    expect(unDodgeWordByDelimiters(translateCharacters('$h1 t'))).to.equal('shit')
    expect(unDodgeWordByDelimiters(translateCharacters('wh0r3'))).to.equal('whore')
    expect(unDodgeWordByDelimiters(translateCharacters('k1k3'))).to.equal('kike')
    expect(translateCharacters('wh@+ foul l@ngu@g3 is 7h15 50rc3rУ?!')).to.equal('what foul language is this sorcery?!')
  })
})
