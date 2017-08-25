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
  'dick', 'kraut', 'fag', 'cunt', 'twat', 'whore', 'douche', 'nigga'
])

const defaultCensors = {}
defaultSwears.forEach(swear => {
  defaultCensors[swear] = toStar(swear.length)
})

defaultDelimiters = parseDelimiters(' !@#$%^&*()-_=+~`,{}[]|/?.\\')

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

function parseDelimiters(delimiters=defaultDelimiters) {
  const parsedDelimiters = new Set()
  for (let i = 0; i < delimiters.length; i++) {
    parsedDelimiters.add(delimiters[i])
  }
  return parsedDelimiters
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

function censor(word, mode, censors=defaultCensors) {
  if (mode === undefined) {
    return censors[word.toLowerCase()] ? censors[word.toLowerCase()] : word
  }
  else {
    if (censors[word.toLowerCase()]) return censors[word.toLowerCase()]
    for (var swear in censors) {
      if (word.includes(swear)) {
        return word.replace(new RegExp(swear, 'g'), censors[swear])
      }
    }
    return word
  }
}

function censorSentence(sentence, mode=undefined, censors=defaultCensors, delimiters=defaultDelimiters) {
  let newMessage = gathered = ''
  for (let i = 0; i < sentence.length; i++) {
    if (delimiters.has(sentence[i])) {
      newMessage += censor(gathered, mode=mode, censors)
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
