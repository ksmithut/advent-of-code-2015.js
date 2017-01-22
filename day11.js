'use strict'

// Part 1
// ======

const toCharCode = (char) => char.charCodeAt(0)
const fromCharCode = (code) => String.fromCharCode(code)

const incrementStr = (str) => {
  const chars = str.split('')
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i]
    if (char !== 'z') {
      chars[i] = fromCharCode(toCharCode(char) + 1)
      return chars.join('')
    }
    chars[i] = 'a'
  }
  chars.unshift('a')
  return chars.join('')
}

const passAll = (conditions) => {
  return (val) => conditions.every((condition) => condition(val))
}

const hasStraight = (val) => val
  .split('')
  .map(toCharCode)
  .some((code, i, arr) => {
    if (i < 2) return false
    return code === arr[i - 1] + 1 && code === arr[i - 2] + 2
  })
const hasValidChars = (val) => !(/(i|o|l)/).test(val)
const hasTwoPairs = (val) => (val.match(/(\w)\1/g) || [])
  .filter((pair, i, arr) => arr.indexOf(pair) === i)
  .length >= 2

const validPassword = passAll([
  hasStraight,
  hasValidChars,
  hasTwoPairs,
])

function part1(input) {
  let password = input
  while (true) { // eslint-disable-line no-constant-condition
    password = incrementStr(password)
    if (validPassword(password)) return password
  }
}

// Part 2
// ======

function part2(input) {
  return part1(part1(input))
}

module.exports = { part1, part2 }
