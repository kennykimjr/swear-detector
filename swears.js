const {delimiters, defaultSwears, defaultCensors} = require('./defaults.js')
const defaultDelimiters = new Set(delimiters.split(''))

function parseMessage(message, delimiters=defaultDelimiters) {
  let gathered = ''
  let parsedMessage = new Set()
  for (let i = 0; i < message.length; i++) {
    if (delimiters.has(message[i]) === false) {
      gathered += message[i]
    }
    else {
      parsedMessage.add(gathered)
      gathered = ''
    }
  }
  parsedMessage.delete('')
  return parsedMessage
}

function hasSwear(parsedMessage, swears=defaultSwears) {
  const union = new Set(
    [...parsedMessage].filter(word => swears.has(word.toLowerCase()))
  )
  return {
    hasSwear: union.size >= 1 ? true : false,
    swears: union
  }
}
index
function censor(word, mode=undefined, censors=defaultCensors, whitelist=new Set()) {
  if (censors[word.toLowerCase()]) return censors[word.toLowerCase()]
  if (mode === undefined) return word
  for (var swear in censors) {
    if (word.includes(swear) && whitelist.has(word) === false) {
      return word.replace(new RegExp(swear, 'g'), censors[swear])
    }
  }
  return word
}
index
function censorSentence(sentence, mode=undefined, censors=defaultCensors, delimiters=defaultDelimiters, whitelist=new Set()) {
  let newMessage = gathered = ''
  for (let i = 0; i < sentence.length; i++) {
    if (delimiters.has(sentence[i])) {
      newMessage += censor(gathered) + sentence[i]
      gathered = ''
    }
    else {
      gathered += sentence[i]
    }
  }
  return newMessage
}

module.exports = {
  parseMessage: parseMessage,
  hasSwear: hasSwear,
  censor: censor,
  censorSentence: censorSentence
}
