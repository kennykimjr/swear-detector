const defaults = {}

function toStar(length) {
  let stars = ''
  for (let i = 0; i < length; i++) {
    stars += '*'
  }
  return stars
}

defaults['delimiters'] = ' !@#$%^&*()-_=+~`,{}[]|/?.\\'

defaults['swears'] = new Set([
  'fuck', 'shit', 'bitch', 'nigger', 'cock', 'pussy', 'pussies',
  'kike', 'dyke', 'kyke', 'gook', 'wetback', 'penis', 'ass',
  'dick', 'kraut', 'fag', 'cunt', 'twat', 'whore', 'douche'
])

defaults['censors'] = defaults.swears.forEach(swear => {
  default['censors'][swear] = toStar(swear.length)
})

module.export = defaults
