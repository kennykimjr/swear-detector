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
  return censors[word] ? censors[word] : word
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
  const parsedMessage = parseMessage(sentence, delimiters)
  let newMessage = ''
  parsedMessage.forEach(word => {
    newMessage += censor(word, censors)
    if (collectedDelimiters[newMessage.length]) {
      newMessage += collectedDelimiters[newMessage.length]
    }
  })
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
