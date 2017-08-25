function toStar(length) {
  let stars = ''
  for (let i = 0; i < length; i++) {
    stars += '*'
  }
  return stars
}

const defaultSwears = new Set([
  'fuck', 'shit', 'bitch', 'nigger', 'cock', 'pussy', 'pussies',
  'kike', 'dyke', 'kyke', 'gook', 'wetback', 'penis', 'ass',
  'dick', 'kraut', 'fag', 'cunt', 'twat', 'whore', 'douche'
])

const defaultCensors = {}
defaultSwears.forEach(swear => {
  defaultSwears[swear] = toStar(swear.length)
})

defaultDelimiters = ' !@#$%^&*()-_=+~`,{}[]|/?.\\'

function parseMessage(message, delimiters) {
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

function parseDelimiters(delimiters) {
  const parsedDelimiters = new Set()
  for (let i = 0; i < delimiters.length; i++) {
    parsedDelimiters.add(delimiters[i])
  }
  return parsedDelimiters
}

function hasSwear(parsedMessage, swears) {
  const union = new Set(
    [...parsedMessage].filter(word => swears.has(word))
  )
  return {
    hasSwear: union.size >= 1 ? true : false,
    swears: union
  }
}

function censor(word, censors) {
  return censors[word.toLowerCase()] ? censors[word.toLowerCase()] : word
}

function collectDelimiters(sentence, delimiters) {
  let collectedDelimiters = {}
  for (let i = 0; i < sentence.length; i++) {
    if (delimiters.has(sentence[i])) {
      collectedDelimiters[i] = sentence[i]
    }
  }
  return collectedDelimiters
}

function censorSentence(sentence, censors, delimiters) {
  const collectedDelimiters = collectDelimiters(sentence, delimiters)
  let newMessage = gathered = ''
  for (let i = 0; i < sentence.length; i++) {
    if (delimiters.has(sentence[i])) {
      newMessage += censor(gathered, censors)
      newMessage += sentence[i]
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
  parseDelimiters: parseDelimiters,
  hasSwear: hasSwear,
  censor: censor,
  censorSentence: censorSentence,
  parseDelimiters: parseDelimiters
}
