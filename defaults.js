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

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const defaultSwears = new Set([
  'fuck', 'shit', 'bitch', 'nigger', 'cock', 'pussy', 'pussies',
  'kike', 'dyke', 'kyke', 'gook', 'wetback', 'penis', 'ass', 'cuck',
  'dick', 'kraut', 'fag', 'cunt', 'twat', 'whore', 'douche', 'nigga'
])

const defaultCensors = {}
defaultSwears.forEach(swear => {
  defaultCensors[swear] = toStar(swear.length)
})

const delimiters = ' !@#$%^&*()-_=+~`,{}[]|/?.\\'

function toStar(length) {
  let stars = ''
  for (let i = 0; i < length; i++) {
    stars += '*'
  }
  return stars
}

module.exports = {
  defaultSubs: defaultSubs,
  alphabet: alphabet,
  defaultSwears: defaultSwears,
  delimiters: delimiters,
  defaultCensors: defaultCensors
}
