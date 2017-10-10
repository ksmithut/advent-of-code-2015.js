'use strict'

// Part 1
// ======

const unescape = str =>
  str
    .replace(/^"(.*)"$/, '$1')
    .replace(/\\x([a-f0-9]{2})/g, (match, charCode) => {
      return String.fromCharCode(parseInt(charCode, 16))
    })
    .replace(/\\(.)/g, '$1')

const sum = (total, num) => total + num
const totalLength = arr => arr.map(str => str.length).reduce(sum)

function part1 (input) {
  const strings = input.split('\n')
  const unescaped = strings.map(unescape)
  return totalLength(strings) - totalLength(unescaped)
}

// Part 2
// ======

const escape = str =>
  str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/^(.*)$/, '"$1"')

function part2 (input) {
  const strings = input.split('\n')
  const escaped = strings.map(escape)
  return totalLength(escaped) - totalLength(strings)
}

module.exports = { part1, part2 }
