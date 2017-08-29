const {delimiters, alphabet, defaultSubs} = require('./defaults.js')
const defaultDelimiters = new Set(delimiters.split(''))

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

function unDodgeWordByDelimiters(word, delimiters=defaultDelimiters) {
  let newWord = ''
  for (let i = 0; i < word.length; i++) {
    if (delimiters.has(word[i]) === false) {
      newWord += word[i]
    }
  }
  return newWord
}

function unDodgeWordbyReplacement(word, alphabet=alphabet) {
	const possibilities = new Set()
  for (let i = 0; i < word.length; i++) {
  	for (let j = 0; j < alphabet.length; j++) {
      const begin = word.slice(0,i)
      const replaced = alphabet[j]
      const end = word.slice(i + 1, word.length)
      possibilities.add(begin + replaced + end)
    }
  }
  return possibilities
}

function translateCharacters(phrase, substitutes=defaultSubs) {
  let newWord = ''
  for (let i = 0; i < phrase.length; i++) {
    newWord += phrase[i] in substitutes ? substitutes[phrase[i]] : phrase[i]
  }
  return newWord
}

function translateDodges(sentence, dodges={}) {
  let newSentence = sentence
  for (var dodge in dodges) {
    newSentence = newSentence.replace(new RegExp(dodge, 'g'), dodges[dodge])
  }
  return newSentence
}

module.exports = {
  unDodgeWordByDelimiters: unDodgeWordByDelimiters,
  unDodgeWordByDeletion: unDodgeWordByDeletion,
  unDodgeWordByAddition: unDodgeWordByAddition,
  unDodgeWordbyReplacement: unDodgeWordbyReplacement,
  translateCharacters: translateCharacters,
  translateDodges: translateDodges
}
