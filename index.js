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
  const union = new Set([...parsedMessage, ...swears])
  return {
    hasSwear: union.length > 0 ? true : false,
    swears: union
  }
}

module.exports = {
  parseMessage: parseMessage,
  parseDelimiters: parseDelimiters,
  hasSwear: hasSwear
}
