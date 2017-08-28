const defaultSwears = new Set([
  'fuck', 'shit', 'bitch', 'nigger', 'cock', 'pussy', 'pussies',
  'kike', 'dyke', 'kyke', 'gook', 'wetback', 'penis', 'ass', 'cuck',
  'dick', 'kraut', 'fag', 'cunt', 'twat', 'whore', 'douche', 'nigga'
])

const defaultSubs = {
  '1': 'i', '0': 'o', '5': 's', '9': 'g', '6': 'b', '7': 't',
  '3': 'e', '+': 't', '$': 's', '^': 'n', '|': 'i', 'А': 'a',
  'Б': 'b', 'В': 'b', 'Г': 'r', 'Ґ': 'r', 'Д': 'a', 'Ђ': 'h',
  'Ѓ': 'r', 'Е': 'e', 'Ё': 'e', 'Є': 'c', 'ç': 'c', 'û': 'u',
  'Ж': 'x', 'З': 'e', 'З́': 'e', 'Ѕ': 's', 'И': 'n', 'І': 'i',
  'Ї': 'i', 'Й': 'n', 'Ј': 'j', 'К': 'k', 'Л': 'n', 'Љ': 'b',
  'М': 'm', 'Н': 'h', 'Њ': 'h', 'О': 'o', 'Р': 'p', 'С': 'c',
  'С́': 'c', 'Т': 't', 'Ћ': 'h', 'Ќ': 'k', 'У': 'y', 'Ў': 'y',
  'Ф': 'o', 'Х': 'x', 'Ц': 'u', 'Ч': 'y', 'Џ': 'u', 'Ш': 'w',
  'Щ': 'w', 'Ъ': 'b', 'Ы': 'bl','Ь': 'b', 'Э': 'e', 'Ю': 'io',
  'Я': 'r', 'Ӏ': 'i', 'Ә': 'b', 'Ғ': 'r', 'Ҙ': 'e', 'Ҫ': 'c',
  'Ҡ': 'k', 'Җ': 'x', 'Қ': 'k', 'Ң': 'h', 'Ҥ': 'h', 'Ө': 'o',
  'Ү': 'y', 'Ұ': 'y', 'Һ': 'h', 'Ҳ': 'x', 'Α': 'a', 'α': 'a',
  'Β': 'b', 'β': 'b', 'Γ': 'r', 'γ': 'y', 'Δ': 'a', 'δ': 'o',
  'Ε': 'e', 'ε': 'e', 'Ο': 'o', 'ο': 'o', 'Π': 'n', 'π': 'n',
  'Ρ': 'p', 'ρ': 'p', 'Σ': 'e', 'σ': 'o', 'ς': 'c', 'Τ': 't',
  'τ': 't', 'Υ': 'y', 'υ': 'u', 'Φ': 'o', 'φ': 'o', 'Χ': 'x',
  'χ': 'x', 'Ψ': 'w', 'ψ': 'w', 'Ω': 'o', 'ω': 'w', '@': 'a'
}

const defaultCensors = {}
defaultSwears.forEach(swear => {
  defaultCensors[swear] = toStar(swear.length)
})

const defaultDelimiters = parseDelimiters(' !@#$%^&*()-_=+~`,{}[]|/?.\\')
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

function toStar(length) {
  let stars = ''
  for (let i = 0; i < length; i++) {
    stars += '*'
  }
  return stars
}

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

function censorSentence(sentence, mode=undefined, censors=defaultCensors, delimiters=defaultDelimiters, whitelist=new Set()) {
  let newMessage = gathered = ''
  for (let i = 0; i < sentence.length; i++) {
    if (delimiters.has(sentence[i])) {
      newMessage += censor(gathered, mode, censors, whitelist) + sentence[i]
      gathered = ''
    }
    else {
      gathered += sentence[i]
    }
  }
  return newMessage
}

function translate(phrase, substitutes=defaultSubs) {
  let newWord = ''
  for (let i = 0; i < phrase.length; i++) {
    newWord += phrase[i] in substitutes ? substitutes[phrase[i]] : phrase[i]
  }
  return newWord
}

function unDodgeWordByDelimiters(word, delimiters=defaultDelimiters) {
  let newWord = ''
  for (let i = 0; i < word.length; i++) {
    if (delimiters.has(word[i]) === false) {
      newWord += word[i]
    }
  }
  return newWord
}

function unDodgeWordByAddition(word, alphabet=alphabet) {
  const possibilities = new Set()
  for (let i = 0; i < word.length + 1; i++) {
    const begin = word.slice(0,i)
    const end = word.slice(i)
    for (let j = 0; j < alphabet.length; j++) {
    	possibilities.add(begin + alphabet[j] + end)
    }
  }
  return possibilities
}

function unDodgeWordByDeletion(word) {
	const possibilities = new Set()
	for (let i = 0; i < word.length; i++) {
  	const beginning = word.slice(0, i)
    const end = word.slice(i + 1)
    possibilities.add(beginning + end)
  }
  return possibilities
}

module.exports = {
  parseMessage: parseMessage,
  parseDelimiters: parseDelimiters,
  hasSwear: hasSwear,
  censor: censor,
  censorSentence: censorSentence,
  parseDelimiters: parseDelimiters,
  translate: translate,
  unDodgeWordByDelimiters: unDodgeWordByDelimiters,
  unDodgeWordByDeletion: unDodgeWordByDeletion,
  unDodgeWordByAddition: unDodgeWordByAddition
}
